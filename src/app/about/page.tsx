import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const stats = [
  { num: "25+", label: "Years Design" },
  { num: "6+", label: "Products Shipped" },
  { num: "∞", label: "Ideas in queue" },
  { num: "0", label: "Devs hired" },
];

const timeline = [
  { year: "2000", label: "Started in UX design" },
  { year: "2007", label: "Founded independent consultancy" },
  { year: "2015", label: "Senior Design roles at enterprise scale" },
  { year: "2023", label: "Discovered vibecoding" },
  { year: "2024", label: "Shipped first products with AI as build partner" },
  { year: "Now", label: "Senior Design Manager @ IBM — Watson.data / AI" },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="px-12 pt-[130px] pb-[100px]">
        <div className="mb-4 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[3px] text-violet before:block before:h-px before:w-5 before:bg-violet">
          About
        </div>
        <h1 className="mb-6 font-display text-[clamp(48px,6vw,80px)] leading-none text-text">
          Twenty-five years of product design.
          <br />
          <em
            className="font-accent bg-[linear-gradient(135deg,var(--color-violet),var(--color-cyan))] bg-clip-text text-transparent"
            style={{ fontStyle: "italic" }}
          >
            Now I build too.
          </em>
        </h1>
        <p className="mb-16 max-w-[640px] text-lg leading-[1.8] text-dim">
          Twenty-five years designing enterprise products — at IBM, StreamSets,
          Charles Schwab, and through my own consultancy. Then vibecoding changed
          everything. I can now take an idea from sketch to shipped product
          without waiting on a team. That changes what&apos;s possible.
        </p>

        {/* Stats */}
        <div className="mb-20 grid grid-cols-4 gap-8">
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

        {/* Timeline */}
        <div className="mb-20">
          <div className="mb-8 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[3px] text-violet before:block before:h-px before:w-5 before:bg-violet">
            Timeline
          </div>
          <div className="space-y-0 border-l border-border pl-8">
            {timeline.map((item) => (
              <div key={item.year} className="relative py-5">
                <div className="absolute -left-[33px] top-6 h-2 w-2 rounded-full border-2 border-violet bg-bg" />
                <div className="font-mono text-[11px] uppercase tracking-[2px] text-violet">
                  {item.year}
                </div>
                <div className="mt-1 text-base text-text">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-border bg-surface p-12">
          <h2 className="mb-4 font-display text-4xl text-text">
            Let&apos;s work together.
          </h2>
          <p className="mb-8 max-w-md text-base leading-[1.7] text-dim">
            Looking for a product designer who can also build? I take on select
            consulting engagements.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 rounded-lg border border-violet bg-violet px-7 py-3.5 text-sm font-semibold text-white no-underline transition-all duration-150 hover:-translate-y-px hover:bg-violet-hover"
          >
            Get in touch →
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
