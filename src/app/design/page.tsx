import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { designProjects } from "@/data/projects";

export default function DesignPage() {
  const featured = designProjects.find((p) => p.featured);
  const rest = designProjects.filter((p) => !p.featured);

  return (
    <>
      <Nav />
      <main className="px-12 pt-[130px] pb-[100px]">
        <div className="mb-4 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[3px] text-violet before:block before:h-px before:w-5 before:bg-violet">
          UX Design
        </div>
        <h1 className="mb-3 font-display text-[clamp(48px,6vw,80px)] leading-none text-text">
          Twenty-five years of{" "}
          <em className="font-accent" style={{ fontStyle: "italic" }}>
            enterprise design
          </em>
          .
        </h1>
        <p className="mb-14 max-w-[600px] text-lg leading-[1.7] text-dim">
          Human-centered design at IBM, StreamSets, Infinx, LiveHive, and
          through nineteen years of independent consulting. Research-driven.
          Prototype-tested. Revenue-proven.
        </p>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-border bg-border">
          {/* Featured card */}
          {featured && (
            <Link
              href={`/design/${featured.slug}`}
              className="group relative col-span-2 grid grid-cols-[1fr_1fr] items-center gap-[60px] bg-surface p-11 no-underline transition-colors duration-200 after:absolute after:inset-x-0 after:top-0 after:h-[3px] after:bg-[linear-gradient(90deg,var(--color-violet),var(--color-cyan))] after:opacity-0 after:transition-opacity after:duration-200 hover:bg-surface2 hover:after:opacity-100"
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
                <div className="mb-2 font-display text-5xl tracking-[1px] leading-none text-text">
                  {featured.title}
                </div>
                {featured.role && (
                  <div className="mb-4 font-mono text-[12px] text-muted">
                    {featured.role} · {featured.timeline}
                  </div>
                )}
                <div className="mb-7 max-w-[420px] text-sm leading-[1.75] text-dim">
                  {featured.desc}
                </div>
                {featured.outcome && (
                  <div className="mb-6 inline-block rounded-lg border border-border bg-surface2 px-4 py-3 font-mono text-[12px] text-text">
                    <span className="text-green">&#x2713;</span>{" "}
                    {featured.outcome}
                  </div>
                )}
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
              {/* Featured visual — timeline graphic */}
              <div className="flex aspect-video flex-col items-center justify-center overflow-hidden rounded-[10px] border border-border bg-[#07070f] p-8">
                <div className="mb-4 font-mono text-[9px] uppercase tracking-[2px] text-cyan">
                  5-year arc
                </div>
                <div className="mb-2 font-display text-xl leading-[1.1] text-[#e2e8f0]">
                  Open-source → SaaS →{" "}
                  <span className="font-accent italic text-cyan">
                    $524M acquisition
                  </span>
                </div>
                <div className="mt-4 flex w-full items-center gap-2">
                  <div className="h-1 flex-1 rounded-full bg-cyan/20">
                    <div className="h-full w-[30%] rounded-full bg-cyan/50" />
                  </div>
                  <div className="h-1 flex-1 rounded-full bg-cyan/20">
                    <div className="h-full w-[70%] rounded-full bg-cyan/70" />
                  </div>
                  <div className="h-1 flex-1 rounded-full bg-cyan/20">
                    <div className="h-full w-full rounded-full bg-cyan" />
                  </div>
                </div>
                <div className="mt-2 flex w-full justify-between font-mono text-[9px] text-[#64748b]">
                  <span>2019</span>
                  <span>Research &amp; Pivot</span>
                  <span>10x Revenue</span>
                  <span>2024 IBM</span>
                </div>
              </div>
            </Link>
          )}

          {/* Rest of design projects */}
          {rest.map((p) => (
            <Link
              key={p.slug}
              href={`/design/${p.slug}`}
              className="group relative flex flex-col bg-surface p-11 no-underline transition-colors duration-200 after:absolute after:inset-x-0 after:top-0 after:h-[3px] after:bg-[linear-gradient(90deg,var(--color-violet),var(--color-cyan))] after:opacity-0 after:transition-opacity after:duration-200 hover:bg-surface2 hover:after:opacity-100"
            >
              <div
                className="mb-5 inline-block self-start rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[2px]"
                style={{ color: p.tagColor, background: p.tagBg }}
              >
                {p.tag}
              </div>
              <div className="mb-2 font-display text-4xl tracking-[1px] leading-none text-text">
                {p.title}
              </div>
              {p.role && (
                <div className="mb-4 font-mono text-[12px] text-muted">
                  {p.role} · {p.timeline}
                </div>
              )}
              <div className="mb-7 flex-1 max-w-[380px] text-sm leading-[1.75] text-dim">
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
              <div className="absolute right-10 bottom-10 flex h-[38px] w-[38px] items-center justify-center rounded-full border border-border2 text-[15px] text-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-violet group-hover:text-violet">
                ↗
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
