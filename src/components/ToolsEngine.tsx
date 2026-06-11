import Link from "next/link";

function BoltGlyph() {
  return (
    <svg className="h-[38px] w-[38px] text-violet" viewBox="0 0 38 38" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M21 3 9 21h8l-2 14L29 15h-9l1-12z" strokeLinejoin="round" />
    </svg>
  );
}

function PersonaGlyph() {
  return (
    <svg className="h-[38px] w-[38px] text-violet" viewBox="0 0 38 38" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="19" cy="13" r="6" />
      <path d="M7 33c0-6.6 5.4-11 12-11s12 4.4 12 11" />
      <circle cx="31" cy="9" r="3.4" />
    </svg>
  );
}

function AuditGlyph() {
  return (
    <svg className="h-[38px] w-[38px] text-violet" viewBox="0 0 38 38" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M6 32V14M15 32V6M24 32V20M33 32V11" strokeLinecap="round" />
    </svg>
  );
}

export default function ToolsEngine() {
  return (
    <section className="px-6 pb-16 md:px-12 md:pb-24" id="tools">
      <div className="fade-up mb-4 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[3px] text-violet before:block before:h-px before:w-5 before:bg-violet">
        Free Tools
      </div>
      <h2 className="fade-up fade-up-delay-1 mb-3 font-display text-[clamp(38px,5vw,64px)] leading-none text-text">
        Use something I{" "}
        <em className="font-accent" style={{ fontStyle: "italic" }}>
          built
        </em>
        .
      </h2>
      <p className="fade-up fade-up-delay-2 max-w-[560px] text-base leading-[1.7] text-dim">
        Every tool is a live argument for the method. Each one ends with
        shareable output — and a question.
      </p>

      <div className="fade-up fade-up-delay-3 mt-11 grid grid-cols-1 gap-px overflow-hidden rounded-[14px] border border-border bg-border md:grid-cols-3">
        <Link
          href="/tools/claude-code-workshop"
          className="relative flex flex-col gap-3 bg-surface p-7 text-text no-underline transition-colors duration-200 hover:bg-surface2"
        >
          <span className="absolute top-5 right-5 h-[7px] w-[7px] rounded-full bg-green shadow-[0_0_8px_var(--color-green)]" />
          <BoltGlyph />
          <div className="font-display text-[23px] tracking-[1px] text-text">Claude Code Workshop</div>
          <p className="flex-1 text-[13px] leading-[1.65] text-muted">
            The 11-slide interactive setup guide for a perfect Claude Code
            environment. Context architecture, vibecoding rules, Docker MCP.
          </p>
          <div className="font-mono text-[11px] text-violet">
            Launch → <span className="text-muted">free · no login</span>
          </div>
        </Link>

        <div className="relative flex flex-col gap-3 bg-surface p-7 opacity-55">
          <span className="absolute top-4 right-4 rounded-[10px] border border-border bg-surface2 px-2 py-[3px] font-mono text-[10px] text-muted">
            shipping next
          </span>
          <PersonaGlyph />
          <div className="font-display text-[23px] tracking-[1px] text-text">Persona Generator</div>
          <p className="flex-1 text-[13px] leading-[1.65] text-muted">
            Type a product description, get research-grade personas built from
            the Persona Library&apos;s 200+ community-validated profiles.
          </p>
          <div className="font-mono text-[11px] text-muted">
            In progress · powered by persona-library.com
          </div>
        </div>

        <div className="relative flex flex-col gap-3 bg-surface p-7 opacity-55">
          <span className="absolute top-4 right-4 rounded-[10px] border border-border bg-surface2 px-2 py-[3px] font-mono text-[10px] text-muted">
            shipping next
          </span>
          <AuditGlyph />
          <div className="font-display text-[23px] tracking-[1px] text-text">UX Audit Scorecard</div>
          <p className="flex-1 text-[13px] leading-[1.65] text-muted">
            Twenty questions, one structured audit. Prioritized recommendations
            you can take straight into your next sprint.
          </p>
          <div className="font-mono text-[11px] text-muted">In progress</div>
        </div>
      </div>

      <div className="fade-up mt-5 flex flex-wrap items-baseline gap-x-3.5 gap-y-2 font-mono text-xs text-muted">
        <b className="font-medium text-text">Each tool: designed, built, and shipped solo in days.</b>
        <span>Want this capability inside your org?</span>
        <Link href="#contact" className="text-violet no-underline hover:text-text">
          Let&apos;s talk →
        </Link>
      </div>
    </section>
  );
}
