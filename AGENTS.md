<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## MCPS

- Screenshots y cualquier cosa relacionada con Playwright tienen que estar en la carpeta `.playwright-mcp`.
- Context7 usaremos este mcp para traer la documentación actualizada del framework.

## Spec driven development - Skills

- /spec Usaremos esta habilidad para crear las especificaciones
- /spec-impl Usaremos esta skill para hacer las implementaciones de las specs

## Code rules

- Apply clean code, names , variables, functions must be in english.

## Project Overview

`open-daycare` is a daycare management web app (feed, children profiles "niños", posts/avisos, family accounts, day summaries). Built with **Next.js 16.3.0** (App Router, NOT your usual Next.js — read `node_modules/next/dist/docs/`), **React 19.2**, **TypeScript 5** (strict), **Tailwind CSS v4**, and **pnpm 11**. Reference design mockups live in `references/pantallas/*.dc.html` (a dc-runtime format) with screenshots in `references/screenshots/`.

## Build / Dev / Lint Commands

Package manager is **pnpm** (`packageManager: pnpm@11.20.0`). Always run via pnpm, never `npm`/`yarn`.

```bash
pnpm dev          # Start dev server on http://localhost:3000
pnpm build        # Production build
pnpm start        # Run production build
pnpm lint         # ESLint v9 flat config (eslint.config.mjs)
```

### Type checking

There is **no dedicated `typecheck` script**. Run the TS compiler directly:

```bash
pnpm exec tsc --noEmit        # Type-check the whole project
```

If you add a `typecheck` script to `package.json`, also document it here.

### Tests

**No test framework is currently installed.** There is no `test` script and no test runner dependency. If the user asks to run a test, tell them none is configured. When you add one (e.g. Vitest, Playwright test, Jest), install it, add a `test` script, and document the single-test invocation here:

```bash
pnpm test                      # Placeholder until a runner is added
pnpm test path/to/file.test.ts # Run a single test file (once configured)
```

## Code Style

### TypeScript & types

- `strict: true` is on — no `any` unless unavoidable; prefer `unknown` + narrowing. No `// @ts-ignore`; fix the type or use `// @ts-expect-error <reason>`.
- Target ES2017, `moduleResolution: "bundler"`, `isolatedModules: true`. Use `import type` for type-only imports (e.g. `import type { Metadata } from "next"`).
- Path alias `@/*` → repo root (e.g. `@/app/page.tsx`). Prefer `@/` over deep relatives.

### Imports

- Order: external packages → internal `@/` aliases → relatives → side-effect imports (`.css`). Type imports use `import type`.
- React is not imported in components that use the new JSX transform (`jsx: "react-jsx"`).
- Config files use ESM `.mjs`/`.ts` with `export default`.

### Formatting

- 2-space indentation. Double quotes for strings. Semicolons required. Trailing commas in multi-line lists. No Prettier config is present — match existing file style.

### Naming & structure (Next.js App Router)

- App directory is `app/`; routes are file-based (`app/page.tsx`, `app/layout.tsx`). Default-export the page/layout component.
- Components/Functions: PascalCase for components, camelCase for functions/variables, UPPER_SNAKE for constants.
- Use named exports for helpers; default export for route components only.
- Async server components and Route Handlers use `async function`. Don't write file extensions in imports (`import x from "@/lib/y"`).

### Styling

- Tailwind v4 via PostCSS (`postcss.config.mjs`, `@tailwindcss/postcss`). Stylesheet entry is `app/globals.css` using `@import "tailwindcss"` and `@theme inline`.
- Prefer Tailwind utility classes inline. Dark mode uses `prefers-color-scheme` + `dark:` variants. Fonts loaded with `next/font/google` (Geist, Geist_Mono) exposing CSS variables.
- Use `next/image` for images (note `next.config.ts` is empty — configure `images` domains if loading remote images before doing so).

### Error handling

- `noUncheckedIndexedAccess` is off; guard arrays/maps when needed. Fail loudly during dev: log errors via `console.error` with a descriptive prefix.
- For React/Server Components errors, prefer error boundaries / `error.tsx` route conventions over try-catch swallowing.
- Never commit secrets. `.env*` is gitignored; reference env via `process.env.NAME` only after documenting required vars.

## Agent Workflow Notes

- **Read the docs first.** When touching Next.js APIs, open the relevant file under `node_modules/next/dist/docs/01-app/` (getting-started, guides, api-reference) before writing code. Don't assume pre-16 behavior.
- **MCPs:** Playwright artifacts (screenshots, traces) must go under `.playwright-mcp/` (it's gitignored). Use Context7 to fetch up-to-date framework docs instead of relying on memory.
- After code changes, run `pnpm lint` and `pnpm exec tsc --noEmit`. Only run `pnpm build` when verifying production output.
- Neighbouring conventions: `CLAUDE.md` is `@AGENTS.md` (re-includes this file); the `references/pantallas/*.dc.html` files are generated design mockups — do not hand-edit `support.js` (it says `GENERATED — do not edit`).
- Spec-driven work: use the `spec` skill (design a new feature) and `spec-impl` skill (implement an approved spec, branch named after the spec).
