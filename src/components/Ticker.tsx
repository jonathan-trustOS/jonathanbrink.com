const items = [
  "UX Design",
  "Vibecoding",
  "AI Product Development",
  "React / Next.js",
  "Claude Code",
  "Interaction Design",
  "Systems Thinking",
  "Currently @ IBM",
  "19 yrs Consulting",
  "Free Tools",
];

export default function Ticker() {
  // Duplicate items for seamless infinite scroll
  const allItems = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-border bg-surface py-3.5">
      <div className="flex whitespace-nowrap animate-[ticker_28s_linear_infinite]">
        {allItems.map((item, i) => (
          <div
            key={i}
            className="inline-flex items-center gap-3 px-8 font-mono text-xs text-muted"
          >
            <span className="h-1 w-1 flex-shrink-0 rounded-full bg-violet opacity-40" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
