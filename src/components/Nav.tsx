import Link from "next/link";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-100 flex items-center justify-between border-b border-border bg-bg/92 px-12 py-5 backdrop-blur-[12px]">
      <Link
        href="/"
        className="font-display text-[22px] tracking-[2px] text-text no-underline"
      >
        Jonathan<span className="text-violet">.</span>Brink
      </Link>
      <div className="flex items-center gap-9">
        <Link
          href="/work"
          className="font-mono text-xs uppercase tracking-[1px] text-muted no-underline transition-colors duration-150 hover:text-text"
        >
          Work
        </Link>
        <Link
          href="/design"
          className="font-mono text-xs uppercase tracking-[1px] text-muted no-underline transition-colors duration-150 hover:text-text"
        >
          Design
        </Link>
        <Link
          href="/tools"
          className="font-mono text-xs uppercase tracking-[1px] text-muted no-underline transition-colors duration-150 hover:text-text"
        >
          Tools
        </Link>
        <Link
          href="/writing"
          className="font-mono text-xs uppercase tracking-[1px] text-muted no-underline transition-colors duration-150 hover:text-text"
        >
          Writing
        </Link>
        <Link
          href="/about"
          className="font-mono text-xs uppercase tracking-[1px] text-muted no-underline transition-colors duration-150 hover:text-text"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="rounded-md border border-violet px-5 py-2.5 font-mono text-xs uppercase tracking-[1px] text-violet no-underline transition-all duration-150 hover:bg-violet hover:text-white"
        >
          Get in touch
        </Link>
      </div>
    </nav>
  );
}
