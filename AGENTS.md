# AGENTS.md

Portable guidance for AI coding agents working in this repo (Cursor reads `.cursor/rules/dcloud.mdc`; Claude Code reads `CLAUDE.md`; both mirror this).

## What this is

A prototype reimagining of Cisco **dCloud** (a sales-demo platform) — a clean, dark, spacious "step-change", explicitly **not a reskin** of today's dense dCloud. `context.md` is the source of truth for *what* to build; surface conflicts rather than silently resolving them.

## Run it

```bash
npm install        # first time / new machine
npm run dev        # Vite on :5173
npm run build      # tsc -b typecheck + vite build
```

## Hard constraints

- **No backend** — everything client-side; persist state in `localStorage`.
- **File-based seed data** in `src/data/catalog.ts` (no DB/API).
- **Per-user** history and scoring, made obvious in the UI.

## Conventions

- React 19 + Vite 6 + TypeScript + React Router 7.
- Custom CSS + **design tokens** in `src/styles/tokens.css` (never hard-code colours/spacing); **CSS Modules** co-located with components; `@/` alias for `src/`.
- `src/pages/<Name>/`, `src/components/<Name>/`, logic in `src/lib/`, data in `src/data/`.
- Auth/session centralised in `src/lib/auth.ts` (simulated SSO via `localStorage`); `RequireAuth` gates non-public routes.
- North-star: **Cisco Cloud Control** — dark, spacious, gradient glow, pill chips. Keep pages uncluttered.

## Domain model & terminology

`GTM Motions → Solution Spaces → Demos/Labs`. Nothing is orphaned; connections are manual.

- UI says **Solution Spaces** (not "Zones"); each Space has a **unique background**.
- **My Spaces** = a seller's custom, customer-scoped Spaces, publishable as a **dCloud eXpo**.
- Gamification is **very soft** (off the hub; detail on Profile).

See `CLAUDE.md` / `.cursor/rules/dcloud.mdc` for build progress and the full detail.
