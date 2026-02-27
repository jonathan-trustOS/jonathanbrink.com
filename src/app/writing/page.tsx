import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { essays } from "@/data/essays";

export default function WritingPage() {
  const pinned = essays.filter((e) => e.pinned);
  const rest = essays.filter((e) => !e.pinned);

  return (
    <>
      <Nav />
      <main className="px-12 pt-[130px] pb-[100px]">
        <div className="mb-4 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[3px] text-violet before:block before:h-px before:w-5 before:bg-violet">
          Writing
        </div>
        <h1 className="mb-4 font-display text-[clamp(48px,6vw,80px)] leading-none text-text">
          Thinking out{" "}
          <em className="font-accent" style={{ fontStyle: "italic" }}>
            loud
          </em>
          .
        </h1>
        <p className="mb-14 max-w-[560px] text-lg leading-[1.7] text-dim">
          Essays on product design, vibecoding, AI-augmented development, and
          the craft of shipping real products.
        </p>

        {/* Pinned essays — featured at top */}
        {pinned.map((essay) => (
          <Link
            key={essay.slug}
            href={`/writing/${essay.slug}`}
            className="group mb-8 block rounded-2xl border border-border bg-surface p-10 no-underline transition-all duration-200 hover:border-violet/30 hover:shadow-[0_2px_24px_rgba(109,40,217,0.06)]"
            style={{
              borderTop: "3px solid transparent",
              borderImage:
                "linear-gradient(90deg, var(--color-violet), var(--color-cyan)) 1",
              borderImageSlice: "1 0 0 0",
            }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span
                className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[2px]"
                style={{ color: essay.tagColor, background: essay.tagBg }}
              >
                {essay.tag}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[2px] text-violet">
                Pinned
              </span>
            </div>
            <h2 className="mb-2 font-display text-[clamp(32px,4vw,48px)] leading-none text-text">
              {essay.title}
            </h2>
            {essay.subtitle && (
              <p className="mb-4 font-accent text-lg text-dim" style={{ fontStyle: "italic" }}>
                {essay.subtitle}
              </p>
            )}
            <p className="mb-6 max-w-[640px] text-base leading-[1.7] text-dim">
              {essay.desc}
            </p>
            <span className="inline-flex items-center gap-2 font-mono text-[13px] text-muted transition-colors group-hover:text-violet">
              Read essay →
            </span>
          </Link>
        ))}

        {/* Remaining essays */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {rest.map((essay) => (
              <Link
                key={essay.slug}
                href={`/writing/${essay.slug}`}
                className="group block rounded-2xl border border-border bg-surface p-8 no-underline transition-all duration-200 hover:border-violet/30 hover:shadow-[0_2px_16px_rgba(109,40,217,0.06)]"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span
                    className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[2px]"
                    style={{ color: essay.tagColor, background: essay.tagBg }}
                  >
                    {essay.tag}
                  </span>
                  <span className="font-mono text-[10px] text-muted">
                    {essay.date}
                  </span>
                </div>
                <h2 className="mb-2 font-display text-2xl text-text">
                  {essay.title}
                </h2>
                {essay.subtitle && (
                  <p className="mb-3 font-accent text-sm text-dim" style={{ fontStyle: "italic" }}>
                    {essay.subtitle}
                  </p>
                )}
                <p className="text-sm leading-[1.7] text-muted">
                  {essay.desc}
                </p>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
