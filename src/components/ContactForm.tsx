"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-2xl border border-border bg-surface p-10">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green/10 text-green">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="4 10 8 14 16 6" />
          </svg>
        </div>
        <h3 className="font-display text-2xl text-text">Message sent.</h3>
        <p className="text-base text-dim">
          Thanks for reaching out. I&apos;ll get back to you soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 font-mono text-xs uppercase tracking-[2px] text-violet transition-colors hover:text-violet-hover"
        >
          Send another →
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-border bg-surface p-10"
    >
      <div>
        <label
          htmlFor="name"
          className="mb-2 block font-mono text-[11px] uppercase tracking-[2px] text-muted"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full rounded-lg border border-border bg-bg px-4 py-3 text-base text-text outline-none transition-colors placeholder:text-muted focus:border-violet"
          placeholder="Your name"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block font-mono text-[11px] uppercase tracking-[2px] text-muted"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full rounded-lg border border-border bg-bg px-4 py-3 text-base text-text outline-none transition-colors placeholder:text-muted focus:border-violet"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block font-mono text-[11px] uppercase tracking-[2px] text-muted"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full resize-none rounded-lg border border-border bg-bg px-4 py-3 text-base text-text outline-none transition-colors placeholder:text-muted focus:border-violet"
          placeholder="What's on your mind?"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-amber">
          Something went wrong. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center gap-2 rounded-full bg-violet px-8 py-3 font-mono text-sm font-medium tracking-wide text-white transition-colors hover:bg-violet-hover disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Send message →"}
      </button>
    </form>
  );
}
