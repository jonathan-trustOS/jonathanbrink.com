import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Work",
  description:
    "Products designed and built end to end — FlowOS, Elle, Persona Library, and more. Not mockups. Shipped products people use.",
};

export default function WorkPage() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <>
      <Nav />
      <main className="px-6 pt-[110px] pb-16 md:px-12 md:pt-[130px] md:pb-[100px]">
        <div className="mb-4 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[3px] text-violet before:block before:h-px before:w-5 before:bg-violet">
          Selected Work
        </div>
        <h1 className="mb-3 font-display text-[clamp(48px,6vw,80px)] leading-none text-text">
          Products I&apos;ve{" "}
          <em className="font-accent" style={{ fontStyle: "italic" }}>
            designed
          </em>{" "}
          and{" "}
          <em className="font-accent" style={{ fontStyle: "italic" }}>
            built
          </em>
          .
        </h1>
        <p className="mb-14 max-w-[560px] text-lg leading-[1.7] text-dim">
          Not mockups. Not concepts. Shipped products that people use — each one
          conceived, designed, and built using vibecoding methodology.
        </p>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[14px] border border-border bg-border md:grid-cols-2">
          {/* Featured card */}
          {featured && (
            <Link
              href={`/work/${featured.slug}`}
              className="group relative grid grid-cols-1 items-center gap-8 bg-surface p-6 md:col-span-2 md:p-11 lg:grid-cols-2 lg:gap-[60px] no-underline transition-colors duration-200 after:absolute after:inset-x-0 after:top-0 after:h-[3px] after:bg-[linear-gradient(90deg,var(--color-violet),var(--color-cyan))] after:opacity-0 after:transition-opacity after:duration-200 hover:bg-surface2 hover:after:opacity-100"
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
                <div className="absolute right-10 bottom-10 hidden h-[38px] w-[38px] items-center justify-center rounded-full border border-border2 text-[15px] text-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-violet group-hover:text-violet md:flex">
                  ↗
                </div>
              </div>
              {featured.heroImage ? (
                <div className="relative aspect-video overflow-hidden rounded-[10px] border border-border bg-[#07070f]">
                  <Image
                    src={featured.heroImage}
                    alt={`${featured.title} — hero`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className="flex aspect-video items-center justify-center overflow-hidden rounded-[10px] border border-border bg-[#07070f]">
                  <div className="relative z-[2] w-[88%] p-4">
                    <div className="mb-3 font-display text-xl leading-[1.1] text-[#e2e8f0]">
                      {featured.title}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[2px] text-muted">
                      {featured.tag}
                    </div>
                  </div>
                </div>
              )}
            </Link>
          )}

          {/* Rest of projects */}
          {rest.map((p) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className="group relative bg-surface p-6 md:p-11 no-underline transition-colors duration-200 after:absolute after:inset-x-0 after:top-0 after:h-[3px] after:bg-[linear-gradient(90deg,var(--color-violet),var(--color-cyan))] after:opacity-0 after:transition-opacity after:duration-200 hover:bg-surface2 hover:after:opacity-100"
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
              <div className="absolute right-10 bottom-10 hidden h-[38px] w-[38px] items-center justify-center rounded-full border border-border2 text-[15px] text-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-violet group-hover:text-violet md:flex">
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
