import Link from "next/link";

const links = [
  { label: "Work", href: "/work" },
  { label: "Design", href: "/design" },
  { label: "Tools", href: "/tools" },
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "mailto:hello@jonathanbrink.com" },
];

export default function Footer() {
  return (
    <footer className="flex items-center justify-between border-t border-border bg-surface px-12 py-9">
      <Link
        href="/"
        className="font-display text-lg tracking-[2px] text-muted no-underline"
      >
        Jonathan Brink
      </Link>
      <div className="flex gap-8">
        {links.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            className="font-mono text-[11px] uppercase tracking-[1px] text-muted no-underline transition-colors duration-150 hover:text-text"
          >
            {l.label}
          </Link>
        ))}
      </div>
      <div className="font-mono text-[11px] text-border2">© 2026</div>
    </footer>
  );
}
