"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface CarouselItem {
  title: string;
  desc: string;
  tag: string;
  tagColor: string;
  tagBg: string;
  href: string;
  cta: string;
  pills: string[];
}

const items: CarouselItem[] = [
  {
    title: "Persona Library",
    desc: "Open-source UX research platform. 200+ community-validated personas for the tools that run modern work.",
    tag: "Community Platform",
    tagColor: "var(--color-amber)",
    tagBg: "#d9770610",
    href: "/work/persona-library",
    cta: "View project",
    pills: ["Next.js", "Community-sourced", "200+ personas"],
  },
  {
    title: "StreamSets → IBM",
    desc: "Led UX from open-source tool to enterprise SaaS. 10x adoption growth. $524M acquisition by IBM.",
    tag: "Case Study",
    tagColor: "var(--color-cyan)",
    tagBg: "#0891b212",
    href: "/design/streamsets",
    cta: "Read case study",
    pills: ["UX Lead", "Enterprise", "6 years"],
  },
  {
    title: "User Experience",
    desc: "A mindset for living with intelligence. How do we use limitless AI to expand into wisdom — not shrink into speed?",
    tag: "Essay",
    tagColor: "var(--color-violet)",
    tagBg: "var(--color-violet-dim)",
    href: "/writing/user-experience",
    cta: "Read essay",
    pills: ["Philosophy", "AI", "Agency"],
  },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % items.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const item = items[active];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="overflow-hidden rounded-2xl border border-[#222240] bg-[#0d0d1a] shadow-[0_24px_64px_rgba(0,0,0,0.12),0_0_0_1px_rgba(109,40,217,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_36px_80px_rgba(0,0,0,0.18),0_0_0_1px_rgba(109,40,217,0.22)]">
        {/* Header dots + indicator */}
        <div className="flex items-center justify-between border-b border-[#1a1a2e] bg-[#07070f] px-[18px] py-3.5">
          <div className="flex gap-[7px]">
            <div className="h-[11px] w-[11px] rounded-full bg-[#ff6b6b]" />
            <div className="h-[11px] w-[11px] rounded-full bg-[#ffd93d]" />
            <div className="h-[11px] w-[11px] rounded-full bg-[#6bcb77]" />
          </div>
          <div className="font-mono text-[11px] text-[#475569]">
            {active + 1} / {items.length}
          </div>
        </div>

        {/* Card body */}
        <div className="px-7 py-8">
          <div
            className="mb-4 inline-block rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[2px] transition-colors duration-300"
            style={{ color: item.tagColor, background: item.tagBg }}
          >
            {item.tag}
          </div>

          <div
            key={active}
            className="animate-[fadeIn_0.35s_ease]"
          >
            <div className="mb-3 font-display text-[30px] leading-[1.05] tracking-[1px] text-[#e2e8f0]">
              {item.title}
            </div>
            <div className="mb-6 min-h-[48px] text-sm leading-[1.7] text-[#94a3b8]">
              {item.desc}
            </div>
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-2">
            {item.pills.map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-[#1a1a2e] bg-[#111125] px-2.5 py-0.5 font-mono text-[10px] text-[#475569]"
              >
                {pill}
              </span>
            ))}
          </div>

          <Link
            href={item.href}
            className="inline-flex items-center gap-2.5 rounded-lg bg-[linear-gradient(135deg,#7c3aed,#5b21b6)] px-[22px] py-[11px] text-sm font-semibold text-white no-underline shadow-[0_4px_20px_rgba(124,58,237,0.35)] transition-all duration-150 hover:-translate-y-px hover:shadow-[0_6px_28px_rgba(124,58,237,0.5)]"
          >
            {item.cta} →
          </Link>

          {/* Slide indicators */}
          <div className="mt-[22px] flex gap-2 border-t border-[#1a1a2e] pt-[18px]">
            {items.map((slide, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative h-[42px] flex-1 cursor-pointer overflow-hidden rounded border transition-all duration-200 ${
                  i === active
                    ? "border-[#7c3aed] opacity-100"
                    : "border-transparent opacity-40 hover:opacity-70"
                }`}
                style={{ background: "#1a1a2e" }}
              >
                <div className="absolute inset-1.5 flex flex-col justify-center gap-[3px]">
                  <div
                    className="h-[3px] rounded-sm font-mono text-[8px] leading-none"
                    style={{
                      width: "70%",
                      background: i === active ? "#7c3aed55" : "#2d2d4a",
                    }}
                  />
                  <div className="h-[3px] w-[85%] rounded-sm bg-[#2d2d4a]" />
                  <div className="h-[3px] w-[60%] rounded-sm bg-[#222238]" />
                </div>
                {/* Progress bar for active slide */}
                {i === active && !paused && (
                  <div
                    className="absolute bottom-0 left-0 h-[2px] bg-[#7c3aed] animate-[progress_5s_linear]"
                    key={`progress-${active}`}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
