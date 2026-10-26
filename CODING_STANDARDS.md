# Coding standards

The judgement calls a reviewer checks. Anything mechanical is a check instead: `vp check`, which formats, lints, and type checks; `scripts/check-tokens.mjs` (no colour or arbitrary value outside `src/styles.css`, and spacing on the 4px grid); the tests; and CI (`.github/workflows/check.yml`).

## Sources of truth

GitHub Issues, then `docs/adr/`, then `GLOSSARY.md` (created lazily by the domain-modeling skill when the first term is resolved). Code is never one. Name things with the glossary's terms and none of its _Avoid_ words. A change that contradicts an ADR waits for approval.

## Stack first

Use Cloudflare (Workers, D1, R2, Workers AI, Queues, Email Sending, Analytics Engine, Cron), TanStack Start, shadcn, and Drizzle before writing code or adding a library. Custom code that stays carries one line saying why the stack cannot do it. A package a shadcn component imports as written stays while that component does.

## Design

- shadcn first: a component shadcn has is added with its CLI and used as written; it changes only through the tokens in `src/styles.css` and its variants.
- Type in one scale: a page's title `text-2xl`, a section's `text-lg`, both weight 600; numbers and money in tabular figures.
- A link that goes to a page is a link. A button is the one action on the screen. A row of buttons that only navigate is a list of links.
- One primary action a screen; a loading, an empty, and an error state for every list.

## Shape

- A rule lives in a module a route only passes the request to.
- An abstraction earns its place by removing duplication in three or more places.
- Config states only what differs from a default.
- A write that depends on what it read carries that condition into the write.

## Tests

- Drive public functions and assert what a caller can observe.
- Never read tables or private functions, test a fake or a framework, or re-assert a type.
- Near-duplicates become one table-driven test.

## Commits

One concern per commit, and every check passes after each.
