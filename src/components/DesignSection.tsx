import Link from "next/link";
import { homepageDesignProjects } from "@/data/projects";

export default function DesignSection() {
  return (
    <section className="px-12 py-[100px]" id="design">
      <div className="fade-up mb-4 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[3px] text-violet before:block before:h-px before:w-5 before:bg-violet">
        UX Design
      </div>
      <h2 className="fade-up fade-up-delay-1 mb-3 font-display text-[clamp(40px,5vw,68px)] leading-none text-text">
        Twenty-five years of{" "}
        <em className="font-accent" style={{ fontStyle: "italic" }}>
          enterprise design
        </em>
        .
      </h2>
      <p className="fade-up fade-up-delay-2 mb-14 max-w-[600px] text-base leading-[1.7] text-dim">
        From startups to IBM. Product pivots that grew revenue 10x, acquisitions
        worth half a billion, and a human-centered process refined over two
        decades of client work.
      </p>

      <div className="fade-up fade-up-delay-3 grid grid-cols-3 gap-px overflow-hidden rounded-[14px] border border-border bg-border">
        {homepageDesignProjects.map((p) => (
          <Link
            key={p.slug}
            href={`/design/${p.slug}`}
            className="group relative flex flex-col bg-surface p-10 no-underline transition-colors duration-200 after:absolute after:inset-x-0 after:top-0 after:h-[3px] after:bg-[linear-gradient(90deg,var(--color-violet),var(--color-cyan))] after:opacity-0 after:transition-opacity after:duration-200 hover:bg-surface2 hover:after:opacity-100"
          >
            <div
              className="mb-4 inline-block self-start rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[2px]"
              style={{ color: p.tagColor, background: p.tagBg }}
            >
              {p.tag}
            </div>
            <div className="mb-2 font-display text-3xl tracking-[1px] leading-none text-text">
              {p.title}
            </div>
            {p.role && (
              <div className="mb-3 font-mono text-[11px] text-muted">
                {p.role} · {p.timeline}
              </div>
            )}
            <div className="mb-6 flex-1 text-sm leading-[1.75] text-dim">
              {p.desc}
            </div>
            {p.outcome && (
              <div className="mb-6 rounded-lg border border-border bg-surface2 px-4 py-3 font-mono text-[12px] text-text">
                <span className="text-green">&#x2713;</span> {p.outcome}
              </div>
            )}
            <div className="flex flex-wrap items-center gap-2">
              {p.pills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-border bg-surface2 px-3 py-1 font-mono text-[11px] text-muted"
                >
                  {pill}
                </span>
              ))}
            </div>
            <div className="absolute right-8 bottom-8 flex h-[38px] w-[38px] items-center justify-center rounded-full border border-border2 text-[15px] text-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-violet group-hover:text-violet">
              ↗
            </div>
          </Link>
        ))}
      </div>

      <div className="fade-up mt-8 text-center">
        <Link
          href="/design"
          className="inline-flex items-center gap-2 font-mono text-[13px] text-muted no-underline transition-colors hover:text-text"
        >
          View all design work →
        </Link>
      </div>
    </section>
  );
}
