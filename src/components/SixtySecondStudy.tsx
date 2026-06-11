import Image from "next/image";
import Link from "next/link";

const STATS = [
  { v: "14", k: "days, end to end" },
  { v: "696", k: "tests, green" },
  { v: "<60s", k: "intent → dataset" },
  { v: "2×", k: "roadmap acceleration" },
];

const CUTS = [
  {
    title: "Five primitives, not fifty.",
    body: "Source, Entity, Intent, Flow, Dataset. Everything else: automated, hidden, or cut.",
  },
  {
    title: "PII excluded, not masked.",
    body: "Governance at the SQL layer — compliance became structural, not behavioral.",
  },
  {
    title: "60 seconds as discipline.",
    body: "A hard wall-clock budget. Anything that broke it got redesigned or cut.",
  },
];

export default function SixtySecondStudy() {
  return (
    <section className="px-6 py-16 md:px-12 md:py-24" id="work">
      <div className="fade-up mb-4 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[3px] text-violet before:block before:h-px before:w-5 before:bg-violet">
        Selected Work
      </div>
      <h2 className="fade-up fade-up-delay-1 mb-3 font-display text-[clamp(38px,5vw,64px)] leading-none text-text">
        Proof, in{" "}
        <em className="font-accent" style={{ fontStyle: "italic" }}>
          sixty seconds
        </em>
        .
      </h2>
      <p className="fade-up fade-up-delay-2 max-w-[560px] text-base leading-[1.7] text-dim">
        Every case study opens with the version a busy VP actually reads. The
        depth is one click away.
      </p>

      <div className="fade-up fade-up-delay-3 mt-11 overflow-hidden rounded-2xl border border-border bg-surface">
        {/* Top: title + shot */}
        <div className="relative grid grid-cols-1 items-center gap-8 border-b border-border p-6 before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-[linear-gradient(90deg,var(--color-violet),var(--color-cyan))] md:p-10 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
          <div>
            <span className="inline-block rounded-full bg-[#6d28d912] px-3 py-1 font-mono text-[10px] uppercase tracking-[2px] text-violet">
              Enterprise · AI · IBM watsonx.data
            </span>
            <h3 className="mt-3.5 mb-2.5 font-display text-[clamp(40px,4.5vw,60px)] leading-[0.95] text-text">
              FlowOS
            </h3>
            <p className="max-w-[440px] text-[15px] leading-[1.7] text-dim">
              14 days to prove a design team can ship working enterprise
              software. Typed intent to a governed dataset in under 60 seconds —
              the build that greenlit the bigger version and pushed an MCP
              server into the platform.
            </p>
          </div>
          <div className="overflow-hidden rounded-[10px] border border-border bg-[#07070f]">
            <Image
              src="/images/work/flowos/screen-delivered-dataset.jpg"
              alt="FlowOS — delivered dataset view"
              width={1516}
              height={758}
              className="h-auto w-full"
            />
          </div>
        </div>

        {/* The 60-second version */}
        <div className="p-6 md:px-10 md:pt-6 md:pb-9">
          <div className="font-mono text-[10px] uppercase tracking-[2.5px] text-muted">
            ▼ The 60-second version
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3.5 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.k} className="rounded-[10px] border border-border bg-bg p-4">
                <div className="font-display text-[38px] leading-none text-text">{s.v}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[1.5px] text-muted">
                  {s.k}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3.5 grid grid-cols-1 gap-3.5 md:grid-cols-3">
            {CUTS.map((c) => (
              <div key={c.title} className="rounded-[10px] border border-border bg-bg p-4 text-[13px] leading-[1.6] text-dim">
                <b className="mb-1 block text-[13.5px] font-semibold text-text">{c.title}</b>
                {c.body}
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link
              href="/work/flowos"
              className="inline-flex items-center gap-2 rounded-lg border border-violet bg-violet px-6 py-3 text-sm font-semibold text-white no-underline transition-all duration-150 hover:-translate-y-px hover:bg-violet-hover"
            >
              Read the full case study →
            </Link>
            <span className="font-mono text-[11px] text-muted">
              8 min · research, trade-offs, architecture, outcome
            </span>
            <Link
              href="/work"
              className="font-mono text-[12px] text-violet no-underline transition-colors hover:text-text"
            >
              All projects →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
