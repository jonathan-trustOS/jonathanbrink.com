"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

interface Registration {
  status: "pending" | "paid" | "confirmed" | "refunded" | "failed";
  name: string;
  email: string;
  join_url: string | null;
  workshop: {
    title: string;
    starts_at: string;
    slug: string;
  };
}

type LoadState =
  | { kind: "loading" }
  | { kind: "ready"; reg: Registration }
  | { kind: "error"; message: string };

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    });
  } catch {
    return iso;
  }
}

export default function WorkshopThanksPage() {
  const [state, setState] = useState<LoadState>({ kind: "loading" });
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    if (!sessionId) {
      setState({ kind: "error", message: "Missing session id." });
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(
          `/api/workshops/registration?session_id=${encodeURIComponent(sessionId!)}`,
          { cache: "no-store" },
        );
        if (cancelled) return;

        if (!res.ok) {
          setState({ kind: "error", message: "We couldn't find your registration." });
          return;
        }

        const reg = (await res.json()) as Registration;
        setState({ kind: "ready", reg });

        // If the webhook hasn't confirmed yet, poll a few times.
        if (reg.status !== "confirmed" && attempts < 10) {
          setTimeout(() => setAttempts((n) => n + 1), 2000);
        }
      } catch {
        if (!cancelled) {
          setState({ kind: "error", message: "Network error." });
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [attempts]);

  return (
    <>
      <Nav />
      <main className="px-12 pt-[160px] pb-[100px]">
        <div className="mx-auto max-w-[720px]">
          {state.kind === "loading" && (
            <div className="font-mono text-[11px] uppercase tracking-[2px] text-muted">
              Confirming your seat…
            </div>
          )}

          {state.kind === "error" && (
            <div>
              <div className="mb-4 font-mono text-[11px] uppercase tracking-[2px] text-amber">
                Something's off
              </div>
              <h1 className="mb-4 font-display text-[clamp(40px,5vw,64px)] leading-none text-text">
                We couldn&apos;t load your confirmation.
              </h1>
              <p className="mb-8 text-lg leading-[1.7] text-dim">
                {state.message} If you paid, your seat is safe — email
                brink.jonathan@gmail.com and I&apos;ll get you the Zoom link.
              </p>
              <Link
                href="/workshops"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-mono text-xs uppercase tracking-[1px] text-text no-underline transition-colors hover:bg-surface"
              >
                Back to workshops
              </Link>
            </div>
          )}

          {state.kind === "ready" && (
            <div>
              <div className="mb-4 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[3px] text-violet before:block before:h-px before:w-5 before:bg-violet">
                You&apos;re in
              </div>
              <h1 className="mb-4 font-display text-[clamp(48px,6vw,88px)] leading-[0.95] text-text">
                See you on{" "}
                <em
                  className="font-accent italic"
                  style={{ fontStyle: "italic" }}
                >
                  {formatDate(state.reg.workshop.starts_at).split(",")[0]}
                </em>
                .
              </h1>
              <p className="mb-10 max-w-[560px] text-lg leading-[1.7] text-dim">
                {state.reg.name} — your seat for{" "}
                <strong className="text-text">{state.reg.workshop.title}</strong> is
                confirmed. I sent a confirmation to{" "}
                <span className="text-text">{state.reg.email}</span> with the Zoom
                join link.
              </p>

              <div className="mb-10 rounded-2xl border border-border bg-surface p-8">
                <div className="font-mono text-[10px] uppercase tracking-[2px] text-muted">
                  When
                </div>
                <div className="mt-1 text-[15px] text-text">
                  {formatDate(state.reg.workshop.starts_at)}
                </div>

                <div className="mt-6 border-t border-border pt-6">
                  {state.reg.join_url ? (
                    <a
                      href={state.reg.join_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-violet px-7 py-3 font-mono text-sm font-medium tracking-wide text-white no-underline transition-colors hover:bg-violet-hover"
                    >
                      Join the Zoom →
                    </a>
                  ) : (
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[2px] text-amber">
                        Generating your Zoom link…
                      </div>
                      <div className="mt-2 text-[14px] leading-[1.6] text-dim">
                        Payment received. Your personal Zoom link should appear here
                        within a minute — we&apos;re finalizing registration. The
                        confirmation email will also include it.
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div
                className="font-accent text-[clamp(28px,3.5vw,44px)] leading-[1.15] italic text-text"
                style={{ fontStyle: "italic" }}
              >
                You didn&apos;t just vibe. You shipped.
              </div>
              <p className="mt-6 text-[14px] text-muted">
                Come with a project idea — big or small. That&apos;s all you need.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
