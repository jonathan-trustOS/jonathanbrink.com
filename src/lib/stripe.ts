import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("Missing STRIPE_SECRET_KEY environment variable");
    _stripe = new Stripe(key);
  }
  return _stripe;
}

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export async function createWorkshopCheckoutSession(params: {
  workshopSlug: string;
  workshopId: string;
  workshopTitle: string;
  priceCents: number;
  currency: string;
  email: string;
  name: string;
}): Promise<Stripe.Checkout.Session> {
  const siteUrl = getSiteUrl();
  return getStripe().checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: params.email,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: params.currency,
          unit_amount: params.priceCents,
          product_data: {
            name: params.workshopTitle,
            description: "Live workshop seat — join details sent after checkout.",
          },
        },
      },
    ],
    metadata: {
      workshop_id: params.workshopId,
      workshop_slug: params.workshopSlug,
      attendee_name: params.name,
      attendee_email: params.email,
    },
    success_url: `${siteUrl}/workshops/${params.workshopSlug}/thanks?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/workshops/${params.workshopSlug}?canceled=1`,
    expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 min — matches cleanup window
  });
}
