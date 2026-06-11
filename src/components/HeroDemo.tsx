"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

const CHIPS = [
  "Top customers by revenue, last quarter",
  "Churn risk by segment",
  "Pipeline health, EMEA",
];

const PLAN: { agent: string; text: (i: string) => string; ms: number }[] = [
  { agent: "listener", text: (i) => `heard: "${i}" — reframed for review`, ms: 850 },
  { agent: "coordinator", text: () => "deterministic plan · 6 tasks · <1ms", ms: 300 },
  { agent: "parallel ×3", text: () => "data resolver · policy checker · schema monitor", ms: 1100 },
  { agent: "flow builder", text: () => "pipeline generated · PII excluded at the SQL layer", ms: 1200 },
  { agent: "quality", text: () => "output validated · 12/12 checks", ms: 700 },
];

interface Step {
  agent: string;
  text: string;
  done: boolean;
  t?: string;
}

export default function HeroDemo() {
  const [value, setValue] = useState("");
  const [steps, setSteps] = useState<Step[]>([]);
  const [total, setTotal] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const runId = useRef(0);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    const ids = runId;
    return () => {
      mounted.current = false;
      ids.current++;
    };
  }, []);

  const run = useCallback(async (intentText?: string) => {
    const id = ++runId.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setRunning(true);
    setSteps([]);
    setTotal(null);
    let intent = (intentText ?? "").trim();
    setValue((prev) => {
      intent = (intent || prev.trim() || CHIPS[0]).slice(0, 80);
      return intent;
    });
    // allow the state updater above to resolve the intent
    await Promise.resolve();
    const t0 = performance.now();
    for (const s of PLAN) {
      if (!mounted.current || runId.current !== id) return;
      setSteps((prev) => [...prev, { agent: s.agent, text: s.text(intent), done: false }]);
      await new Promise((r) => setTimeout(r, reduced ? 60 : s.ms));
      if (!mounted.current || runId.current !== id) return;
      const t = ((performance.now() - t0) / 1000).toFixed(1) + "s";
      setSteps((prev) =>
        prev.map((p, i) => (i === prev.length - 1 ? { ...p, done: true, t } : p)),
      );
    }
    if (!mounted.current || runId.current !== id) return;
    setTotal(((performance.now() - t0) / 1000).toFixed(1));
    setRunning(false);
  }, []);

  // Auto-run once so the proof is moving before anyone touches it
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = setTimeout(() => run(CHIPS[0]), reduced ? 0 : 900);
    return () => clearTimeout(timer);
  }, [run]);

  return (
    <div className="overflow-hidden rounded-2xl border border-[#222240] bg-[#0d0d1a] shadow-[0_24px_64px_rgba(0,0,0,0.14),0_0_0_1px_rgba(109,40,217,0.12)]">
      {/* Window bar */}
      <div className="flex items-center justify-between border-b border-[#1a1a2e] bg-[#07070f] px-[18px] py-3.5">
        <div className="flex gap-[7px]">
          <div className="h-[11px] w-[11px] rounded-full bg-[#ff6b6b]" />
          <div className="h-[11px] w-[11px] rounded-full bg-[#ffd93d]" />
          <div className="h-[11px] w-[11px] rounded-full bg-[#6bcb77]" />
        </div>
        <div className="font-mono text-[11px] text-[#475569]">
          flowos — live demo · <span className="text-[#34d399]">●</span> ready
        </div>
      </div>

      {/* Body */}
      <div className="p-4 md:p-[22px]">
        <div className="flex gap-2.5">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !running) run();
            }}
            placeholder="Ask for any dataset, in plain English…"
            aria-label="Describe the dataset you want"
            className="min-w-0 flex-1 rounded-lg border border-[#1a1a2e] bg-[#111125] px-3.5 py-3 font-mono text-[13px] text-[#e2e8f0] outline-none placeholder:text-[#475569] focus:border-[#7c3aed]"
          />
          <button
            type="button"
            onClick={() => run()}
            disabled={running}
            className="whitespace-nowrap rounded-lg bg-[linear-gradient(135deg,#7c3aed,#5b21b6)] px-5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(124,58,237,0.35)] transition-transform hover:-translate-y-px disabled:cursor-wait disabled:opacity-60 disabled:hover:translate-y-0"
          >
            Run ↵
          </button>
        </div>

        <div className="mt-2.5 flex flex-wrap gap-[7px]">
          {CHIPS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => !running && run(c)}
              className="rounded-full border border-[#1a1a2e] bg-[#111125] px-3 py-1.5 font-mono text-[10.5px] text-[#94a3b8] transition-colors hover:border-[#7c3aed] hover:text-[#e2e8f0]"
            >
              {c}
            </button>
          ))}
        </div>

        {/* Run output */}
        <div className="mt-4 min-h-[248px] border-t border-dashed border-[#1a1a2e] pt-4" aria-live="polite">
          {steps.map((s, i) => (
            <div key={i} className="flex items-start gap-2.5 py-[5px] font-mono text-[12.5px] text-[#94a3b8]">
              <span
                className={`w-4 flex-shrink-0 text-center ${
                  s.done ? "text-[#34d399]" : "inline-block animate-[rot_0.9s_linear_infinite] text-[#7c3aed]"
                }`}
              >
                {s.done ? "✓" : "◌"}
              </span>
              <span className="min-w-0">
                <span className="text-[#a78bfa]">{s.agent}</span>
                <span className="text-[#475569]"> · </span>
                {s.text}
              </span>
              <span className="ml-auto flex-shrink-0 text-[#475569]">{s.t ?? ""}</span>
            </div>
          ))}

          {total && (
            <div className="mt-3.5 rounded-[10px] border border-[#34d39940] bg-[#111125] p-4 animate-[fadeIn_0.4s_ease]">
              <div className="flex flex-wrap items-baseline justify-between gap-2.5">
                <b className="text-[15px] font-semibold text-[#e2e8f0]">Your dataset is ready</b>
                <span className="font-mono text-[11px] text-[#34d399]">✓ {total}s · healthy</span>
              </div>
              <div className="mt-1.5 font-mono text-[11px] text-[#94a3b8]">
                198 rows · 3 columns · account_id, balance, customer_status
              </div>
              <div className="mt-2.5 font-mono text-[10.5px] text-[#fbbf24]">
                ⚠ 2 sensitive fields excluded by policy for your protection
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#1a1a2e] bg-[#07070f] px-[22px] py-3">
        <span className="font-mono text-[10.5px] text-[#475569]">
          simulated run · the real thing shipped at IBM in 14 days
        </span>
        <Link
          href="/work/flowos"
          className="whitespace-nowrap font-mono text-[11px] text-[#a78bfa] no-underline transition-colors hover:text-[#e2e8f0]"
        >
          read the case study →
        </Link>
      </div>
    </div>
  );
}
