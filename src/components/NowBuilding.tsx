const ITEMS = [
  {
    when: "This week",
    what: "Site v2 — live demo homepage, FlowOS case study, full responsive rebuild",
    where: "jonathanbrink.com",
    status: "✓ shipped",
  },
  {
    when: "In progress",
    what: "Persona Generator — wiring Persona Library data to the generation flow",
    where: "Tools",
    status: "building",
  },
  {
    when: "In progress",
    what: "Elle — training continues, Phase 1 SFT complete",
    where: "TrustOS",
    status: "building",
  },
  {
    when: "In progress",
    what: "MCP endpoint — let agents query this portfolio directly",
    where: "jonathanbrink.com/mcp",
    status: "building",
  },
];

export default function NowBuilding() {
  return (
    <section className="border-t border-border bg-surface" id="now">
      <div className="px-6 py-16 md:px-12 md:py-24">
        <div className="fade-up mb-4 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[3px] text-violet before:block before:h-px before:w-5 before:bg-violet">
          Now Building
        </div>
        <h2 className="fade-up fade-up-delay-1 mb-3 font-display text-[clamp(38px,5vw,64px)] leading-none text-text">
          The site has a{" "}
          <em className="font-accent" style={{ fontStyle: "italic" }}>
            pulse
          </em>
          .
        </h2>
        <p className="fade-up fade-up-delay-2 max-w-[560px] text-base leading-[1.7] text-dim">
          What&apos;s on the bench right now — updated as things ship, not
          quarterly.
        </p>

        <div className="fade-up fade-up-delay-3 mt-9 border-t border-border">
          {ITEMS.map((item) => (
            <div
              key={item.what}
              className="grid grid-cols-1 gap-1 border-b border-border py-[18px] md:grid-cols-[150px_1fr_auto] md:items-baseline md:gap-5"
            >
              <span className="font-mono text-[11px] uppercase tracking-[1px] text-violet">
                {item.when}
              </span>
              <span className="text-[15px] text-text">
                {item.what} <span className="text-muted">· {item.where}</span>
              </span>
              <span className={`font-mono text-[11px] ${item.status.startsWith("✓") ? "text-green" : "text-muted"}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
