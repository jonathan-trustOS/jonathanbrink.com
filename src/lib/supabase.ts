import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the service role key.
 * Never import this from a client component.
 */
let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error(
        "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables",
      );
    }
    _supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return _supabase;
}

// ── Types mirroring the Supabase schema ───────────────────────
export interface Workshop {
  id: string;
  slug: string;
  title: string;
  starts_at: string;
  duration_minutes: number;
  price_cents: number;
  currency: string;
  capacity: number;
  zoom_meeting_id: string | null;
  status: "open" | "sold_out" | "closed";
  created_at: string;
}

export interface Registration {
  id: string;
  workshop_id: string;
  email: string;
  name: string;
  stripe_session_id: string;
  stripe_payment_intent: string | null;
  zoom_registrant_id: string | null;
  zoom_join_url: string | null;
  status: "pending" | "paid" | "confirmed" | "refunded" | "failed";
  amount_cents: number;
  created_at: string;
  confirmed_at: string | null;
}

// ── Helpers ────────────────────────────────────────────────────

export async function getWorkshopBySlug(slug: string): Promise<Workshop | null> {
  const { data, error } = await getSupabase()
    .from("workshops")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data as Workshop | null;
}

export async function getRemainingSeats(workshopId: string, capacity: number): Promise<number> {
  const { count, error } = await getSupabase()
    .from("registrations")
    .select("*", { count: "exact", head: true })
    .eq("workshop_id", workshopId)
    .in("status", ["pending", "paid", "confirmed"]);
  if (error) throw error;
  return Math.max(0, capacity - (count ?? 0));
}

/**
 * Atomic seat reservation. Wraps the `reserve_seat` Postgres function,
 * which uses SELECT ... FOR UPDATE to serialize concurrent buyers.
 * Throws on SOLD_OUT.
 */
export async function reserveSeat(params: {
  workshopId: string;
  email: string;
  name: string;
  stripeSessionId: string;
  amountCents: number;
}): Promise<string> {
  const { data, error } = await getSupabase().rpc("reserve_seat", {
    p_workshop: params.workshopId,
    p_email: params.email,
    p_name: params.name,
    p_session: params.stripeSessionId,
    p_amount: params.amountCents,
  });
  if (error) {
    if (error.message?.includes("SOLD_OUT")) {
      const soldOut = new Error("SOLD_OUT");
      soldOut.name = "SoldOutError";
      throw soldOut;
    }
    throw error;
  }
  return data as string;
}
