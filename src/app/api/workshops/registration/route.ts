import { NextResponse } from "next/server";
import { getSupabase, Registration, Workshop } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/workshops/registration?session_id=cs_xxx
 *
 * Returns a minimal payload for the post-checkout thanks page.
 * The `session_id` comes from Stripe's `{CHECKOUT_SESSION_ID}` template var in
 * success_url — it's safe to trust as a lookup key (attacker would need a valid
 * Stripe session ID to query anything, and we return only our own data).
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  const { data, error } = await getSupabase()
    .from("registrations")
    .select("*, workshops(*)")
    .eq("stripe_session_id", sessionId)
    .maybeSingle();

  if (error) {
    console.error("[workshops/registration] lookup failed:", error);
    return NextResponse.json({ error: "Lookup failed" }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: "Registration not found" }, { status: 404 });
  }

  const reg = data as Registration & { workshops: Workshop };

  return NextResponse.json({
    status: reg.status,
    name: reg.name,
    email: reg.email,
    join_url: reg.zoom_join_url,
    workshop: {
      title: reg.workshops.title,
      starts_at: reg.workshops.starts_at,
      slug: reg.workshops.slug,
    },
  });
}
