# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Source of truth

The project brief in [context.md](context.md) is the source of truth for *what* to build. When the brief and the code disagree, surface the conflict rather than silently picking one. Keep `context.md` in mind for every change; this file distills its durable constraints plus the conventions established in code.

## Commands

```bash
npm run dev        # Vite dev server on :5173
npm run build      # tsc -b (typecheck) then vite build → dist/
npm run typecheck  # tsc -b --noEmit, no build output
npm run preview    # serve the production build
```

To preview during a session, prefer the `preview_start` tooling (config in `.claude/launch.json`, server name `dcloud-dev`) over running `npm run dev` in the background.

## Stack & conventions

**React 19 + Vite 6 + TypeScript + React Router 7.** Established patterns to follow when adding modules:

- **Styling: custom CSS + design tokens** (no CSS framework). All colours/spacing/type/radii live as CSS variables in [src/styles/tokens.css](src/styles/tokens.css) — consume them, never hard-code. Component styles are **CSS Modules** (`Foo.module.css`) co-located with the component. Global resets and the `.gradient-text` helper are in [src/styles/global.css](src/styles/global.css).
- **Imports** use the `@/` alias for `src/` (configured in both `vite.config.ts` and `tsconfig.app.json`).
- **Layout:** pages in `src/pages/<Name>/`, reusable components in `src/components/<Name>/`, non-UI logic in `src/lib/`.
- **Auth/session** is centralised in [src/lib/auth.ts](src/lib/auth.ts): a simulated SSO that reads/writes the current `User` to `localStorage` under `dcloud.user`. Every module (history, favourites, scoring) should read the user from here. `RequireAuth` ([src/components/RequireAuth.tsx](src/components/RequireAuth.tsx)) gates every route except the public landing.

## Build progress (module by module)

- ✅ **Logged-out landing** ([src/pages/Landing](src/pages/Landing)) — public/SEO page, `SpiralLogo` (the supplied rainbow-vortex artwork), simulated Cisco SSO → `/home`.
- ✅ **Logged-in hub** ([src/pages/Home/Home.tsx](src/pages/Home/Home.tsx)) — persistent [TopBar](src/components/TopBar/TopBar.tsx), soft "Hi, &lt;name&gt;" hero, Solution Spaces grid ([SpaceCard](src/components/SpaceCard/SpaceCard.tsx)), flat New Demos, low-key My Spaces strip. Calm/Cloud-Control styling; gamification deliberately kept off the hub. File-based seed content in [src/data/catalog.ts](src/data/catalog.ts), domain types in [src/lib/types.ts](src/lib/types.ts).
- ✅ **Solution Space pages** ([src/pages/Space/Space.tsx](src/pages/Space/Space.tsx), route `/spaces/:spaceId`) — distinct per-Space background ([SpaceBackground](src/components/SpaceBackground/SpaceBackground.tsx), generated from each Space's two accents + an id-seeded geometry variant), hero, seller→buyer journey strip, and the Space's connected demos in one type-ordered grid ([DemoCard](src/components/DemoCard/DemoCard.tsx)). Counts derived from the demos, not stored.
- ⬜ My Spaces builder + "Convert to eXpo" · Admin · ⌘K palette · Favourites · History · Scheduled · Profile/scoring.

**Terminology (revises context.md):** the UI uses **Solution Spaces** (not "Zones"). **My Spaces** = a seller's custom, customer-scoped Spaces, publishable as a **dCloud eXpo**. See the `hub-concept-decisions` memory.

## What this is

A prototype reimagining of Cisco **dCloud** (Cisco's sales demonstration platform) — a "complete step-change", explicitly **not a reskin** of today's dCloud. The current dCloud is the **anti-pattern**: a flat, dense, text-heavy card-list / accordion-sidebar with poor raw search and no journey between demos. Diverge from it.

## Hard constraints (do not violate)

- **No backend.** Everything is client-side. Persist all state in **`localStorage`**.
- **File-based test data.** Seed/demo content lives in files in the repo, not a database or API.
- **History and scoring are per-user** and must be obvious in the UI.

## Core domain model

The whole product is built on a **strict connectivity hierarchy** — content is organised around GTM, never as one flat list. Connections are **manual** (managed via an Admin UI), not auto-derived from tags.

```
GTM Motions            (top level; flexible/editable — these change over time)
  e.g. AI Ready Data Centres · Future Proof Workplaces · Digital Resilience
        │  (a Solution Zone connects to one or more GTM Motions)
Solution Zones         (the critical new idea — see below)
  e.g. Secure Networking · Secure AI Factory · Workplace Experiences ·
       Digital Resilience Assurance · Agentic Security Architecture ·
       Unified Forwarding Architecture · Cost Effective Network Stack
        │  (a demo connects to one or more Solution Zones)
Demos & Labs
  Solution Demos   – broad, not deep; anchor of a zone
  Deep-Dive Demos  – deep, not broad; drill into parts of a Solution Demo
  Guided Demos     – click-thru intros / quick run-thrus
  Labs             – hands-on
```

**Connectivity rules (central to the design):**
- Everything is connected **upstream**. Nothing outside Solution Demos is standalone.
- Solution Demos are the anchors (no upstream connective tissue of their own).
- Deep-Dives and Guided Demos each connect to **one or more** Solution Demos/Zones.
- A demo should **never be orphaned**. The Admin screen must **flag orphaned demos**.
- GTM Motions and Solution Zones are **editable in the Admin UI** (the model is meant to evolve).

## Key product concepts

- **Solution Zone** — the marquee feature. A focused, fully-connected hub bringing one GTM solution's demos, labs, guided demos, videos and docs into one place, with a defined seller→buyer **journey** (guided demo → simulation/solution demo → deep-dives → POV/Lab/CPOC). **Each zone must have a distinct, high-tech visual identity** (unique background per zone). Keep zone pages clean, not cluttered.
- **Search is a second-class citizen.** Navigation to a Solution Zone is the preferred path. Raw search may surface content but **always within the GTM/Solution hierarchy**. The search bar lives in the top nav (not front-and-centre). Also provide a **⌘K fuzzy command palette** and a simulated AI search.
- **Personalisation** — recognise the user (name/role/avatar top-right), remember history, favourites, and scheduled content.
- **Favourites** — a gold star in the top nav opening the user's favourite demos/zones.
- **Gamification** — points for running demos, adding customer outcomes, labs, etc., driving a 10-tier status ladder (Explorer → Practitioner → Contributor → Specialist → Expert → Advisor → Strategist → Leader → Master → Visionary). High ranks should be **hard** to reach.

## Tagging (operationally critical)

Multi-faceted, **categorised** tags — the UI should give a box per tag type:
- **Demo Type:** Solution · Deep-Dive · Guided · Lab
- **Demo Operational Type:** Scheduled · Instant · Guided
- **BE (Business Entity):** CAI · Service Provider · Collaboration · Cisco Compute · IOT · Security · Splunk · Enterprise Networking · Enterprise Switching · Wireless · Network Assurance · AI

## UX north-star

**Modern, dark, spacious.** Visual reference is **Cisco Cloud Control** (dark, centred "Hi, <Name>", gradient glow, pill chips, colourful viz on dark). Keep pages clean — do not pile many different things onto one page.

- **Public landing (logged-out):** the **only** crawlable/SEO page; everything else is behind sign-in. Animated spiral logo, welcome, "Log in with Cisco" (**simulated SSO**). Space content out.
- **Logged-in home:** latest content, quick access to zones, favourites, history, scheduled content.
- **Top bar (persistent when logged in):** Logo + dCloud (home) · Home · Solutions ▾ (dropdown listing all zones, reachable from anywhere) · Favourites · History · Search icon (opens ⌘K palette) · Avatar (Profile).
- **Profile page** should link out to Salesforce.

## Personas

Cisco Sellers (SEs = technical, AEs = less technical), Partner Sellers, and Customers (who want a great hands-on try-it experience).
