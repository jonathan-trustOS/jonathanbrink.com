import Link from "next/link";
import HeroCarousel from "./HeroCarousel";

export default function HeroSection() {
  return (
    <section className="relative grid min-h-screen grid-cols-2 items-center gap-15 px-12 pt-[130px] pb-20">
      {/* Decorative gradient blob */}
      <div className="pointer-events-none absolute top-[60px] right-[-80px] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,#6d28d9_0%,transparent_70%)] opacity-5" />

      {/* Left column — copy */}
      <div className="relative z-2">
        <div className="mb-6 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[3px] text-violet before:block before:h-px before:w-6 before:bg-violet">
          UX Designer &amp; Vibecoder
        </div>
        <div className="font-display text-[clamp(72px,8vw,120px)] leading-[0.92] tracking-[1px] text-text">
          Design.
        </div>
        <div className="font-display text-[clamp(72px,8vw,120px)] leading-[0.92] tracking-[1px] text-text">
          Build.
        </div>
        <span className="mb-9 block font-accent text-[clamp(72px,8vw,120px)] italic leading-[0.92] bg-[linear-gradient(135deg,var(--color-violet),var(--color-cyan))] bg-clip-text text-transparent">
          Ship.
        </span>
        <p className="mb-11 max-w-[480px] text-[17px] leading-[1.75] text-dim">
          Twenty-five years of product design and development. Now I close the
          gap between concept and code using AI as my build partner.{" "}
          <strong className="font-semibold text-text">
            Products that exist
          </strong>{" "}
          — not just decks that could.
        </p>
        <div className="flex items-center gap-3.5">
          <Link
            href="/work"
            className="inline-flex items-center gap-2.5 rounded-lg border border-violet bg-violet px-7 py-3.5 text-sm font-semibold text-white no-underline transition-all duration-150 hover:-translate-y-px hover:border-violet-hover hover:bg-violet-hover"
          >
            See the work →
          </Link>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 rounded-lg border border-border2 px-5 py-3.5 font-mono text-[13px] text-muted no-underline transition-all duration-150 hover:border-dim hover:text-text"
          >
            Free tools ↗
          </Link>
        </div>
      </div>

      {/* Right column — work carousel */}
      <div className="relative z-2">
        <HeroCarousel />
      </div>
    </section>
  );
}
