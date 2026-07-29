# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev     # Dev server at http://localhost:3000 (Turbopack, hot reload)
npm run build   # Production build
npm start       # Serve the production build
npm run lint    # ESLint (flat config in eslint.config.mjs)
```

There is no test setup in this project.

## Version-critical: Next.js 16

This project uses **Next.js 16.2.12** (App Router) with **React 19.2** — newer than your training data, with breaking changes. Version-matched docs are bundled at `node_modules/next/dist/docs/` (mirrors nextjs.org/docs: `01-app/01-getting-started/`, `02-guides/`, `03-api-reference/`). Consult the relevant page there before writing Next.js code.

Key differences from older Next.js you may assume:

- **Middleware is now Proxy**: the file convention is `proxy.ts`, not `middleware.ts`.
- **Async request APIs**: `params`, `searchParams`, `cookies()`, `headers()`, `draftMode()` must be awaited.
- **Cache Components** is the new caching model (`cacheComponents: true` in `next.config.ts`, `"use cache"` directive, `cacheLife`/`cacheTag`, `revalidateTag`/`updateTag`/`refresh`). The legacy model is documented in `02-guides/caching-without-cache-components.md`.
- **Turbopack is the default bundler**; Turbopack config lives at the top level of `next.config.ts`.
- Several `next/image` defaults changed (`minimumCacheTTL`, `imageSizes`, `qualities`; `images.domains` is deprecated in favor of `remotePatterns`).

Full list: `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`.

## Architecture

Freshly scaffolded `create-next-app` — a single App Router route (`app/layout.tsx` + `app/page.tsx`) and no backend code yet.

- **Styling**: Tailwind CSS v4 via PostCSS (`@tailwindcss/postcss`). There is no `tailwind.config.*` — theme tokens are defined in `app/globals.css` using `@import "tailwindcss"` and the `@theme inline` block (CSS variables like `--color-background`, with dark mode via `prefers-color-scheme`).
- **TypeScript**: strict mode; path alias `@/*` maps to the repo root.
