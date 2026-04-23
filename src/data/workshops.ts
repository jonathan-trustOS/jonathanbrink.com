// ── Types ──────────────────────────────────────────────────────
export interface OptimalPathPhase {
  number: string; // "01" ... "10"
  title: string;
  tagline: string;
  body: string;
  accent: "violet" | "cyan" | "amber" | "green";
}

export interface WorkshopFAQ {
  q: string;
  a: string;
}

export interface WorkshopContent {
  /** Must match the Supabase `workshops.slug` value. */
  slug: string;
  title: string;
  subtitle: string;
  /** ISO date string, used for display only. Source of truth is Supabase. */
  displayDate: string;
  displayTime: string;
  displayDurationLabel: string;
  displayPrice: string;
  live: boolean;
  tag: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroAccentWord: string; // wrapped in italic serif
  heroSub: string;
  phases: OptimalPathPhase[];
  outcomes: { stat: string; label: string }[];
  testimonial: {
    quote: string;
    attribution: string;
  };
  faq: WorkshopFAQ[];
}

// ── Workshops ──────────────────────────────────────────────────

export const workshops: WorkshopContent[] = [
  {
    slug: "optimal-path-may-9",
    title: "Optimal Path — Vibecoding Workshop",
    subtitle:
      "The 10-phase process for going from idea to shipped product with AI as your build partner.",
    displayDate: "Saturday, May 9, 2026",
    displayTime: "10:00 AM – 1:30 PM PT",
    displayDurationLabel: "3.5 hours, live on Zoom",
    displayPrice: "$49",
    live: true,
    tag: "Live Workshop",
    heroEyebrow: "Optimal Path · May 9",
    heroHeadline: "The most valuable skill in software.",
    heroAccentWord: "ship",
    heroSub:
      "Writing code isn't the skill anymore. Knowing what to build and how to direct the build — that's the skill. This is the process I teach to get there. Every previous attendee shipped.",
    phases: [
      {
        number: "01",
        title: "Hallucinations",
        tagline: "Know the two causes.",
        body: "Before anything else, understand when and why AI invents things that aren't there. The fix isn't better prompts — it's better context. Get this wrong and nothing else works.",
        accent: "amber",
      },
      {
        number: "02",
        title: "Begin with Curiosity",
        tagline: "The Ignition.",
        body: "Every shipped product starts with a real question you care about. Not a template, not a tutorial — something you want to exist. We find yours.",
        accent: "violet",
      },
      {
        number: "03",
        title: "Define the User",
        tagline: "Who is this for?",
        body: "The user is the compass. Without one, the AI wanders. We name a specific person, their context, and what success looks like in their hands.",
        accent: "cyan",
      },
      {
        number: "04",
        title: "Research",
        tagline: "Don't build yet.",
        body: "What already exists? What patterns work? Fifteen minutes here saves three hours later. This is where the AI is most useful and most underused.",
        accent: "green",
      },
      {
        number: "05",
        title: "Markdown Architecture",
        tagline: "Two levels.",
        body: "A project brief and a build plan, both in plain markdown. This becomes your spec, your memory, and your contract with the AI. The doc is the product.",
        accent: "violet",
      },
      {
        number: "06",
        title: "Mood Board",
        tagline: "What should this feel like?",
        body: "Taste is directable. We pull references — fonts, layouts, motion, voice — and give the AI something to aim at. Vibes aren't vague when they're specified.",
        accent: "cyan",
      },
      {
        number: "07",
        title: "Plan Mode",
        tagline: "No code yet.",
        body: "Before a single line is written, the AI proposes a plan. You read it like a PM reads a spec. Most bugs are prevented here, not fixed later.",
        accent: "amber",
      },
      {
        number: "08",
        title: "Review the Plan — 3×",
        tagline: "Three passes.",
        body: "One pass for scope. One for simplicity. One for risk. Cut ruthlessly. Complexity is the enemy of shipped.",
        accent: "amber",
      },
      {
        number: "09",
        title: "Build — One Sprint",
        tagline: "One feature at a time.",
        body: "Small diffs, frequent commits, working code at every checkpoint. You are the director, not the typist. Every A-HA Check confirms you're still on the path.",
        accent: "green",
      },
      {
        number: "10",
        title: "Deploy & Ship",
        tagline: "The finish line.",
        body: "Staging, deploy, real URL. You didn't just vibe. You shipped. And now you have a prompt library to compound into the next one.",
        accent: "violet",
      },
    ],
    outcomes: [
      { stat: "100%", label: "of previous attendees shipped a working product" },
      { stat: "100%", label: "said they wanted to keep building after" },
      { stat: "3.5 hrs", label: "from idea to deployed, end to end" },
    ],
    testimonial: {
      quote:
        "I'm 47 years old. I shipped my first web app by describing what I wanted. I still can't believe it's real.",
      attribution: "Previous attendee",
    },
    faq: [
      {
        q: "Do I need to know how to code?",
        a: "No. Half the previous attendees were non-developers. You'll leave with a working product regardless of your starting point.",
      },
      {
        q: "What do I need beforehand?",
        a: "A laptop, a Claude / Cursor / equivalent AI coding tool account, and one idea — however rough. I'll send a short prep email a few days ahead.",
      },
      {
        q: "Is this recorded?",
        a: "The session is live only — you learn by building in real time alongside the group. You keep what you build.",
      },
      {
        q: "What if I can't make it?",
        a: "Reply to your confirmation email before May 8 and I'll refund your seat. After that, I'll roll it over to the next cohort.",
      },
    ],
  },
];

// ── Helpers ───────────────────────────────────────────────────

export function getWorkshopContent(slug: string): WorkshopContent | undefined {
  return workshops.find((w) => w.slug === slug);
}
