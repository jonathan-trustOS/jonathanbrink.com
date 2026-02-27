import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const tools = [
  {
    num: "01",
    icon: "⚡",
    name: "Claude Code Workshop",
    desc: "11-slide interactive setup guide for the perfect Claude Code environment. Context architecture, vibecoding rules, Docker MCP — everything you need to ship real software with AI.",
    slug: "claude-code-workshop",
    live: true,
  },
  {
    num: "02",
    icon: "🧠",
    name: "Persona Generator",
    desc: "Generate deep UX personas from a product description. Powered by Claude. Export to PDF or Notion.",
    slug: null,
    live: false,
  },
  {
    num: "03",
    icon: "📐",
    name: "UX Audit Scorecard",
    desc: "Answer 20 questions about your product and get a structured UX audit with prioritized recommendations.",
    slug: null,
    live: false,
  },
];

export default function ToolsPage() {
  return (
    <>
      <Nav />
      <main className="px-12 pt-[130px] pb-[100px]">
        <div className="mb-4 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[3px] text-violet before:block before:h-px before:w-5 before:bg-violet">
          Free Tools
        </div>
        <h1 className="mb-3 font-display text-[clamp(48px,6vw,80px)] leading-none text-text">
          Built to be{" "}
          <em className="font-accent" style={{ fontStyle: "italic" }}>
            used
          </em>
          .
        </h1>
        <p className="mb-14 max-w-[560px] text-lg leading-[1.7] text-dim">
          A growing library of tools I&apos;ve vibecoded. Free. No login. Just
          useful.
        </p>

        <div className="grid grid-cols-3 gap-px overflow-hidden rounded-[14px] border border-border bg-border">
          {tools.map((tool) => {
            const inner = (
              <>
                {tool.live ? (
                  <div className="absolute top-5 right-5 h-[7px] w-[7px] rounded-full bg-green shadow-[0_0_8px_var(--color-green)]" />
                ) : (
                  <div className="absolute top-4 right-4 rounded-[10px] border border-border bg-surface2 px-2 py-[3px] font-mono text-[10px] text-muted">
                    Coming soon
                  </div>
                )}
                <div className="mb-1 font-mono text-[11px] text-border2">
                  {tool.num}
                </div>
                <div className="mb-1 text-[30px]">{tool.icon}</div>
                <div className="font-display text-[22px] tracking-[1px] leading-[1.1] text-text">
                  {tool.name}
                </div>
                <div className="flex-1 text-[13px] leading-[1.65] text-muted">
                  {tool.desc}
                </div>
                <div className="mt-2 flex items-center gap-1.5 font-mono text-xs text-violet">
                  {tool.live ? (
                    <>
                      Launch →{" "}
                      <span className="text-[10px] text-muted">Free</span>
                    </>
                  ) : (
                    <span className="text-muted">In progress</span>
                  )}
                </div>
              </>
            );

            if (tool.live && tool.slug) {
              return (
                <Link
                  key={tool.num}
                  href={`/tools/${tool.slug}`}
                  className="relative flex flex-col gap-2.5 bg-surface px-8 py-9 text-text no-underline transition-colors duration-200 hover:bg-surface2"
                >
                  {inner}
                </Link>
              );
            }

            return (
              <div
                key={tool.num}
                className="relative flex cursor-default flex-col gap-2.5 bg-surface px-8 py-9 opacity-50"
              >
                {inner}
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
