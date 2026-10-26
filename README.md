# rushuploads

TanStack Start on Cloudflare Workers, with Tailwind CSS v4 and shadcn/ui (Base UI). Deploys with Void; Vite+ owns development, build, formatting, linting, typechecking, and unit tests.

## Prerequisites

- Node 24 (`.node-version`) — installed by `setup-vp` in CI, or any version manager locally
- `pnpm` 12 — via the `packageManager` field / Corepack
- `vp` (Vite+) — see https://viteplus.dev

## Setup

```sh
pnpm install
```

`postinstall` runs `void prepare`, which generates `.void/` types and the gitignored `.void-wrangler.jsonc` (re-materialized by `scripts/ensure-void-wrangler.mjs` for local D1 and Vitest).

## Scripts

```sh
vp dev             # Vite + Workers runtime on http://localhost:3000
vp build           # production client + worker
vp preview         # preview the production build locally
vp check           # format + lint + typecheck (what CI runs first)
vp test run        # unit tests
pnpm run db:migrate:local   # apply D1 migrations to the local DB
pnpm run deploy    # void deploy to Cloudflare
```

## Cloudflare

Bindings live in `void.config.ts` (`cloudflare:`), typed env in `env.ts`, Worker vars in `void.config.ts` `vars:` and secrets via `void secret put`.

| Binding      | Resource                          |
| ------------ | --------------------------------- |
| `DB`         | D1 (`rushuploads`)                |
| `R2`         | R2 bucket (`rushuploads`)         |
| `AI`         | Workers AI                        |
| `ASSETS`     | Workers Assets (Vite injects dir) |
| `SEND_EMAIL` | Email Routing send binding        |
| `ANALYTICS`  | Analytics Engine dataset          |
| `APP_NAME`   | Worker var                        |

Cron lives in `crons/system.ts` (hourly placeholder). Void only deploys queue bindings derived from source (`void/queues` or `env.QUEUE_*`), so no queue exists yet — add one with its consumer when the product needs it. The inbound-email handler from the original scaffold was a stub; `SEND_EMAIL` stays bound until then.

D1 has no `database_id` yet — the first deploy provisions it, then record the id in `void.config.ts`.

```sh
pnpm exec wrangler d1 migrations create DB <name> -c .void-wrangler.jsonc
pnpm run db:migrate:local
pnpm run deploy
```

## UI

shadcn/ui is initialized as **base-nova** (Base UI, not Radix). Paths in `components.json` match this Start app (`src/styles.css`, `@/components`). Use the locally installed CLI:

```sh
pnpm exec shadcn add card
```

Add TanStack Query, Form, and Table when a route needs them:

```sh
pnpm add @tanstack/react-query @tanstack/react-form @tanstack/react-table
```
