import HeroDemo from "./HeroDemo";

export default function HeroV2() {
  return (
    <section className="relative grid grid-cols-1 items-center gap-12 overflow-x-clip px-6 pt-[120px] pb-16 md:px-12 lg:min-h-[92vh] lg:grid-cols-2 lg:gap-14 lg:pt-[150px]">
      {/* Decorative gradient blob */}
      <div className="pointer-events-none absolute top-[60px] right-[-80px] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,#6d28d9_0%,transparent_70%)] opacity-5" />

      {/* Left — the claim */}
      <div className="relative z-[2]">
        <div className="mb-6 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[3px] text-violet before:block before:h-px before:w-6 before:bg-violet">
          UX Designer &amp; Vibecoder
        </div>
        <h1 className="font-display text-[clamp(56px,12vw,118px)] leading-[0.92] tracking-[1px] text-text">
          <span className="hero-word block">Design.</span>
          <span className="hero-word block [animation-delay:0.15s]">Build.</span>
          <span className="hero-word block bg-[linear-gradient(135deg,var(--color-violet),var(--color-cyan))] bg-clip-text pr-[0.1em] font-accent italic text-transparent [animation-delay:0.3s]">
            Ship.
          </span>
        </h1>
        <p className="mt-8 mb-5 max-w-[460px] text-[17px] leading-[1.75] text-dim">
          Twenty-five years of product design. Now I close the gap between
          concept and code using AI as my build partner.{" "}
          <strong className="font-semibold text-text">Products that exist</strong>{" "}
          — and one of them is running right here. Try it.
        </p>
        <div className="font-mono text-xs text-muted">
          → that window is <b className="font-medium text-green">not a screenshot</b>
        </div>
      </div>

      {/* Right — the proof */}
      <div className="relative z-[2]">
        <HeroDemo />
      </div>
    </section>
  );
}
