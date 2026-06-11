import Link from "next/link";

const links = [
  { label: "Work", href: "/work" },
  { label: "Design", href: "/design" },
  { label: "Tools", href: "/tools" },
  { label: "Workshops", href: "/workshops" },
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-6 border-t border-border bg-surface px-6 py-9 md:flex-row md:justify-between md:px-12">
      <Link
        href="/"
        className="font-display text-lg tracking-[2px] text-muted no-underline"
      >
        Jonathan Brink
      </Link>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 md:gap-8">
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
