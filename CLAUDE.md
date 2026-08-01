# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev             # Dev server at http://localhost:3000 (Turbopack, hot reload)
npm run build           # Production build
npm start               # Serve the production build
npm run lint            # ESLint (flat config in eslint.config.mjs)
npx prisma generate     # Regenerate Prisma client after editing prisma/schema.prisma
npx prisma db push      # Sync schema to the database (no migrations dir — schema is pushed)
```

There is no test setup in this project.

Required env vars (in `.env`, loaded via `prisma.config.ts`/Next): `DATABASE_URL` (mysql:// URL), `ADMIN_SESSION_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`.

## Version-critical: Next.js 16

This project uses **Next.js 16.2.12** (App Router) with **React 19.2** — newer than your training data, with breaking changes. Version-matched docs are bundled at `node_modules/next/dist/docs/` (mirrors nextjs.org/docs: `01-app/01-getting-started/`, `02-guides/`, `03-api-reference/`). Consult the relevant page there before writing Next.js code.

Key differences from older Next.js you may assume:

- **Middleware is now Proxy**: the file convention is `proxy.ts`, not `middleware.ts`.
- **Async request APIs**: `params`, `searchParams`, `cookies()`, `headers()`, `draftMode()` must be awaited.
- **Cache Components** is the new caching model (`cacheComponents: true` in `next.config.ts`, `"use cache"` directive, `cacheLife`/`cacheTag`, `revalidateTag`/`updateTag`/`refresh`). The legacy model is documented in `02-guides/caching-without-cache-components.md`.
- **Turbopack is the default bundler**; Turbopack config lives at the top level of `next.config.ts`.
- Several `next/image` defaults changed (`minimumCacheTTL`, `imageSizes`, `qualities`; `images.domains` is deprecated in favor of `remotePatterns`).

Full list: `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`.

## What this is

Korean-language marketing site for 미소골드 (Misogold), a gold buying/selling shop: a single public landing page showing gold prices and a showcase gallery, plus a password-protected admin dashboard to edit both. All user-facing text is Korean.

## Architecture

**Public page** (`app/page.tsx`): server component with `export const dynamic = "force-dynamic"` — it reads `GoldPrice` and `ShowcaseImage` rows from the DB on every request and passes them into the client section components in `components/` (`Header`, `HeroBanner`, `ImageShowcase`, `Directions`, `Facilities`, `Footer`, `FloatingWidgets`). Charts in `GoldChart.tsx` are TradingView embeds. `components/obsolete/` holds retired sections — don't wire them back in.

**Admin** (`app/admin/`): `page.tsx` is a server component that validates the session cookie and redirects to `/admin/login` if absent, then renders the client `AdminDashboard.tsx`. Mutations go through `app/api/admin/*` route handlers, which call `revalidatePath("/")` after writes.

**Auth** (`lib/session.ts`): single admin account checked against `ADMIN_USERNAME`/`ADMIN_PASSWORD` env vars — no user table. The session is an AES-256-CBC-encrypted JSON payload (with `exp` timestamp) in the httpOnly cookie `misogold_admin_session`, keyed by `ADMIN_SESSION_SECRET`. There is no proxy/middleware; every protected API route re-checks the cookie itself via a local `checkAuth()` helper — new admin routes must do the same.

**Database** (Prisma 7): schema in `prisma/schema.prisma` (MySQL/MariaDB), two models: `GoldPrice` and `ShowcaseImage`. Note `buyPrice`/`sellPrice` are deliberately **strings**, not numbers — free text like "시세문의" (price on inquiry) is valid; `HeroBanner`'s `formatPrice()` formats numeric strings and passes anything else through. The client is generated into `app/generated/prisma/` (committed; regenerate after schema changes). `lib/prisma.ts` exports a lazy Proxy singleton that defers instantiation until first DB access (so builds don't need `DATABASE_URL`) and manually parses the URL into a `@prisma/adapter-mariadb` config — Prisma runs through the MariaDB driver adapter, not the default engine.

**Uploads**: admin-uploaded showcase images are written to `uploads_data/` at the repo root (created at runtime, not committed; a Docker volume in production) and served by the route handler `app/uploads/[filename]/route.ts` (with directory-traversal protection) — not from `public/`. DB rows store the `/uploads/<filename>` URL.

**Styling**: Tailwind CSS v4 via PostCSS; no `tailwind.config.*`. Theme tokens live in `app/globals.css` under `@theme inline` — the brand palette is the `--color-gold` / `--gold-dark` / `--gold-light` variables (used as `text-gold`, `bg-gold/10`, etc.).

**TypeScript**: strict mode; path alias `@/*` maps to the repo root.

## Deployment

Push to `main` triggers `.github/workflows/deploy.yml`: npm build → `docker build` → `docker save` → scp the image tarball to a remote host → run the container on port 8080 with `--env-file /home/devuser/app/.env` and the `misogold_uploads` volume mounted at `/app/uploads_data`. Runtime env vars live on the remote server, not in GitHub — adding a required env var means updating the remote `.env` too.
