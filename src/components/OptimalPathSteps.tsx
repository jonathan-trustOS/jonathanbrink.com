import { OptimalPathPhase } from "@/data/workshops";

const accentMap: Record<OptimalPathPhase["accent"], { dot: string; text: string }> = {
  violet: { dot: "bg-violet", text: "text-violet" },
  cyan: { dot: "bg-cyan", text: "text-cyan" },
  amber: { dot: "bg-amber", text: "text-amber" },
  green: { dot: "bg-green", text: "text-green" },
};

export default function OptimalPathSteps({ phases }: { phases: OptimalPathPhase[] }) {
  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[14px] border border-border bg-border sm:grid-cols-2 lg:grid-cols-2">
      {phases.map((p) => {
        const accent = accentMap[p.accent];
        return (
          <div
            key={p.number}
            className="relative flex flex-col gap-3 bg-surface p-8"
          >
            <div className="flex items-center gap-3">
              <span className={`h-2 w-2 rounded-full ${accent.dot}`} />
              <span className="font-mono text-[11px] uppercase tracking-[2px] text-muted">
                Phase {p.number}
              </span>
            </div>
            <div className="font-display text-[28px] leading-[1.05] tracking-[1px] text-text">
              {p.title}
            </div>
            <div
              className={`font-accent text-[20px] italic ${accent.text}`}
              style={{ fontStyle: "italic" }}
            >
              {p.tagline}
            </div>
            <div className="text-[14.5px] leading-[1.7] text-dim">{p.body}</div>
          </div>
        );
      })}
    </div>
  );
}
