import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import OptimalPathSteps from "@/components/OptimalPathSteps";
import WorkshopSignupForm from "@/components/WorkshopSignupForm";
import { workshops, getWorkshopContent } from "@/data/workshops";
import { getWorkshopBySlug, getRemainingSeats } from "@/lib/supabase";

// Always render fresh — seat counts are live.
export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return workshops.map((w) => ({ slug: w.slug }));
}

export default async function WorkshopDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ canceled?: string }>;
}) {
  const { slug } = await params;
  const { canceled } = await searchParams;
  const content = getWorkshopContent(slug);
  if (!content) notFound();

  // Fetch live DB state. If Supabase isn't configured yet (dev/preview),
  // fall back gracefully — the page still renders, signup just can't complete.
  let remainingSeats: number | null = null;
  let totalCapacity: number | null = null;
  let dbConfigured = false;
  try {
    const workshop = await getWorkshopBySlug(slug);
    if (workshop) {
      totalCapacity = workshop.capacity;
      remainingSeats = await getRemainingSeats(workshop.id, workshop.capacity);
      dbConfigured = true;
    }
  } catch (err) {
    console.warn("[workshops] Supabase unavailable — rendering without live seat count", err);
  }

  const soldOut = remainingSeats !== null && remainingSeats <= 0;

  return (
    <>
      <Nav />
      <main className="pt-[110px] pb-[100px]">
        {/* Hero */}
        <section className="px-6 pt-12 pb-20 md:px-12">
          <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[3px] text-violet before:block before:h-px before:w-5 before:bg-violet">
                {content.heroEyebrow}
              </div>
              <h1 className="mb-6 font-display text-[clamp(52px,7vw,96px)] leading-[0.95] tracking-[1px] text-text">
                {content.heroHeadline}
              </h1>
              <p className="mb-10 max-w-[560px] text-lg leading-[1.7] text-dim">
                {content.heroSub}
              </p>

              <div className="flex flex-wrap gap-4 border-t border-border pt-8">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[2px] text-muted">
                    When
                  </div>
                  <div className="mt-1 text-[15px] text-text">{content.displayDate}</div>
                  <div className="text-[13px] text-dim">{content.displayTime}</div>
                </div>
                <div className="ml-10">
                  <div className="font-mono text-[10px] uppercase tracking-[2px] text-muted">
                    Format
                  </div>
                  <div className="mt-1 text-[15px] text-text">
                    {content.displayDurationLabel}
                  </div>
                </div>
                <div className="ml-10">
                  <div className="font-mono text-[10px] uppercase tracking-[2px] text-muted">
                    Seat
                  </div>
                  <div className="mt-1 text-[15px] text-text">{content.displayPrice}</div>
                </div>
              </div>
            </div>

            {/* Signup card */}
            <aside id="signup" className="lg:sticky lg:top-32 lg:self-start">
              <div className="rounded-2xl border border-border bg-surface p-8 shadow-[0_24px_64px_rgba(0,0,0,0.06)]">
                <div className="mb-2 font-mono text-[11px] uppercase tracking-[2px] text-violet">
                  Reserve your seat
                </div>
                <div className="mb-1 font-display text-[32px] leading-[1.05] text-text">
                  {content.displayPrice}{" "}
                  <span className="font-accent text-[18px] italic text-muted">
                    · one seat
                  </span>
                </div>
                <div className="mb-6 text-[13px] text-muted">
                  {content.displayDate} · {content.displayTime}
                </div>

                {canceled && (
                  <div className="mb-5 rounded-lg border border-amber/30 bg-amber/5 px-4 py-3 text-[13px] text-amber">
                    Checkout canceled — your seat isn&apos;t reserved. Try again whenever
                    you&apos;re ready.
                  </div>
                )}

                {dbConfigured && remainingSeats !== null && totalCapacity !== null && (
                  <div className="mb-5 flex items-center justify-between rounded-lg border border-border bg-surface2 px-4 py-3 font-mono text-[11px] uppercase tracking-[2px] text-muted">
                    <span>Seats remaining</span>
                    <span className={soldOut ? "text-amber" : "text-text"}>
                      {remainingSeats} / {totalCapacity}
                    </span>
                  </div>
                )}

                {soldOut ? (
                  <div className="rounded-lg border border-border bg-surface2 px-4 py-6 text-center">
                    <div className="font-display text-[22px] text-text">Sold out.</div>
                    <div className="mt-1 text-[13px] text-dim">
                      Email me and I&apos;ll add you to the next cohort.
                    </div>
                  </div>
                ) : (
                  <WorkshopSignupForm
                    workshopSlug={content.slug}
                    priceLabel={content.displayPrice}
                    ready={dbConfigured}
                  />
                )}
              </div>
            </aside>
          </div>
        </section>

        {/* Outcomes */}
        <section className="border-y border-border bg-surface px-6 py-16 md:px-12">
          <div className="mb-4 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[3px] text-violet before:block before:h-px before:w-5 before:bg-violet">
            A-HA Check
          </div>
          <h2 className="mb-14 font-display text-[clamp(32px,4vw,52px)] leading-[1.05] text-text">
            Every previous attendee{" "}
            <em className="font-accent italic" style={{ fontStyle: "italic" }}>
              shipped.
            </em>
          </h2>
          <div className="grid gap-px overflow-hidden rounded-[14px] border border-border bg-border md:grid-cols-3">
            {content.outcomes.map((o) => (
              <div key={o.label} className="bg-surface p-10">
                <div className="font-display text-[56px] leading-none text-text">
                  {o.stat}
                </div>
                <div className="mt-3 text-[14px] leading-[1.6] text-dim">{o.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Phases */}
        <section className="px-6 py-20 md:px-12">
          <div className="mb-4 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[3px] text-violet before:block before:h-px before:w-5 before:bg-violet">
            The Optimal Path
          </div>
          <h2 className="mb-6 font-display text-[clamp(32px,4vw,52px)] leading-[1.05] text-text">
            Ten phases. One{" "}
            <em className="font-accent italic" style={{ fontStyle: "italic" }}>
              shipped
            </em>{" "}
            product.
          </h2>
          <p className="mb-14 max-w-[620px] text-base leading-[1.7] text-dim">
            Complexity is the enemy of shipped. Every phase exists to cut
            complexity before it costs you a session. We move through all ten
            together.
          </p>
          <OptimalPathSteps phases={content.phases} />
        </section>

        {/* Testimonial */}
        <section className="border-t border-border bg-surface px-6 py-20 md:px-12">
          <blockquote className="mx-auto max-w-[820px] text-center">
            <div
              className="font-accent text-[clamp(28px,3.5vw,44px)] leading-[1.2] italic text-text"
              style={{ fontStyle: "italic" }}
            >
              &ldquo;{content.testimonial.quote}&rdquo;
            </div>
            <div className="mt-6 font-mono text-[11px] uppercase tracking-[2px] text-muted">
              — {content.testimonial.attribution}
            </div>
          </blockquote>
        </section>

        {/* FAQ */}
        <section className="px-6 py-20 md:px-12">
          <div className="mb-4 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[3px] text-violet before:block before:h-px before:w-5 before:bg-violet">
            Questions
          </div>
          <h2 className="mb-12 font-display text-[clamp(32px,4vw,52px)] leading-[1.05] text-text">
            Before you sign up.
          </h2>
          <div className="grid gap-px overflow-hidden rounded-[14px] border border-border bg-border md:grid-cols-2">
            {content.faq.map((item) => (
              <div key={item.q} className="bg-surface p-8">
                <div className="mb-3 font-display text-[22px] leading-[1.15] text-text">
                  {item.q}
                </div>
                <div className="text-[14.5px] leading-[1.7] text-dim">{item.a}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Capstone CTA */}
        <section className="px-6 py-24 md:px-12">
          <div className="mx-auto max-w-[820px] text-center">
            <div
              className="mb-6 font-accent text-[clamp(36px,5vw,64px)] leading-[1.1] italic text-text"
              style={{ fontStyle: "italic" }}
            >
              You didn&apos;t just vibe. You shipped.
            </div>
            <p className="mb-10 text-lg leading-[1.7] text-dim">
              {content.displayDate} · {content.displayPrice} · limited seats.
            </p>
            <a
              href="#signup"
              className="inline-flex items-center gap-2 rounded-full bg-violet px-8 py-4 font-mono text-sm font-medium tracking-wide text-white no-underline transition-colors hover:bg-violet-hover"
            >
              Reserve my seat →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
