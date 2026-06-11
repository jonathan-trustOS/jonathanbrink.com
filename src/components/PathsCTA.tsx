"use client";

import { useState } from "react";
import Link from "next/link";

const PATHS = [
  {
    id: "hire",
    tab: "Hire me",
    title: "Design leadership that ships.",
    body: "Select consulting engagements: product strategy, design org leadership, and AI-assisted prototyping programs. I bring the FlowOS playbook — research to deployed product, with your team learning the method as we go.",
    cta: "Start a conversation →",
    href: "/contact",
  },
  {
    id: "train",
    tab: "Train my team",
    title: "Make your designers builders.",
    body: "Live cohort workshops where every attendee ships a working product. The Optimal Path: context architecture, vibecoding rules, and the intent-and-outcome process I used to build FlowOS in 14 days.",
    cta: "See the workshops →",
    href: "/workshops",
  },
  {
    id: "explore",
    tab: "Just exploring",
    title: "Take the tools. They're free.",
    body: "No login, no funnel tricks. Use the tools, read the case studies, steal the method. If something resonates, you know where I am — and the essays go deeper on the thinking.",
    cta: "Browse the tools →",
    href: "/tools",
  },
];

export default function PathsCTA() {
  const [active, setActive] = useState("hire");
  const current = PATHS.find((p) => p.id === active) ?? PATHS[0];

  return (
    <section className="px-6 py-16 md:px-12 md:py-24" id="contact">
      <div className="fade-up mb-4 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[3px] text-violet before:block before:h-px before:w-5 before:bg-violet">
        Work With Me
      </div>
      <h2 className="fade-up fade-up-delay-1 mb-3 font-display text-[clamp(38px,5vw,64px)] leading-none text-text">
        What brings you{" "}
        <em className="font-accent" style={{ fontStyle: "italic" }}>
          here
        </em>
        ?
      </h2>

      <div className="fade-up fade-up-delay-2 mt-9 overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="flex border-b border-border" role="tablist" aria-label="What brings you here">
          {PATHS.map((p) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={p.id === active}
              onClick={() => setActive(p.id)}
              className={`flex-1 border-r border-border px-2 py-3.5 font-mono text-[10px] uppercase tracking-[0.5px] last:border-r-0 md:px-2.5 md:py-4 md:text-[11.5px] md:tracking-[1px] ${
                p.id === active
                  ? "bg-surface text-violet shadow-[inset_0_3px_0_var(--color-violet)]"
                  : "cursor-pointer bg-surface2 text-muted hover:text-text"
              }`}
            >
              {p.tab}
            </button>
          ))}
        </div>
        <div className="p-6 md:p-10">
          <h3 className="mb-2.5 font-display text-[clamp(28px,3.4vw,42px)] leading-tight text-text">
            {current.title}
          </h3>
          <p className="mb-6 max-w-[560px] text-[15px] leading-[1.7] text-dim">{current.body}</p>
          <Link
            href={current.href}
            className="inline-flex items-center gap-2 rounded-lg border border-violet bg-violet px-6 py-3 text-sm font-semibold text-white no-underline transition-all duration-150 hover:-translate-y-px hover:bg-violet-hover"
          >
            {current.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
