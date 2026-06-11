"use client";

import { useEffect, useRef } from "react";

const STATS = [
  { value: 6, suffix: "", label: "products live" },
  { value: 25, suffix: "+", label: "years of design" },
  { value: 696, suffix: "", label: "tests green · flowos" },
  { value: 14, suffix: "d", label: "idea → deployed, record" },
];

const LOG = [
  { ok: true, text: "deploy · jonathanbrink.com", ref: "v2.0" },
  { ok: true, text: "696/696 tests · flowos" },
  { ok: false, text: "in training · elle — phase 1 SFT complete" },
  { ok: true, text: "live · persona-library.com" },
  { ok: false, text: "in progress · persona generator" },
  { ok: true, text: "live · playexposed.com" },
  { ok: true, text: "live · swywrite.com" },
  { ok: false, text: "cohort open · optimal path workshop" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        io.unobserve(el);
        if (reduced) {
          el.textContent = value.toLocaleString();
          return;
        }
        const t0 = performance.now();
        const dur = 1100;
        const tick = (t: number) => {
          const p = Math.min((t - t0) / dur, 1);
          el.textContent = Math.round(value * (1 - Math.pow(1 - p, 3))).toLocaleString();
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <div className="font-display text-[34px] leading-none bg-[linear-gradient(135deg,var(--color-violet),var(--color-cyan))] bg-clip-text text-transparent">
      <span ref={ref}>0</span>
      {suffix && <span className="text-xl">{suffix}</span>}
    </div>
  );
}

export default function TelemetryStrip() {
  // Duplicate the log for a seamless marquee loop
  const items = [...LOG, ...LOG];

  return (
    <div className="border-y border-border bg-surface">
      <div className="grid grid-cols-2 border-b border-border md:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`px-6 py-[18px] ${i > 0 ? "md:border-l md:border-border" : ""} ${
              i % 2 === 1 ? "border-l border-border" : ""
            } ${i < 2 ? "max-md:border-b max-md:border-border" : ""}`}
          >
            <Counter value={s.value} suffix={s.suffix} />
            <div className="mt-1 font-mono text-[10px] uppercase tracking-[2px] text-muted">
              {s.label}
            </div>
          </div>
        ))}
      </div>
      <div className="overflow-hidden py-[11px]" aria-hidden="true">
        <div className="flex w-max whitespace-nowrap animate-[ticker_36s_linear_infinite]">
          {items.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-2 px-[26px] font-mono text-[11.5px] text-muted">
              {item.ok && <span className="text-green">✓</span>}
              {item.text}
              {item.ref && <span className="text-violet">{item.ref}</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
