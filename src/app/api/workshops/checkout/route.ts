import { NextResponse } from "next/server";
import {
  getSupabase,
  getWorkshopBySlug,
  reserveSeat,
} from "@/lib/supabase";
import {
  createWorkshopCheckoutSession,
  getStripe,
} from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: {
    workshop_slug?: unknown;
    name?: unknown;
    email?: unknown;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const slug = typeof body.workshop_slug === "string" ? body.workshop_slug.trim() : "";
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.toLowerCase().trim() : "";

  if (!slug) return NextResponse.json({ error: "Missing workshop" }, { status: 400 });
  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
  if (!email || !emailRe.test(email)) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }

  // 1. Load workshop
  const workshop = await getWorkshopBySlug(slug);
  if (!workshop) {
    return NextResponse.json({ error: "Workshop not found" }, { status: 404 });
  }
  if (workshop.status !== "open") {
    return NextResponse.json({ error: "Workshop is not open" }, { status: 409 });
  }

  // 2. Duplicate check — a confirmed registration blocks re-signup
  const { data: existing } = await getSupabase()
    .from("registrations")
    .select("status")
    .eq("workshop_id", workshop.id)
    .eq("email", email)
    .in("status", ["paid", "confirmed"])
    .maybeSingle();

  if (existing) {
    return NextResponse.json(
      { error: "This email is already registered for this workshop." },
      { status: 409 },
    );
  }

  // 3. Create Stripe Checkout session FIRST (we need session.id as the idempotency key)
  let session;
  try {
    session = await createWorkshopCheckoutSession({
      workshopSlug: workshop.slug,
      workshopId: workshop.id,
      workshopTitle: workshop.title,
      priceCents: workshop.price_cents,
      currency: workshop.currency,
      email,
      name,
    });
  } catch (err) {
    console.error("[workshops/checkout] Stripe session failed:", err);
    return NextResponse.json({ error: "Unable to start checkout" }, { status: 502 });
  }

  // 4. Atomic seat reservation. If sold out, immediately expire the Stripe session.
  try {
    await reserveSeat({
      workshopId: workshop.id,
      email,
      name,
      stripeSessionId: session.id,
      amountCents: workshop.price_cents,
    });
  } catch (err) {
    // Best-effort expire so we don't leave a dangling session
    try {
      await getStripe().checkout.sessions.expire(session.id);
    } catch (expireErr) {
      console.error("[workshops/checkout] Failed to expire session:", expireErr);
    }

    if (err instanceof Error && err.name === "SoldOutError") {
      return NextResponse.json({ error: "SOLD_OUT" }, { status: 409 });
    }
    console.error("[workshops/checkout] reserveSeat failed:", err);
    return NextResponse.json({ error: "Unable to reserve seat" }, { status: 500 });
  }

  return NextResponse.json({ url: session.url });
}
