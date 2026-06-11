"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { label: "Work", href: "/work" },
  { label: "Design", href: "/design" },
  { label: "Tools", href: "/tools" },
  { label: "Workshops", href: "/workshops" },
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-100 border-b border-border bg-bg/92 backdrop-blur-[12px]">
      <div className="flex items-center justify-between px-6 py-4 md:px-12 md:py-5">
        <Link
          href="/"
          className="font-display text-[22px] tracking-[2px] text-text no-underline"
          onClick={() => setOpen(false)}
        >
          Jonathan<span className="text-violet">.</span>Brink
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-9 lg:flex">
          <span className="flex items-center gap-2 font-mono text-[11px] text-muted">
            <span className="h-[7px] w-[7px] animate-[pulse-dot_2.4s_ease_infinite] rounded-full bg-green shadow-[0_0_8px_var(--color-green)]" />
            all systems shipping
          </span>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-mono text-xs uppercase tracking-[1px] text-muted no-underline transition-colors duration-150 hover:text-text"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="whitespace-nowrap rounded-md border border-violet px-5 py-2.5 font-mono text-xs uppercase tracking-[1px] text-violet no-underline transition-all duration-150 hover:bg-violet hover:text-white"
          >
            Get in touch
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-11 w-11 items-center justify-center rounded-md border border-border text-text lg:hidden"
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-200 ${
                open ? "top-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-px w-full bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 bottom-0 h-px w-full bg-current transition-transform duration-200 ${
                open ? "bottom-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="border-t border-border bg-bg px-6 pb-6 pt-2 lg:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-border py-3.5 font-mono text-[13px] uppercase tracking-[1px] text-dim no-underline transition-colors duration-150 hover:text-text"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-5 block rounded-md border border-violet px-5 py-3 text-center font-mono text-xs uppercase tracking-[1px] text-violet no-underline transition-all duration-150 hover:bg-violet hover:text-white"
          >
            Get in touch
          </Link>
        </div>
      )}
    </nav>
  );
}
