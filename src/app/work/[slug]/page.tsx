import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Nav />
      <main className="px-12 pt-[130px] pb-[100px]">
        {/* Header */}
        <div className="mb-4 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[3px] text-violet before:block before:h-px before:w-5 before:bg-violet">
          Case Study
        </div>
        <div
          className="mb-5 inline-block rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[2px]"
          style={{ color: project.tagColor, background: project.tagBg }}
        >
          {project.tag}
        </div>
        <h1 className="mb-3 font-display text-[clamp(48px,6vw,80px)] leading-none text-text">
          {project.title}
        </h1>
        <p className="mb-8 max-w-[640px] text-lg leading-[1.7] text-dim">
          {project.desc}
        </p>

        {/* Meta strip */}
        <div className="mb-12 flex flex-wrap items-center gap-6 border-b border-border pb-8">
          {project.role && (
            <div>
              <div className="mb-1 font-mono text-[10px] uppercase tracking-[2px] text-muted">
                Role
              </div>
              <div className="font-mono text-[13px] text-text">
                {project.role}
              </div>
            </div>
          )}
          {project.timeline && (
            <div>
              <div className="mb-1 font-mono text-[10px] uppercase tracking-[2px] text-muted">
                Timeline
              </div>
              <div className="font-mono text-[13px] text-text">
                {project.timeline}
              </div>
            </div>
          )}
          {project.outcome && (
            <div>
              <div className="mb-1 font-mono text-[10px] uppercase tracking-[2px] text-muted">
                Outcome
              </div>
              <div className="font-mono text-[13px] text-green">
                {project.outcome}
              </div>
            </div>
          )}
          <div className="ml-auto flex flex-wrap items-center gap-2">
            {project.pills.map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-border bg-surface2 px-3 py-1 font-mono text-[11px] text-muted"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* Case study sections */}
        {project.caseStudy && project.caseStudy.length > 0 ? (
          <div className="mx-auto max-w-[760px]">
            {project.caseStudy.map((section, i) => (
              <div key={i} className="mb-14">
                <h2 className="mb-1 flex items-center gap-2.5 font-display text-3xl text-text before:block before:h-px before:w-4 before:bg-violet">
                  {section.heading}
                </h2>
                <div className="text-base leading-[1.85] text-dim">
                  {section.body.split("\n\n").map((paragraph, j) => (
                    <p key={j} className="mb-5">
                      {paragraph.split("\n").map((line, k) => (
                        <span key={k}>
                          {k > 0 && <br />}
                          {line}
                        </span>
                      ))}
                    </p>
                  ))}
                </div>
                {/* Section images */}
                {section.images && section.images.length > 0 && (
                  <div
                    className={`mt-8 grid gap-4 ${
                      section.images.length === 1
                        ? "grid-cols-1"
                        : section.images.length === 2
                          ? "grid-cols-2"
                          : "grid-cols-1"
                    }`}
                  >
                    {section.images.map((img, imgIdx) => (
                      <figure key={imgIdx} className="group">
                        <div className="overflow-hidden rounded-lg border border-border bg-surface transition-all duration-200 group-hover:border-violet/30 group-hover:shadow-[0_2px_16px_rgba(109,40,217,0.06)]">
                          <Image
                            src={img.src}
                            alt={img.alt}
                            width={1280}
                            height={800}
                            className="h-auto w-full object-contain"
                          />
                        </div>
                        {img.caption && (
                          <figcaption className="mt-2 text-center font-mono text-[11px] text-muted">
                            {img.caption}
                          </figcaption>
                        )}
                      </figure>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Visit link */}
            {project.url && (
              <div className="mt-4 mb-8">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-violet bg-violet px-6 py-3 text-sm font-semibold text-white no-underline transition-all duration-150 hover:-translate-y-px hover:bg-violet-hover"
                >
                  Visit {project.title} ↗
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-surface p-16 text-center">
            <div className="mb-4 font-display text-3xl text-text">
              Case Study Coming Soon
            </div>
            <p className="mx-auto max-w-md text-sm leading-[1.7] text-muted">
              The full case study for {project.title} is being written. Check
              back soon for the detailed design process, decisions, and
              outcomes.
            </p>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-lg border border-violet bg-violet px-6 py-3 text-sm font-semibold text-white no-underline transition-all duration-150 hover:-translate-y-px hover:bg-violet-hover"
              >
                Visit {project.title} ↗
              </a>
            )}
          </div>
        )}

        <div className="mt-16 border-t border-border pt-8">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-mono text-[13px] text-muted no-underline transition-colors hover:text-text"
          >
            ← Back to work
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
