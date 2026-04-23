import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { workshops } from "@/data/workshops";

export default function WorkshopsPage() {
  return (
    <>
      <Nav />
      <main className="px-12 pt-[130px] pb-[100px]">
        <div className="mb-4 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[3px] text-violet before:block before:h-px before:w-5 before:bg-violet">
          Live Workshops
        </div>
        <h1 className="mb-3 font-display text-[clamp(48px,6vw,80px)] leading-none text-text">
          Learn to{" "}
          <em className="font-accent" style={{ fontStyle: "italic" }}>
            ship
          </em>
          .
        </h1>
        <p className="mb-14 max-w-[620px] text-lg leading-[1.7] text-dim">
          Small live cohorts. Real build time. You leave with a shipped product
          and the process to ship the next one — and the next one after that.
        </p>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[14px] border border-border bg-border md:grid-cols-2">
          {workshops.map((w) => (
            <Link
              key={w.slug}
              href={`/workshops/${w.slug}`}
              className="group relative flex flex-col gap-4 bg-surface px-10 py-11 text-text no-underline transition-colors duration-200 after:absolute after:inset-x-0 after:top-0 after:h-[3px] after:bg-[linear-gradient(90deg,var(--color-violet),var(--color-cyan))] after:opacity-0 after:transition-opacity after:duration-200 hover:bg-surface2 hover:after:opacity-100"
            >
              {w.live ? (
                <div className="absolute top-5 right-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[2px] text-green">
                  <span className="h-[7px] w-[7px] rounded-full bg-green shadow-[0_0_8px_var(--color-green)]" />
                  Open
                </div>
              ) : (
                <div className="absolute top-4 right-4 rounded-[10px] border border-border bg-surface2 px-2 py-[3px] font-mono text-[10px] text-muted">
                  Coming soon
                </div>
              )}

              <div className="font-mono text-[11px] uppercase tracking-[2px] text-violet">
                {w.tag}
              </div>
              <div className="font-display text-[34px] tracking-[1px] leading-[1.05] text-text">
                {w.title}
              </div>
              <div className="text-[15px] leading-[1.65] text-dim">
                {w.subtitle}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4 border-t border-border pt-5">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[2px] text-muted">
                    Date
                  </div>
                  <div className="mt-1 text-sm text-text">{w.displayDate}</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[2px] text-muted">
                    Format
                  </div>
                  <div className="mt-1 text-sm text-text">
                    {w.displayDurationLabel}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[2px] text-muted">
                    Seat
                  </div>
                  <div className="mt-1 text-sm text-text">{w.displayPrice}</div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-1.5 font-mono text-xs text-violet">
                View details →
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
