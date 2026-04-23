import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getSupabase, Registration, Workshop } from "@/lib/supabase";
import { registerAttendee, splitName } from "@/lib/zoom";
import {
  sendWorkshopConfirmation,
  sendWorkshopOpsAlert,
  sendWorkshopPendingLink,
} from "@/lib/resend";

// Stripe webhook signature verification needs raw body + Node crypto.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[stripe-webhook] Missing STRIPE_WEBHOOK_SECRET");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const sig = request.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(rawBody, sig, secret);
  } catch (err) {
    console.error("[stripe-webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      await handleCompleted(event.data.object as Stripe.Checkout.Session);
    } else if (event.type === "checkout.session.expired") {
      await handleExpired(event.data.object as Stripe.Checkout.Session);
    }
  } catch (err) {
    // Log but always return 200 on handler errors — Stripe will retry up to 3 days
    // for non-2xx. We want retries only for transient infra, not for logic bugs.
    console.error(`[stripe-webhook] Handler failed for ${event.type}:`, err);
    return NextResponse.json({ received: true, handled: false }, { status: 200 });
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

// ── Handlers ───────────────────────────────────────────────────

async function handleCompleted(session: Stripe.Checkout.Session) {
  const supabase = getSupabase();
  const sessionId = session.id;
  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : (session.payment_intent?.id ?? null);

  // 1. Idempotent state transition: pending -> paid
  const { data: updated, error: updateErr } = await supabase
    .from("registrations")
    .update({
      status: "paid",
      stripe_payment_intent: paymentIntentId,
    })
    .eq("stripe_session_id", sessionId)
    .eq("status", "pending")
    .select("*, workshops(*)")
    .maybeSingle();

  if (updateErr) throw updateErr;
  if (!updated) {
    // Either the registration doesn't exist (shouldn't happen) or the webhook already fired.
    console.log(`[stripe-webhook] No pending registration for session ${sessionId} — already processed or missing.`);
    return;
  }

  const registration = updated as Registration & { workshops: Workshop };
  const workshop = registration.workshops;

  if (!workshop.zoom_meeting_id) {
    await sendWorkshopOpsAlert({
      subject: `Missing Zoom meeting for ${workshop.slug}`,
      body: `Registration ${registration.id} is paid but workshop ${workshop.slug} has no zoom_meeting_id configured. Register the attendee manually.\n\nEmail: ${registration.email}\nName: ${registration.name}`,
    });
    await sendWorkshopPendingLink({
      to: registration.email,
      name: registration.name,
      workshopTitle: workshop.title,
    });
    return;
  }

  // 2. Zoom registration
  let zoomResult: { registrant_id: string; join_url: string };
  try {
    const { firstName, lastName } = splitName(registration.name);
    zoomResult = await registerAttendee(workshop.zoom_meeting_id, {
      email: registration.email,
      firstName,
      lastName,
    });
  } catch (err) {
    console.error("[stripe-webhook] Zoom registration failed:", err);
    await sendWorkshopOpsAlert({
      subject: `Zoom registration failed — ${registration.email}`,
      body: `Registration ${registration.id} paid but Zoom registration failed.\n\n${(err as Error).message}\n\nWorkshop: ${workshop.slug}\nMeeting ID: ${workshop.zoom_meeting_id}\nAttendee: ${registration.name} <${registration.email}>\n\nRegister manually in Zoom, then update registrations.zoom_join_url and status=confirmed.`,
    });
    await sendWorkshopPendingLink({
      to: registration.email,
      name: registration.name,
      workshopTitle: workshop.title,
    });
    return;
  }

  // 3. Confirm registration
  const { error: confirmErr } = await supabase
    .from("registrations")
    .update({
      status: "confirmed",
      zoom_registrant_id: zoomResult.registrant_id,
      zoom_join_url: zoomResult.join_url,
      confirmed_at: new Date().toISOString(),
    })
    .eq("id", registration.id);
  if (confirmErr) throw confirmErr;

  // 4. Send confirmation email
  try {
    await sendWorkshopConfirmation({
      to: registration.email,
      name: registration.name,
      workshopTitle: workshop.title,
      startsAt: workshop.starts_at,
      joinUrl: zoomResult.join_url,
    });
  } catch (err) {
    console.error("[stripe-webhook] Confirmation email failed:", err);
    await sendWorkshopOpsAlert({
      subject: `Confirmation email failed — ${registration.email}`,
      body: `Registration confirmed but email failed to send.\n\n${(err as Error).message}\n\nJoin URL: ${zoomResult.join_url}`,
    });
  }
}

async function handleExpired(session: Stripe.Checkout.Session) {
  const supabase = getSupabase();
  const { error } = await supabase
    .from("registrations")
    .delete()
    .eq("stripe_session_id", session.id)
    .eq("status", "pending");
  if (error) throw error;
}
