import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { essays } from "@/data/essays";

export function generateStaticParams() {
  return essays.map((e) => ({ slug: e.slug }));
}

function renderBody(body: string) {
  // Split on section dividers (---)
  const sections = body.split("\n\n---\n\n");

  return sections.map((section, sectionIdx) => {
    // Split section into blocks (paragraphs / headings)
    const blocks = section.split("\n\n");

    return (
      <div key={sectionIdx}>
        {sectionIdx > 0 && (
          <hr className="my-14 border-t border-border" />
        )}
        {blocks.map((block, blockIdx) => {
          const trimmed = block.trim();
          if (!trimmed) return null;

          // Section heading (## )
          if (trimmed.startsWith("## ")) {
            const heading = trimmed.slice(3);
            return (
              <h2
                key={blockIdx}
                className="mb-6 mt-10 flex items-center gap-2.5 font-display text-[clamp(28px,3.5vw,40px)] leading-none text-text before:block before:h-px before:w-4 before:bg-violet"
              >
                {heading}
              </h2>
            );
          }

          // Check if the block is a list of short lines (poetic/manifesto style)
          const lines = trimmed.split("\n");
          const isPoetic =
            lines.length > 1 && lines.every((l) => l.length < 80);

          if (isPoetic) {
            return (
              <p
                key={blockIdx}
                className="mb-6 text-[17px] leading-[2] text-dim"
              >
                {lines.map((line, lineIdx) => (
                  <span key={lineIdx}>
                    {lineIdx > 0 && <br />}
                    {line}
                  </span>
                ))}
              </p>
            );
          }

          // Regular paragraph
          return (
            <p
              key={blockIdx}
              className="mb-6 text-[17px] leading-[1.9] text-dim"
            >
              {trimmed}
            </p>
          );
        })}
      </div>
    );
  });
}

export default async function EssayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const essay = essays.find((e) => e.slug === slug);

  if (!essay) {
    notFound();
  }

  return (
    <>
      <Nav />
      <main className="px-12 pt-[130px] pb-[100px]">
        {/* Header */}
        <div className="mb-4 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[3px] text-violet before:block before:h-px before:w-5 before:bg-violet">
          Essay
        </div>
        <span
          className="mb-5 inline-block rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[2px]"
          style={{ color: essay.tagColor, background: essay.tagBg }}
        >
          {essay.tag}
        </span>
        <h1 className="mb-3 font-display text-[clamp(48px,6vw,80px)] leading-none text-text">
          {essay.title}
        </h1>
        {essay.subtitle && (
          <p
            className="mb-6 font-accent text-xl text-dim"
            style={{ fontStyle: "italic" }}
          >
            {essay.subtitle}
          </p>
        )}

        <div className="mb-12 border-b border-border pb-8">
          <span className="font-mono text-[11px] text-muted">
            {essay.date}
          </span>
        </div>

        {/* Essay body */}
        <article className="mx-auto max-w-[680px]">
          {renderBody(essay.body)}
        </article>

        {/* Closing line */}
        <div className="mx-auto mt-20 max-w-[680px] border-t border-border pt-10 text-center">
          <p className="font-accent text-lg text-dim" style={{ fontStyle: "italic" }}>
            Intelligence is abundant. Alignment turns it into agency.
          </p>
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 font-mono text-[13px] text-muted no-underline transition-colors hover:text-text"
          >
            ← Back to writing
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
