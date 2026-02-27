import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function ClaudeCodeWorkshopPage() {
  return (
    <>
      <Nav />
      <main className="px-12 pt-[130px] pb-[100px]">
        <div className="mb-4 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[3px] text-violet before:block before:h-px before:w-5 before:bg-violet">
          Free Tool
        </div>
        <h1 className="mb-4 font-display text-[clamp(48px,6vw,80px)] leading-none text-text">
          The Perfect Claude Code Setup
        </h1>
        <p className="mb-8 max-w-[640px] text-lg leading-[1.7] text-dim">
          11-slide interactive workshop. Context architecture, vibecoding
          principles, Docker MCP — everything you need to ship real software
          with AI.
        </p>
        <div className="mb-12 flex items-center gap-4">
          <div className="flex items-center gap-2 font-mono text-[11px] text-muted">
            <div className="h-1.5 w-1.5 rounded-full bg-green shadow-[0_0_6px_var(--color-green)]" />
            <span>Live now</span>
          </div>
          <span className="text-border2">|</span>
          <span className="font-mono text-[11px] text-muted">11 slides</span>
          <span className="text-border2">|</span>
          <span className="font-mono text-[11px] text-muted">Free</span>
        </div>

        {/* Workshop placeholder — replace with actual workshop component */}
        <div className="overflow-hidden rounded-2xl border border-[#222240] bg-[#0d0d1a] p-16 text-center">
          <div className="mb-6 font-mono text-[10px] uppercase tracking-[2px] text-[#a78bfa]">
            Workshop Loading Area
          </div>
          <div className="mb-4 font-display text-4xl text-[#e2e8f0]">
            Claude Code Workshop
          </div>
          <p className="mx-auto mb-8 max-w-md text-sm leading-[1.7] text-[#94a3b8]">
            The interactive 11-slide workshop will be embedded here. This is the
            placeholder for the full workshop component.
          </p>
          <div className="inline-flex items-center gap-2 rounded-lg bg-[linear-gradient(135deg,#7c3aed,#5b21b6)] px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(124,58,237,0.35)]">
            Coming Soon — Workshop Embed
          </div>
        </div>

        <div className="mt-12">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 font-mono text-[13px] text-muted no-underline transition-colors hover:text-text"
          >
            ← Back to tools
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
