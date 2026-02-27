import Link from "next/link";
import { homepageProjects } from "@/data/projects";

function WorkCard({ p }: { p: (typeof homepageProjects)[number] }) {
  return (
    <Link
      href={`/work/${p.slug}`}
      className="group relative bg-surface p-11 no-underline transition-colors duration-200 after:absolute after:inset-x-0 after:top-0 after:h-[3px] after:bg-[linear-gradient(90deg,var(--color-violet),var(--color-cyan))] after:opacity-0 after:transition-opacity after:duration-200 hover:bg-surface2 hover:after:opacity-100"
    >
      <div
        className="mb-5 inline-block rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[2px]"
        style={{ color: p.tagColor, background: p.tagBg }}
      >
        {p.tag}
      </div>
      <div className="mb-3 font-display text-4xl tracking-[1px] leading-none text-text">
        {p.title}
      </div>
      <div className="mb-7 max-w-[380px] text-sm leading-[1.75] text-dim">
        {p.desc}
      </div>
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
      <div className="absolute right-10 bottom-10 flex h-[38px] w-[38px] items-center justify-center rounded-full border border-border2 text-[15px] text-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-violet group-hover:text-violet">
        ↗
      </div>
    </Link>
  );
}

export default function WorkSection() {
  const featured = homepageProjects.find((p) => p.featured);
  const rest = homepageProjects.filter((p) => !p.featured);

  return (
    <section className="px-12 py-[100px]" id="work">
      <div className="fade-up mb-4 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[3px] text-violet before:block before:h-px before:w-5 before:bg-violet">
        Selected Work
      </div>
      <h2 className="fade-up fade-up-delay-1 mb-3 font-display text-[clamp(40px,5vw,68px)] leading-none text-text">
        Products I&apos;ve{" "}
        <em className="font-accent" style={{ fontStyle: "italic" }}>
          designed
        </em>{" "}
        and{" "}
        <em className="font-accent" style={{ fontStyle: "italic" }}>
          built
        </em>
        .
      </h2>
      <p className="fade-up fade-up-delay-2 mb-14 max-w-[560px] text-base leading-[1.7] text-dim">
        Not mockups. Not concepts. Shipped products that people use — each one
        conceived, designed, and built using vibecoding methodology.
      </p>

      <div className="fade-up fade-up-delay-3 grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-border bg-border">
        {/* Featured card — full width */}
        {featured && (
          <Link
            href={`/work/${featured.slug}`}
            className="group relative col-span-2 grid grid-cols-2 items-center gap-[60px] bg-surface p-11 no-underline transition-colors duration-200 after:absolute after:inset-x-0 after:top-0 after:h-[3px] after:bg-[linear-gradient(90deg,var(--color-violet),var(--color-cyan))] after:opacity-0 after:transition-opacity after:duration-200 hover:bg-surface2 hover:after:opacity-100"
          >
            <div>
              <div
                className="mb-5 inline-block rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[2px]"
                style={{
                  color: featured.tagColor,
                  background: featured.tagBg,
                }}
              >
                {featured.tag}
              </div>
              <div className="mb-3 font-display text-5xl tracking-[1px] leading-none text-text">
                {featured.title}
              </div>
              <div className="mb-7 max-w-[380px] text-sm leading-[1.75] text-dim">
                {featured.desc}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {featured.pills.map((pill) => (
                  <span
                    key={pill}
                    className="rounded-full border border-border bg-surface2 px-3 py-1 font-mono text-[11px] text-muted"
                  >
                    {pill}
                  </span>
                ))}
              </div>
              <div className="absolute right-10 bottom-10 flex h-[38px] w-[38px] items-center justify-center rounded-full border border-border2 text-[15px] text-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-violet group-hover:text-violet">
                ↗
              </div>
            </div>
            {/* Featured visual */}
            <div className="flex aspect-video items-center justify-center overflow-hidden rounded-[10px] border border-border bg-[#07070f]">
              <div className="relative z-[2] w-[88%] p-4">
                <div className="mb-2 font-mono text-[9px] uppercase tracking-[2px] text-amber">
                  Community-sourced UX Research
                </div>
                <div className="mb-3 font-display text-xl leading-[1.1] text-[#e2e8f0]">
                  Who actually uses these products,{" "}
                  <span className="font-accent italic text-[#f59e0b]">
                    and what made them stay.
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-12 rounded-md border border-[#f59e0b22] bg-[#1a1200]"
                    />
                  ))}
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Rest of projects — 2-col grid */}
        {rest.map((p) => (
          <WorkCard key={p.slug} p={p} />
        ))}
      </div>
    </section>
  );
}
