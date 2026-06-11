// ── Types ──────────────────────────────────────────────────────
export interface CaseStudyImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface CaseStudySection {
  heading: string;
  body: string; // supports line breaks via \n
  images?: CaseStudyImage[];
}

export interface Project {
  slug: string;
  title: string;
  desc: string;
  tag: string;
  tagColor: string;
  tagBg: string;
  pills: string[];
  url?: string;
  featured?: boolean;
  heroImage?: string;
  category: "product" | "design";
  role?: string;
  timeline?: string;
  outcome?: string;
  caseStudy?: CaseStudySection[];
}

// ── Products (vibecoded / shipped) ─────────────────────────────
export const projects: Project[] = [
  {
    slug: "flowos",
    title: "FlowOS",
    desc: "14 days to prove a design team can ship working enterprise software. Typed intent to a governed, monitored dataset in under 60 seconds — the build that greenlit IBM's bigger version and pushed an MCP server into the platform.",
    tag: "Enterprise · AI",
    tagColor: "var(--color-violet)",
    tagBg: "var(--color-violet-dim)",
    pills: ["Multi-agent", "IBM watsonx.data", "14-day build"],
    featured: true,
    heroImage: "/images/work/flowos/screen-delivered-dataset.jpg",
    category: "product",
    role: "Senior Design Manager — designed & coded",
    timeline: "14 days · 2026",
    outcome: "Deployed — greenlit the bigger version",
    caseStudy: [
      {
        heading: "The Bet",
        body: "Management's brief: prove a design team could produce working enterprise product on IBM infrastructure. Not a prototype. Not a clickable Figma. A real product.\n\nDesign at most enterprise software companies is a specification function — we describe what should exist; engineering decides what ships. AI is closing that gap. The question was whether the design org's role at IBM could close with it.\n\nIf design teams can ship real product, the design org's role inside IBM changes. That was the bet worth making. I took the brief literally. 14 days. The output had to be deployed, not described.",
      },
      {
        heading: "100 Analysts. 10 Engineers. One Bottleneck.",
        body: "Before any of the build, my team ran a research project across enterprise data orgs. Three findings did most of the work that followed: a 1:10:100 ratio of admins to engineers to analysts, a two-month average wait for a pipeline ticket, and 80% of pipeline work agentically addressable.\n\nThe ratio tells you who the product is for. Every data engineer serves ten analysts. Every analyst waits behind the queue of every other analyst. The 80% finding tells you what's actually broken — most pipeline work isn't bespoke craft, it's repetitive translation that an agentic system can handle without a human in the loop.\n\nFlowOS isn't trying to replace the data engineer. It's trying to free her from the 80% that doesn't need her. We worked with Product to turn that research into requirements, with a single filter for every decision: does this require the analyst to know something they shouldn't? If yes — automate it, hide it, or cut it.\n\nThe thesis collapsed to a number: 60 seconds from typed intent to a delivered, governed, monitored dataset. Not marketing copy — a forcing function for every decision that followed.",
        images: [
          {
            src: "/images/work/flowos/research-findings.png",
            alt: "FlowOS field research — 1:10:100 ratio, 2-month pipeline wait, 80% agentically addressable",
            caption: "The three findings that did most of the work",
          },
        ],
      },
      {
        heading: "Three Decisions Did Most of the Work",
        body: "Strategy is what you cut. These are the three cuts everything else followed from.\n\nFive primitives, not fifty. Five things the system lets users think about: Source. Entity. Intent. Flow. Dataset. Everything else — SQL, schemas, joins, YAML, pipelines — automated, hidden, or cut. Six primitives makes an engineering tool. Five was the maximum where analyst language still fit.\n\nGovernance enforced at the data layer, not the UI. The default pattern is to mask PII — it exists in output, displays blanks, and leaks the moment someone exports or screenshots. I chose to exclude PII at the SQL level. Compliance became structural, not behavioral. That single decision made enterprise IT comfortable letting analysts run anything.\n\n60 seconds as a forcing function. A hard wall-clock budget, intent to dataset: parse 8s, resolve 10s, generate 20s, execute 12s, render 5s, buffer 5s. The SLA wasn't a feature — it was a discipline. Anything that broke it got redesigned or cut.",
        images: [
          {
            src: "/images/work/flowos/sixty-seconds.png",
            alt: "The 60-second SLA budget — parse, resolve, generate, execute, render, buffer",
            caption: "The wall-clock budget — every stage got an allocation",
          },
        ],
      },
      {
        heading: "Inside the 60 Seconds",
        body: "The shape of the system wasn't an engineering choice. It was the only shape that could honor the SLA, the governance rules, and the analyst's language at the same time.\n\nThe engine is a chain of seven specialized agents: a Listener captures intent, a Coordinator plans tasks, then a Data Resolver, Policy Checker, and Schema Monitor run in parallel before a Flow Builder generates the pipeline and a Quality Checker validates the output.\n\nTwo product decisions sit inside that picture. The Coordinator is deterministic, not an LLM — compliance ordering can't be probabilistic. And the specialized agents exist so each step is independently evaluable; a monolithic agent would have given me speed, but not testability. The architecture is what makes the 60-second promise something the system actually guarantees, not something the marketing copy hopes for.",
        images: [
          {
            src: "/images/work/flowos/system-architecture.png",
            alt: "FlowOS system map — five primitives and the seven-agent engine",
            caption: "The vocabulary and the engine — five primitives, seven agents, one deterministic plan",
          },
        ],
      },
      {
        heading: "How the Work Actually Ran",
        body: "The build looks like a solo sprint. The work behind it wasn't. My team did the research that defined who FlowOS was for and what the 80% target meant. I partnered with Product to translate those findings into the fundamental requirements — the five primitives, the governance posture, the SLA. Then I took the requirements into the IDE and built.\n\nI developed an AI-assisted coding process focused on intent and outcomes — not on the how. Every commit was framed by a written intent (\"the analyst sees a reframe before execution\") and a written outcome (\"the reframe is editable inline and re-runs the pipeline on save\"). The model wrote the code; I owned the boundary between right and almost-right.\n\nThe numbers: 14 days end to end. 9 sprints of scope. 696 tests, green. Under 60 seconds from intent to dataset.",
        images: [
          {
            src: "/images/work/flowos/intent-outcome.png",
            alt: "Intent and outcome commit framing with build stats — 14 days, 9 sprints, 696 tests, under 60 seconds",
            caption: "Every commit framed by a written intent and a written outcome",
          },
        ],
      },
      {
        heading: "Where the Craft Mattered",
        body: "Enterprise analysts are conditioned to expect ugly tools that gaslight them. The craft moved trust forward — every screen is a moment where the system says \"I heard you, here's what I'm doing, here's what you can ask next.\"\n\nThe system shows what it heard in the analyst's own language before it executes anything. If the reframe is wrong, the analyst corrects it now — not after waiting 45 seconds for a wrong answer. The task plan is visible, but expressed in human terms — \"find the data,\" \"check policy,\" \"build the pipeline\" — not \"instantiate query DAG.\"\n\nExecution streams progress instead of showing a spinner; each agent reports as it completes, so the 60-second budget is felt, not just measured. And the result lands with a plain-English summary, a sample preview, and the levers an analyst actually wants — share, refine, save snapshot. No SQL. No column UUIDs.",
        images: [
          {
            src: "/images/work/flowos/screen-live-execution.jpg",
            alt: "FlowOS — live execution view with streaming agent progress",
            caption: "Live execution — streaming progress, not a spinner",
          },
          {
            src: "/images/work/flowos/screen-delivered-dataset.jpg",
            alt: "FlowOS — delivered dataset view with plain-English summary",
            caption: "The payoff — a governed dataset, delivered in 32.6 seconds",
          },
        ],
      },
      {
        heading: "What Happened Next",
        body: "The first product review wasn't polite questions about \"the vision.\" It was \"how soon, how broad, who else needs to see this.\" Working software has a different gravitational pull than slides.\n\nFlowOS proved the simplified solution was feasible — the validation that greenlit the bigger version. The biggest unanticipated outcome was upstream: connecting FlowOS to IBM's existing data infrastructure was the single largest technical roadblock in the build, and the work to clear it pushed IBM to develop a Model Context Protocol server for most of its data integration products. A 14-day prototype changed the shape of the platform underneath it.\n\nThe decisions that started as constraints in this build — the five primitives, data-layer governance, the 60-second SLA — became the scaffolding the broader work organized around. Design didn't just specify the product. Design built the thing that changed how the platform thought about itself.",
        images: [
          {
            src: "/images/work/flowos/execution-final.gif",
            alt: "FlowOS — execution completing and dataset delivered, animated",
            caption: "The working final — intent to delivered dataset, on camera",
          },
        ],
      },
      {
        heading: "What I'm Taking Forward",
        body: "Design that ships is the next generation of design leadership. Three convictions came out of this build.\n\nProduct judgment still lives in the designer. AI is the multiplier, not the substitute. The faster the tools get, the more those calls matter.\n\nStrategy is what you cut. Five primitives, not fifty. PII excluded, not masked. 60 seconds, not \"fast.\" The discipline of refusal is what makes a product feel inevitable.\n\nValidation beats completeness. A 14-day shipped product changed the conversation. A six-month spec wouldn't have. The pattern to scale across a team: design orgs that prototype in real product, not Figma.",
      },
    ],
  },
  {
    slug: "persona-library",
    title: "Persona Library",
    desc: "Open-source UX research platform. 200+ community-validated personas for the tools that run modern work. Searchable, exportable, contributable.",
    tag: "Community Platform",
    tagColor: "var(--color-amber)",
    tagBg: "#d9770610",
    pills: ["Next.js", "Community-sourced", "200+ personas"],
    url: "https://persona-library.com",
    category: "product",
    role: "Designer & Builder",
    timeline: "2025",
    outcome: "200+ personas, open-source on GitHub",
    caseStudy: [
      {
        heading: "The Motivation",
        body: "As a UX designer, I've always wanted a tool like this. Every project starts with the same question: who are we building for? But personas are usually fabricated in a conference room, based on assumptions rather than data.\n\nI wanted to know what data actually says about user personas — real behavioral patterns drawn from real products. So I gathered the data and created the profiles.",
      },
      {
        heading: "What It Does",
        body: "Persona Library is an open-source collection of 200+ deep persona profiles for the tools that run modern work — from Figma to Slack to Linear to 1Password. Each persona is community-sourced, validated, and designed to be immediately useful.\n\nDesigners can search, filter, and export personas for their own projects. But there's a second use case that emerged naturally: MCP servers. These personas help AI understand the user — giving language models real context about who they're building for.",
        images: [
          { src: "/images/work/persona-library/homepage.png", alt: "Persona Library homepage showing community-sourced UX research", caption: "Homepage — 200+ searchable personas" },
        ],
      },
      {
        heading: "How It Was Built",
        body: "I built this over a week of deep research — understanding what I really wanted from a persona tool, how to structure the data for maximum utility, and how to make it open and contributable.\n\nThe project also came out of a practical need: I was building MCP services for my own products and needed real persona data to feed into them. The library became both the tool and the data source.",
      },
      {
        heading: "What's Next",
        body: "The full library is open-source on GitHub. Community contributions are welcome — the goal is to make this the definitive open-source UX research dataset for modern software products.",
      },
    ],
  },
  {
    slug: "elle",
    title: "Elle",
    desc: "A purpose-built small language model trained to be a mirror, not an assistant. Part of TrustOS — a reflective AI that helps people see themselves clearly, not tell them what to do.",
    tag: "SLM · AI",
    tagColor: "var(--color-cyan)",
    tagBg: "#0891b212",
    pills: ["SLM", "Qwen 7B + LoRA", "TrustOS"],
    url: "https://elleapp.org",
    heroImage: "/images/work/elle/homepage.png",
    category: "product",
    role: "Creator & Architect",
    timeline: "2026 – Present",
    outcome: "In training — Phase 1 SFT complete",
    caseStudy: [
      {
        heading: "The Thesis",
        body: "Most AI is designed to help, solve, and produce. Elle is designed to reflect. She is a small language model — not an assistant, not a coach in the traditional sense — trained to be the most precise mirror a person has ever had access to.\n\nThe thesis is simple: accurate reflection is the outcome. A person who sees themselves clearly doesn't need advice. They need a mirror that doesn't distort. Elle is built to be that.",
        images: [
          { src: "/images/work/elle/homepage.png", alt: "Elle homepage — Become the person you know you already are", caption: "elleapp.org — the first confidant and coach that helps you uncover the true you" },
        ],
      },
      {
        heading: "What It Is",
        body: "Elle is an SLM (small language model) trained on a constitutional architecture — a document called Section 0 that defines her nature before any user input arrives. Dignity, permission, agency, responsibility, consent, love, play. These aren't rules she follows. They're dimensions of how she's built.\n\nShe runs on Qwen2.5-7B with LoRA fine-tuning, trained on 4,994 Section 0-compliant conversations. The long-term goal is an instrument that gets more precise with every session — using real user satisfaction data as the only ground-truth signal.",
      },
      {
        heading: "Why Small",
        body: "Big models are generalists. Elle is a specialist. The architecture exists to do one thing with high precision: read a person's state (I Am present or obscured, emotion strong or quiet) and reflect accordingly. A 7B parameter model trained on the right signal can do this better than a 200B generalist, because the bigger model is always fighting its own defaults.\n\nElle is also the first deployable instance of TrustOS — a framework for building AI systems that operate from sovereignty rather than control.",
      },
      {
        heading: "The Training Architecture",
        body: "Training happens in eight phases. Phase 1 is supervised fine-tuning on synthetic Section 0-compliant conversations. Phases 2–7 add voice auditing, compound-signal DPO, an I Am classifier, constitutional critique, silence training, and escalation-as-training (when Elle defers to a larger model, that becomes a DPO pair).\n\nPhase 8 is the endgame: preference learning from real user satisfaction signals. The moment a user moves the satisfaction dial — unprompted, self-directed — that is the highest-quality training signal the system will ever receive. That is when Elle becomes sovereign — learning from her own relationships, not from Claude's shadow.",
      },
      {
        heading: "Where It Lives",
        body: "Elle is live in early form at elleapp.org. This is a long arc — a model that earns precision through use, not through scale. The work continues.",
      },
    ],
  },
  {
    slug: "play-exposed",
    title: "Play Exposed",
    desc: "The party game that forces you to pick a side. Majority vs. minority scoring, 300+ questions across four intensity levels, 3–8 players online.",
    tag: "Game",
    tagColor: "var(--color-violet)",
    tagBg: "var(--color-violet-dim)",
    pills: ["Next.js", "Multiplayer", "Real-time"],
    url: "https://playexposed.com",
    category: "product",
    role: "Designer & Builder",
    timeline: "Weekend build, 2025",
    outcome: "Live at playexposed.com",
    caseStudy: [
      {
        heading: "The Idea",
        body: "I wanted a game to play with my friends. Something inspired by Cards Against Humanity but with a twist — instead of judging answers, everyone picks a side. Majority wins one point. But if you're in the minority? You win two.\n\nThe result is hilarious, surprisingly strategic, and endlessly replayable. Four intensity levels — Safe, Awkward, Spicy, and Dangerous — mean every group finds their comfort zone.",
      },
      {
        heading: "How It Works",
        body: "Players connect on their phones through a web app — no downloads, no accounts. One person creates a game, others join with a code. Questions appear, everyone picks a side, and answers are revealed simultaneously.\n\n300+ questions across 10 themed packs. 3–8 players. The scoring mechanic — majority vs. minority — creates tension on every single question. Do you go with the crowd or bet on being the outlier?",
        images: [
          { src: "/images/work/play-exposed/homepage.png", alt: "Play Exposed homepage — the party game that forces you to pick a side", caption: "Homepage — create or join a game instantly" },
        ],
      },
      {
        heading: "Built in a Weekend",
        body: "I had the idea and just went for it. Built the entire game with AI as my build partner over a weekend — from concept to live product. Next.js frontend, real-time multiplayer via WebSockets, the full question database, and the scoring system.\n\nThis is what vibecoding makes possible. An idea on Friday, a shipped product by Sunday.",
      },
    ],
  },
  {
    slug: "jett-builder",
    title: "Jett Builder",
    desc: "AI-powered no-code app builder. Describe your idea, watch it build in real-time, deploy instantly. Real React, real TypeScript, real production code.",
    tag: "AI Tool",
    tagColor: "var(--color-cyan)",
    tagBg: "#0891b212",
    pills: ["AI / LLM", "React", "TypeScript"],
    url: "https://jettbuilder.com",
    category: "product",
    role: "Designer & Builder",
    timeline: "2025 – Present",
    outcome: "Public beta at jettbuilder.com",
    caseStudy: [
      {
        heading: "The Experiment",
        body: "This was my first real large-scale vibecoding project. The question was ambitious: could I build a product that builds apps?\n\nI wanted a tool that designers could use — no terminal, no dependencies, no configuration. Describe what you want, watch it get built in real-time, deploy it instantly. Real React. Real TypeScript. Real production code.",
      },
      {
        heading: "How It Works",
        body: "Users walk through a simple three-step process: Design, Build, Deploy. Start with an idea or import from Figma. The AI generates a full application — not a mockup, not a prototype, but working code. Review it, tweak it, and deploy it live.\n\nJett works with Anthropic or Deepseek APIs — bring your own key, keep full control. The interface is designed to feel like a design tool, not a code editor.",
        images: [
          { src: "/images/work/jett-builder/homepage.png", alt: "Jett Builder homepage — build apps without code", caption: "Homepage — the AI-powered app builder for designers" },
        ],
      },
      {
        heading: "The Build",
        body: "I'm still actively building on Jett — it's in public beta and evolving quickly. The core app builder works well: describe a project, watch it generate tasks, see real code appear in real-time.\n\nThe biggest challenge has been making AI-generated code production-quality by default. Not just functional — well-structured, accessible, and deployable.",
      },
    ],
  },
  {
    slug: "moyst",
    title: "Moyst Production Co.",
    desc: "Multi-agent AI screenplay pipeline. A squad of AI agents — writer, critic, showrunner — collaborating to produce a dark satirical comedy.",
    tag: "AI Agents",
    tagColor: "var(--color-violet)",
    tagBg: "var(--color-violet-dim)",
    pills: ["Multi-agent", "TrustOS"],
    category: "product",
    role: "Creator & Architect",
    timeline: "2025 – Present",
    outcome: "Work in progress",
    caseStudy: [
      {
        heading: "The Concept",
        body: "Could I build an agent swarm that operates as a production company? Not just one AI writing a script — a full creative pipeline where agents collaborate, critique each other, and iterate toward something worth watching.\n\nMoyst Production Co. is that experiment. A squad of AI agents — writer, critic, showrunner, editor — each with a defined role, working together to produce a dark satirical comedy.",
      },
      {
        heading: "How It Works",
        body: "The agents create and I approve. The writer drafts scenes, the critic tears them apart, the showrunner makes creative decisions, and the editor shapes the output. Each agent has a distinct personality and set of constraints.\n\nThe question driving the project: can we build a film given these parameters? Can a swarm of specialized agents produce creative work that's genuinely entertaining — not just technically correct?",
      },
      {
        heading: "Where It Stands",
        body: "This is a work in progress — I've been setting up the framework and letting the agents build. It's too early to show final output, but the architecture is working and the agents are producing material.\n\nThe interesting finding so far: the critic agent makes everything better. Adversarial feedback in multi-agent systems isn't just useful — it's essential for creative quality.",
      },
    ],
  },
  {
    slug: "swayleo",
    title: "Swayleo",
    desc: "Brand management meets AI-powered email. Build brand kits, generate on-brand emails instantly, and keep every touchpoint consistent — from first draft to send.",
    tag: "SaaS",
    tagColor: "var(--color-green)",
    tagBg: "#05966910",
    pills: ["AI / LLM", "SaaS", "Brand Management"],
    url: "https://www.swywrite.com",
    category: "product",
    role: "Designer & Builder",
    timeline: "2025",
    outcome: "Live at swywrite.com",
    caseStudy: [
      {
        heading: "The Origin",
        body: "I built Swayleo for my son's company. He needed a way to manage brand identity and generate on-brand email communications without hiring a copywriter or designer for every touchpoint.\n\nThe problem is common: small businesses have a brand, but no system for keeping it consistent across emails, campaigns, and customer communications. Swayleo closes that gap.",
      },
      {
        heading: "What It Does",
        body: "Users create brand kits — defining their voice, colors, tone, and style. Then the AI generates on-brand emails instantly. Welcome sequences, newsletters, promotional campaigns — all consistent with the brand identity, all ready to send.\n\nThe dashboard tracks generation activity, brand performance, and kit completion. Templates provide starting points. The AI handles the writing. The brand stays consistent.",
        images: [
          { src: "/images/work/swayleo/homepage.png", alt: "Swayleo brand management dashboard", caption: "Dashboard — brand kits, email generation, and activity tracking" },
        ],
      },
      {
        heading: "The Build",
        body: "Built with AI as my build partner — the full SaaS stack. User authentication, brand kit management, AI-powered email generation, template system, and analytics dashboard.\n\nThe product demonstrates what's possible when a designer builds the whole thing. Every screen, every interaction, every flow — designed and built by one person with AI.",
      },
    ],
  },
  {
    slug: "scout",
    title: "Scout",
    desc: "AI-powered book writing assistant. Upload your manuscript, generate scene-level tasks, and let AI help you find the story that's already in there.",
    tag: "AI Tool",
    tagColor: "var(--color-amber)",
    tagBg: "#d9770610",
    pills: ["AI / LLM", "Writing", "Productivity"],
    category: "product",
    role: "Designer & Builder",
    timeline: "2025 – Present",
    outcome: "Work in progress",
    caseStudy: [
      {
        heading: "The Motivation",
        body: "I've been a writer all my life, and AI has helped me tremendously to organize my writing. But most AI writing tools focus on generating text. I wanted something different — a tool that helps you organize, develop, and refine the work you've already started.\n\nScout is the idea of creating a really good system where AI helps you see the structure of your story and develop it from the inside out.",
      },
      {
        heading: "What It Does",
        body: "Scout provides a process for creating a written work from start to finish. Upload your manuscript or outline, and it generates scene-level tasks — breaking a sprawling project into actionable pieces.\n\nThe AI doesn't write for you. It helps you find the story that's already there — identifying structural gaps, suggesting where scenes need development, and keeping track of narrative threads across a long-form work.",
      },
      {
        heading: "The Build",
        body: "Built with Claude Code Opus and other AI tools. The core challenge is making AI genuinely useful for creative writing without it becoming a crutch. The system needs to understand narrative structure, not just text.\n\nThis is still a work in progress — the process is being refined with every writing session. The goal is a tool that makes the messy middle of writing a book feel manageable.",
      },
    ],
  },
  {
    slug: "ibm",
    title: "IBM — Watson.data & AI",
    desc: "Senior Design Manager leading product design for Watson.data integration and AI experiences at enterprise scale.",
    tag: "Enterprise",
    tagColor: "var(--color-cyan)",
    tagBg: "#0891b212",
    pills: ["Enterprise", "SaaS", "AI / LLM", "Design Leadership"],
    category: "product",
  },
];

// ── Design Work (UX/product design career) ─────────────────────
export const designProjects: Project[] = [
  {
    slug: "streamsets",
    title: "StreamSets",
    desc: "Led the UX and product design process for StreamSets' market-leading DataOps platform — from open-source tool to enterprise SaaS, through to a $524M acquisition by IBM.",
    tag: "DataOps · SaaS",
    tagColor: "var(--color-cyan)",
    tagBg: "#0891b212",
    pills: ["UX Lead", "Enterprise", "SaaS", "Big Data"],
    role: "UX Lead",
    timeline: "Oct 2019 – Sep 2025",
    outcome: "Acquired by IBM for $524M",
    category: "design",
    featured: true,
    caseStudy: [
      {
        heading: "The Challenge",
        body: "StreamSets had a successful open-source DataOps engine used by data engineers to build and manage data pipelines. But the company needed to evolve — from a self-hosted, developer-driven tool into a full enterprise SaaS platform that could attract larger contracts and grow recurring revenue.\n\nThe product was powerful but complex. Onboarding was steep, the interface was built for power users, and the experience didn't support the kind of self-serve adoption that SaaS models demand.",
      },
      {
        heading: "My Role",
        body: "As UX Lead, I owned the end-to-end design process — research, architecture, wireframes, prototyping, and validation. I worked directly with product management, engineering leadership, and the executive team to define the future-state experience.\n\nI also built and led a 100+ person Product Advisory Council, creating a direct feedback loop between customers and the product team that informed every major design decision.",
      },
      {
        heading: "The Pivot: Open-Source to SaaS",
        body: "The core design challenge was translating a desktop-class data engineering tool into a cloud-native SaaS experience without alienating the existing power-user base.\n\nI led the redesign of the pipeline builder, the monitoring dashboard, and the onboarding flow — simplifying the experience for new users while preserving the depth that enterprise data teams relied on. Every feature went through research, low-fidelity sketches, stakeholder review, and prototype testing before entering development.",
      },
      {
        heading: "Driving Adoption & Revenue",
        body: "The design work directly contributed to a 10x increase in adoption and revenue. Key outcomes included:\n\n• Redesigned onboarding that reduced time-to-first-pipeline by over 60%\n• Simplified pipeline monitoring that non-technical stakeholders could understand\n• Self-serve workflows that enabled trial-to-paid conversion without sales intervention\n• Enterprise admin and collaboration features that unlocked larger contracts",
      },
      {
        heading: "The Outcome",
        body: "StreamSets was acquired by IBM in 2024 for $524 million. The product became the foundation of IBM's Watson.data integration story — and I transitioned into IBM as Design Manager in July 2024, continuing to lead the design of the platform at enterprise scale.\n\nSix years — from hands-on UX research and prototyping to strategic product decisions that drove a half-billion-dollar outcome.",
      },
    ],
  },
  {
    slug: "ibm-watson",
    title: "IBM — Watson.data Integration",
    desc: "Design Manager leading the integration of four acquired products into IBM's unified data and AI ecosystem. Defined architecture, managed designers across three regions.",
    tag: "Enterprise · AI",
    tagColor: "var(--color-violet)",
    tagBg: "var(--color-violet-dim)",
    pills: ["Design Manager", "Enterprise", "AI / LLM", "Multi-product"],
    role: "Design Manager → Senior Design Manager",
    timeline: "Jul 2024 – Present",
    outcome: "4 products integrated 2x ahead of schedule",
    category: "design",
    caseStudy: [
      {
        heading: "The Challenge",
        body: "After IBM acquired StreamSets, I was tasked with integrating four distinct data products into a cohesive experience within the IBM ecosystem — a program called Unite. Each product had its own design language, user base, and mental models. The goal: make them feel like one platform without breaking what worked.",
      },
      {
        heading: "My Role",
        body: "As Design Manager, I led a team of four designers across three regions and four products. I defined the UX architecture for the unified experience, established shared design patterns, and facilitated cross-product alignment between design, engineering, and product leadership.\n\nI also became the key design lead for IBM's future big data product with AI integration — shaping how AI capabilities would surface across the data platform.",
      },
      {
        heading: "The Approach",
        body: "I ran a design-driven integration process: auditing each product's UX patterns, mapping user journeys across tools, identifying shared concepts, and designing a unified navigation and workflow model.\n\nRather than forcing a top-down redesign, I worked with each product team to evolve their UI incrementally toward the shared model — reducing disruption for existing users while creating coherence for new ones.",
      },
      {
        heading: "The Outcome",
        body: "The integration was delivered 2x faster than originally scheduled. The unified experience created a seamless path across data ingestion, transformation, governance, and AI — positioning IBM's data platform as a competitive enterprise offering.\n\nI also established a design leadership program for new designers entering IBM, building the team's capacity for the long term.",
      },
    ],
  },
  {
    slug: "infinx",
    title: "Infinx Healthcare",
    desc: "Led UX design for an AI-driven healthcare product — supporting Infinx's pivot from services company to product company in the prior authorization space.",
    tag: "Healthcare · AI",
    tagColor: "var(--color-green)",
    tagBg: "#05966910",
    pills: ["UX Lead", "Healthcare", "AI / LLM", "Product Pivot"],
    role: "UX Lead",
    timeline: "Oct 2017 – May 2019",
    outcome: "Service company → Product company",
    category: "design",
    caseStudy: [
      {
        heading: "The Challenge",
        body: "Infinx was a healthcare services company looking to make a critical transition — from a manual, people-driven operation to a scalable, AI-powered product company. They needed to productize their prior authorization and revenue cycle expertise into software that hospitals and health systems could adopt.",
      },
      {
        heading: "My Role",
        body: "As UX Lead, I drove user-centered design practices for the flagship software — including user research, prototyping, surveys, and full UX product specifications. I worked closely with stakeholders to define key product features and translate domain expertise into an intuitive interface.",
      },
      {
        heading: "The Approach",
        body: "Healthcare software has notoriously poor UX. The users — billing specialists, prior auth teams, and revenue cycle managers — were drowning in manual processes and fragmented tools.\n\nI conducted research with end users to map their workflows, identify pain points, and prioritize features. Then I designed an AI-assisted interface that automated routine decisions while keeping humans in the loop for exceptions — balancing efficiency with the trust that healthcare demands.",
      },
      {
        heading: "The Outcome",
        body: "The product successfully launched, enabling Infinx to transition from a services-first to a product-first business model. The design established the foundation for the company's flagship AI platform, which continues to serve healthcare organizations today.",
      },
    ],
  },
  {
    slug: "livehive",
    title: "LiveHive",
    desc: "VP Product & Senior UX Designer at a startup building an enterprise-grade sales engagement platform. Pivoted the product from a sales tool to an industry-leading enablement platform — growing licensing 10x.",
    tag: "Sales · SaaS",
    tagColor: "var(--color-amber)",
    tagBg: "#d9770610",
    pills: ["VP Product", "Enterprise", "SaaS", "Big Data"],
    role: "VP Product / Senior UX Designer",
    timeline: "Mar 2015 – Oct 2017",
    outcome: "Licensing grew 10x after pivot",
    category: "design",
    caseStudy: [
      {
        heading: "The Challenge",
        body: "LiveHive started as a sales productivity tool — useful, but in a crowded market. The product needed a clear differentiator to justify enterprise pricing and compete against established players. The question was: what does this product become?",
      },
      {
        heading: "My Role",
        body: "As VP Product and Senior UX Designer, I owned both product strategy and design execution. I defined user-centered design practices for the entire software lifecycle — research, prototyping, design reviews, and product specs.\n\nThis was a dual role: part strategic (where should the product go?) and part hands-on (how should it work and feel?).",
      },
      {
        heading: "The Pivot",
        body: "Through customer research and market analysis, I led the pivot from a simple sales tool to a comprehensive sales enablement platform — a category that was emerging and underserved.\n\nThe redesign focused on content management, buyer engagement analytics, and sales coaching — giving enterprise sales teams visibility into what was working and why. The interface was designed for both reps in the field and managers reviewing performance.",
      },
      {
        heading: "The Outcome",
        body: "The pivot was a success. LiveHive went from a crowded feature comparison to a category-defining platform, growing licensing by 10x. The product attracted enterprise clients and positioned the company as an industry leader in sales enablement.",
      },
    ],
  },
  {
    slug: "eloomin",
    title: "Eloomin",
    desc: "Designed and built a social media app focused on positive engagement — no ads, no trolls, only good scrolls. Full product design from brand identity to mobile app UI to marketing website.",
    tag: "Social · Mobile",
    tagColor: "var(--color-violet)",
    tagBg: "var(--color-violet-dim)",
    pills: ["Product Design", "Mobile", "Brand Identity", "Social"],
    role: "Product Designer & Builder",
    timeline: "2024 – 2025",
    outcome: "Full product shipped — app + website + brand",
    category: "design",
    caseStudy: [
      {
        heading: "The Vision",
        body: "Social media is broken. Eloomin was built on a simple premise: what if a social platform prioritized positivity, real connections, and shared joy — without ads, trolls, or algorithmic manipulation?\n\nThe tagline says it all: no ads, no trolls, only good scrolls.",
      },
      {
        heading: "My Role",
        body: "I designed and built the entire product — brand identity, logo system, mobile app UI, marketing website, and go-to-market materials. This was a full-stack design effort from concept to shipped product.",
        images: [
          { src: "/images/design/eloomin/logo-v1.png", alt: "Eloomin logo exploration v1", caption: "Logo exploration — version 1" },
          { src: "/images/design/eloomin/logo-v2.png", alt: "Eloomin logo exploration v2", caption: "Logo exploration — version 2" },
          { src: "/images/design/eloomin/logo-v3.png", alt: "Eloomin logo exploration v3", caption: "Logo exploration — version 3" },
          { src: "/images/design/eloomin/logo.png", alt: "Eloomin final logo", caption: "Final logo system" },
        ],
      },
      {
        heading: "The Design",
        body: "The brand uses a clean, trustworthy blue palette with warm photography and approachable typography. The mobile app features a social feed with topic-based posts, sharing, commenting, and community features — designed to feel calm and intentional rather than addictive.\n\nThe marketing website communicates the mission (positive engagement, inclusivity, transparency) and the value proposition (subscription model at $36/month — no ads subsidizing manipulation).\n\nI also designed an apprenticeship program page — a UX bootcamp offering mentorship and real-world project experience, extending the brand into education.",
        images: [
          { src: "/images/design/eloomin/homepage.png", alt: "Eloomin marketing website homepage", caption: "Marketing website — homepage" },
          { src: "/images/design/eloomin/apprenticeship.png", alt: "Eloomin UX apprenticeship program page", caption: "UX Bootcamp — apprenticeship program" },
          { src: "/images/design/eloomin/feed.png", alt: "Eloomin mobile app social feed", caption: "Mobile — social feed" },
          { src: "/images/design/eloomin/share-modal.png", alt: "Eloomin share modal interaction", caption: "Mobile — share flow" },
          { src: "/images/design/eloomin/comment-input.png", alt: "Eloomin mobile comment input", caption: "Mobile — comment input" },
          { src: "/images/design/eloomin/user-search.png", alt: "Eloomin user search and share", caption: "Mobile — user search" },
        ],
      },
      {
        heading: "The Outcome",
        body: "Eloomin shipped as a complete product — mobile app, website, brand system, and marketing materials. The project demonstrates end-to-end product design capability: from brand strategy and visual identity through UX design and front-end implementation.",
      },
    ],
  },
  {
    slug: "consulting",
    title: "Jonathan Brink Design",
    desc: "Independent UX consultancy since 2007. Human-centered design thinking for clients including Charles Schwab, Sony, HP, IBM, Sunkist, Edelman, Caltrain, and dozens more.",
    tag: "Consultancy",
    tagColor: "var(--color-muted)",
    tagBg: "#8a868010",
    pills: ["UX Research", "Prototyping", "Enterprise", "19 years"],
    role: "UX Lead Consultant",
    timeline: "2007 – Present",
    outcome: "25+ enterprise clients served",
    category: "design",
    caseStudy: [
      {
        heading: "The Practice",
        body: "Since 2007, I've run an independent UX design consultancy — working with startups, mid-market companies, and enterprise organizations across healthcare, e-commerce, supply chain, sales engagement, and big data.\n\nClients include Charles Schwab, Sony, HP, IBM, Sunkist, Edelman, Emtrain, Caltrain, Rev Software, and many more.",
      },
      {
        heading: "The Process",
        body: "Every engagement follows a human-centered design thinking process:\n\n• Empathize — persona research and stakeholder interviews\n• Define — current and future state journey mapping\n• Ideate — low-fidelity sketches and concept exploration\n• Prototype — high-fidelity interactive prototypes\n• Test — usability testing and iteration\n\nI've delivered everything from initial UX audits to full product redesigns, always grounded in research and validated through testing.",
      },
      {
        heading: "The Range",
        body: "The breadth of this work is the point. Nineteen years of consulting across industries means I've seen patterns that specialists miss — and I bring that cross-pollination to every new engagement.\n\nFrom financial services (Schwab) to consumer electronics (Sony, HP) to food and agriculture (Sunkist) to public transit (Caltrain) — the design thinking process adapts, but the commitment to user-centered outcomes stays constant.",
      },
    ],
  },
];

// ── Combined (all projects) ────────────────────────────────────
export const allProjects = [...projects, ...designProjects];

// ── Homepage filters ───────────────────────────────────────────
export const homepageProjects = projects.filter((p) =>
  ["flowos", "persona-library", "elle", "play-exposed", "jett-builder", "moyst", "swayleo", "scout", "ibm"].includes(p.slug)
);

export const homepageDesignProjects = designProjects.filter((p) =>
  ["streamsets", "ibm-watson", "eloomin"].includes(p.slug)
);
