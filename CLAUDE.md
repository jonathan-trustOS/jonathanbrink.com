# jonathanbrink.com — Project Brief

## Who This Is For
Jonathan Brink. Senior Design Manager at IBM (Watson.data integration, AI). 25+ years product design. Independent consultant since 2007. Vibecoder — builds his own products using AI as a build partner. This site is his personal brand hub.

## What We're Building
A personal site at jonathanbrink.com. Not a traditional portfolio — a tools-first platform that drives traffic through free, useful tools and converts visitors into consulting clients. The site demonstrates the thesis by *being* the thing it talks about: a vibecoded product.

## The Positioning
**Headline:** Design. Build. Ship.
**Subhead:** Twenty-five years of product design and development. Now I close the gap between concept and code using AI as my build partner. Products that exist — not just decks that could.

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Hosting:** Vercel
- **DNS:** GoDaddy → Vercel (keep registrar, move hosting)
- **Content:** MDX for writing, JSON/TS for project data
- **No CMS** in V1

## Design Language
Light theme. Clean, editorial, confident. Not corporate. Not cluttered.

**Colors:**
```
bg:       #f8f7f4  (warm off-white)
surface:  #ffffff
surface2: #f1f0ed
border:   #e5e3de
violet:   #6d28d9  (primary accent)
cyan:     #0891b2  (secondary accent)
text:     #1a1814
dim:      #4a4740
muted:    #8a8680
green:    #059669
amber:    #d97706
```

**Typography:**
- `Bebas Neue` — display headlines
- `Instrument Serif italic` — accent/italic moments
- `Fira Code` — labels, tags, monospace UI
- `Inter` — body copy

**Rules:**
- Violet/cyan gradient on key italic moments
- Fira Code for all nav links, tags, pills, meta
- Section labels: uppercase, tracked, with a 20px violet line before them
- Cards: 1px border, hover reveals a 3px violet→cyan top line
- Grain texture overlay (subtle) on bg
- No dark mode — light only

## Site Architecture

```
/                   → Home
/work               → Work index
/work/[slug]        → Case study
/tools              → Tools index  
/tools/[slug]       → Individual tool (self-contained React component)
/writing            → Essay list (Phase 2)
/writing/[slug]     → Essay
/about              → About + timeline + consulting CTA
/contact            → Simple contact
```

## Navigation
Work · Tools · Writing · About · [Get in touch CTA]

## Current Work Projects
1. **Persona Library** (persona-library.com) — community UX research platform, amber accent, dark editorial aesthetic
2. **WaveIntent** (waveintent.com) — AI compliance document intelligence SaaS, navy/blue-purple
3. **Moyst Production Co.** — multi-agent AI screenplay pipeline
4. **Project Do** (localhost:3004) — task/project management tool

## Tools Library
First tool is **live and ready**: the Claude Code Workshop — an 11-slide interactive HTML presentation on setting up the perfect Claude Code environment. File is at `/tools/claude-code-workshop` and should be the featured tool.

Future tools (placeholders for now):
- Persona Generator
- UX Audit Scorecard

## About Stats
- 25+ Years Design
- 3 Products Shipped  
- ∞ Ideas in queue
- 0 Devs hired

## Ticker Items (scrolling credential strip)
UX Design · Vibecoding · AI Product Development · React / Next.js · Claude Code · Interaction Design · Systems Thinking · Currently @ IBM · 19 yrs Consulting · Free Tools

## Homepage Sections (in order)
1. Hero — two-col: left (headline + copy + CTAs), right (featured tool card — dark card on light bg intentional)
2. Ticker strip — scrolling credentials
3. Work — grid with Persona Library featured full-width, WaveIntent + Moyst below
4. Tools — 3-col grid, first live, two coming soon
5. About strip — headline + body left, stats right
6. Footer

## Key Copy (do not rewrite)
**Hero sub:** "Twenty-five years of product design and development. Now I close the gap between concept and code using AI as my build partner. **Products that exist** — not just decks that could."

**About body:** "Twenty-five years designing enterprise products — at IBM, StreamSets, Charles Schwab, and through my own consultancy. Then vibecoding changed everything. I can now take an idea from sketch to shipped product without waiting on a team. That changes what's possible."

## Phase Plan
- **Phase 1:** Home + Work section with 1 case study (Persona Library)
- **Phase 2:** Tools section + workshop tool live at /tools/claude-code-workshop
- **Phase 3:** Remaining case studies + About page
- **Phase 4:** Writing/blog

## HTML Reference Mockup
A complete HTML mockup of the homepage exists and has been approved. Use it as the visual reference for the Home page component. It is located at `reference/homepage-mockup.html` — copy it there from wherever it lands.

## What To Build First
Start with:
1. `npx create-next-app@latest jonathanbrink-site --typescript --tailwind --app`
2. Set up Google Fonts (Bebas Neue, Fira Code, Instrument Serif, Inter)
3. Define the color tokens in `tailwind.config.ts`
4. Build the Nav component
5. Build the Hero section
6. Build the Ticker component
7. Get the homepage rendering correctly
8. Then move to routing and inner pages

## Conventions
- Components in `/components`
- Page sections as composable components (e.g. `<HeroSection />`, `<WorkGrid />`)
- Project data in `/data/projects.ts`
- Tool pages as React components in `/app/tools/[slug]/page.tsx`
- All copy lives in the components — no external CMS in V1
