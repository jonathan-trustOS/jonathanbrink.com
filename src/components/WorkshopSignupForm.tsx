"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "submitting" | "error" | "sold_out";

interface Props {
  workshopSlug: string;
  priceLabel: string;
  /** False when Supabase/Stripe env isn't configured yet — renders disabled form. */
  ready: boolean;
}

export default function WorkshopSignupForm({ workshopSlug, priceLabel, ready }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!ready) return;
    setStatus("submitting");
    setErrorMsg(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/workshops/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workshop_slug: workshopSlug,
          name: data.get("name"),
          email: data.get("email"),
        }),
      });

      if (res.status === 409) {
        setStatus("sold_out");
        return;
      }

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setErrorMsg(body.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      const { url } = await res.json();
      if (url) {
        window.location.href = url;
        return;
      }
      setErrorMsg("Couldn't start checkout. Please try again.");
      setStatus("error");
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "sold_out") {
    return (
      <div className="rounded-lg border border-border bg-surface2 px-4 py-6 text-center">
        <div className="font-display text-[22px] text-text">Just sold out.</div>
        <div className="mt-1 text-[13px] text-dim">
          Someone beat you to the last seat. Email me and I&apos;ll save one in the
          next cohort.
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="workshop-name"
          className="mb-1.5 block font-mono text-[11px] uppercase tracking-[2px] text-muted"
        >
          Name
        </label>
        <input
          type="text"
          id="workshop-name"
          name="name"
          required
          disabled={!ready || status === "submitting"}
          className="w-full rounded-lg border border-border bg-bg px-4 py-3 text-[15px] text-text outline-none transition-colors placeholder:text-muted focus:border-violet disabled:opacity-60"
          placeholder="Your name"
        />
      </div>

      <div>
        <label
          htmlFor="workshop-email"
          className="mb-1.5 block font-mono text-[11px] uppercase tracking-[2px] text-muted"
        >
          Email
        </label>
        <input
          type="email"
          id="workshop-email"
          name="email"
          required
          disabled={!ready || status === "submitting"}
          className="w-full rounded-lg border border-border bg-bg px-4 py-3 text-[15px] text-text outline-none transition-colors placeholder:text-muted focus:border-violet disabled:opacity-60"
          placeholder="you@example.com"
        />
      </div>

      {errorMsg && status === "error" && (
        <p className="text-sm text-amber">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={!ready || status === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-violet px-8 py-3.5 font-mono text-sm font-medium tracking-wide text-white transition-colors hover:bg-violet-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting"
          ? "Starting checkout…"
          : `Reserve my seat — ${priceLabel} →`}
      </button>

      {!ready && (
        <p className="font-mono text-[10px] uppercase tracking-[2px] text-muted">
          Signup will open shortly — payment setup in progress.
        </p>
      )}

      <p className="text-[12px] leading-[1.6] text-muted">
        Secure checkout via Stripe. Zoom join link arrives by email right after payment.
      </p>
    </form>
  );
}
