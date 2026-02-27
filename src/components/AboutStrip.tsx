import Link from "next/link";

const stats = [
  { num: "25+", label: "Years Design" },
  { num: "6+", label: "Products Shipped" },
  { num: "∞", label: "Ideas in queue" },
  { num: "0", label: "Devs hired" },
];

export default function AboutStrip() {
  return (
    <section className="grid grid-cols-[1fr_1px_1fr] items-center gap-15 border-t border-border bg-surface px-12 py-20">
      <div>
        <h2 className="mb-5 font-display text-[clamp(36px,4vw,58px)] leading-[1.05] text-text">
          Twenty-five years of product design.
          <br />
          <em
            className="font-accent not-italic bg-[linear-gradient(135deg,var(--color-violet),var(--color-cyan))] bg-clip-text text-transparent"
            style={{ fontStyle: "italic" }}
          >
            Now I build too.
          </em>
        </h2>
        <p className="mb-8 text-base leading-[1.8] text-dim">
          Twenty-five years designing enterprise products — at IBM, StreamSets,
          Charles Schwab, and through my own consultancy. Then vibecoding changed
          everything. I can now take an idea from sketch to shipped product
          without waiting on a team. That changes what&apos;s possible.
        </p>
        <Link
          href="/about"
          className="inline-flex items-center gap-2 rounded-lg border border-border2 px-5 py-3.5 font-mono text-[13px] text-muted no-underline transition-all duration-150 hover:border-dim hover:text-text"
        >
          Read my story →
        </Link>
      </div>

      {/* Divider */}
      <div className="h-full bg-border" />

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-7">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="font-display text-[52px] leading-none bg-[linear-gradient(135deg,var(--color-violet),var(--color-cyan))] bg-clip-text text-transparent">
              {s.num}
            </div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-[2px] text-muted">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
