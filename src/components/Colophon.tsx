import Link from "next/link";

export default function Colophon() {
  return (
    <section className="border-t border-border px-6 py-16 md:px-12 md:py-20" id="colophon">
      <div className="fade-up mb-4 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[3px] text-violet before:block before:h-px before:w-5 before:bg-violet">
        Colophon
      </div>
      <h2 className="fade-up fade-up-delay-1 mb-3 font-display text-[clamp(38px,5vw,64px)] leading-none text-text">
        This site is the{" "}
        <em className="font-accent" style={{ fontStyle: "italic" }}>
          method
        </em>
        .
      </h2>

      <div className="fade-up fade-up-delay-2 mt-9 grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-10">
        <div className="overflow-x-auto rounded-xl border border-[#222240] bg-[#0d0d1a] px-6 py-5 font-mono text-[12.5px] leading-loose text-[#94a3b8]">
          <span className="text-[#475569]"># jonathanbrink.com — built like everything else</span>
          <br />
          <span className="text-[#a78bfa]">stack</span>&nbsp;&nbsp;&nbsp;: next.js 16 · tailwind · vercel
          <br />
          <span className="text-[#a78bfa]">process</span>&nbsp;: intent → outcome · ai as build partner
          <br />
          <span className="text-[#a78bfa]">brief</span>&nbsp;&nbsp;&nbsp;:{" "}
          <a href="/brief.txt" className="text-[#a78bfa] underline hover:text-[#e2e8f0]">
            read the actual project brief →
          </a>
          <br />
          <span className="text-[#a78bfa]">agents</span>&nbsp;&nbsp;: /mcp{" "}
          <span className="text-[#475569]"># in progress — see Now Building</span>
          <br />
          <span className="text-[#34d399]">✓ vibecoded · 0 devs hired</span>
        </div>
        <div className="max-w-[480px] text-[15px] leading-[1.7] text-dim">
          <p>
            This site was designed and built the same way the products were —
            written intent, written outcome, AI writing the how. The brief that
            steers it is public, word for word.
          </p>
          <p className="mt-3.5">
            Radical transparency is the point: if the method works, the evidence
            should be inspectable.{" "}
            <Link href="/writing" className="text-violet">
              The essays
            </Link>{" "}
            cover the thinking behind it.
          </p>
        </div>
      </div>
    </section>
  );
}
