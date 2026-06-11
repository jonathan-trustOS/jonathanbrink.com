import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About",
  description:
    "Twenty-five years of product design. Now I build too — taking ideas from sketch to shipped product with AI as my build partner.",
};

const stats = [
  { num: "25+", label: "Years Design" },
  { num: "6+", label: "Products Shipped" },
  { num: "∞", label: "Ideas in queue" },
  { num: "0", label: "Devs hired" },
];

const workHistory = [
  {
    company: "IBM",
    role: "Senior Design Manager — watsonx.data Integration",
    years: "2024 – Present",
    success:
      "Defined the architecture and end-to-end experience for unifying four data products — delivered the design roadmap 2x faster than scheduled.",
  },
  {
    company: "StreamSets",
    role: "UX Lead",
    years: "2019 – 2024",
    success:
      "Led the design process for the pivot from open-source to SaaS, helping grow revenue from $6M to $60M — and to a $524M acquisition by IBM.",
  },
  {
    company: "Jonathan Brink Design",
    role: "UX Lead Consultant",
    years: "2007 – Present",
    success:
      "End-to-end, human-centered design engagements for Charles Schwab, Sony, HP, Sunkist, Edelman, and Caltrain.",
  },
  {
    company: "Infinx Healthcare",
    role: "UX Lead",
    years: "2017 – 2019",
    success:
      "Designed the AI-driven healthcare product that carried Infinx from services company to product company.",
  },
  {
    company: "LiveHive",
    role: "VP Product / Senior UX Designer",
    years: "2015 – 2017",
    success:
      "Pivoted a sales tool into an industry-leading sales-enablement platform — licensing grew 10x.",
  },
  {
    company: "Foundationary",
    role: "VP Product / Senior UX Designer",
    years: "2014 – 2015",
    success:
      "Designed a stealth-mode marketplace for nonprofit funding from inception through its business funding milestones.",
  },
];

const timeline = [
  { year: "2000", label: "Started in UX design" },
  { year: "2007", label: "Founded independent consultancy" },
  { year: "2015", label: "Senior Design roles at enterprise scale" },
  { year: "2025", label: "Discovered vibecoding — shipped first products with AI as build partner" },
  { year: "Now", label: "Senior Design Manager @ IBM — Watson.data / AI" },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="px-6 pt-[110px] pb-16 md:px-12 md:pt-[130px] md:pb-[100px]">
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
        <div className="mb-20 grid grid-cols-2 gap-8 md:grid-cols-4">
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

        {/* Work history */}
        <div className="mb-20">
          <div className="mb-2 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[3px] text-violet before:block before:h-px before:w-5 before:bg-violet">
            Work History
          </div>
          <div>
            {workHistory.map((job) => (
              <div
                key={job.company}
                className="grid grid-cols-[220px_1fr] items-baseline gap-8 border-b border-border py-7 max-md:grid-cols-1 max-md:gap-2"
              >
                <div>
                  <div className="font-display text-[26px] leading-tight tracking-[1px] text-text">
                    {job.company}
                  </div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-[2px] text-violet">
                    {job.years}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[12px] text-muted">
                    {job.role}
                  </div>
                  <p className="mt-2 max-w-[640px] text-[15px] leading-[1.7] text-dim">
                    {job.success}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-border bg-surface p-7 md:p-12">
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
