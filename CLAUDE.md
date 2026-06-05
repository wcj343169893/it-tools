# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
pnpm install          # Install dependencies (requires pnpm@9.11.0)
pnpm dev              # Start dev server with hot reload
pnpm build            # Type-check (vue-tsc --noEmit) then production build
pnpm test             # Run unit tests (vitest in jsdom environment)
pnpm test:e2e         # Run Playwright E2E tests
pnpm test:e2e:dev     # Run Playwright E2E against local dev server
pnpm lint             # ESLint on src/ (Vue, JS, TS files)
pnpm typecheck        # vue-tsc type check only
pnpm coverage         # Vitest with coverage report
pnpm run script:create:tool <name>  # Scaffold a new tool (kebab-case name)
pnpm run script:create:ui           # Scaffold a UI component (hygen)
```

In unit tests, avoid `pnpm test` directly; use `pnpm vitest` to target specific test files.

## Architecture

**Stack**: Vue 3 + TypeScript + Vite + Pinia + Naive UI + UnoCSS + vue-i18n. Single-page app with PWA support via vite-plugin-pwa.

**Entry point**: `src/main.ts` — creates the Vue app, installs Pinia, VueUse head, i18n, router, Naive UI, Plausible analytics, and vue-shadow-dom.

**Auto-imports** (configured in `vite.config.ts` via `unplugin-auto-import`): `vue`, `vue-router`, `@vueuse/core`, `vue-i18n`, plus Naive UI's `useDialog`, `useMessage`, `useNotification`, `useLoadingBar`. These are available globally without imports.

**Components** are auto-registered via `unplugin-vue-components` scanning `src/`. Naive UI components and iconify icons (prefixed `icon-`) are also auto-resolved. Custom components use a `c-` prefix (e.g., `c-card`, `c-button`, `c-input-text`).

**UnoCSS** with presets: Uno, Attributify, Typography, Scrollbar. Shortcuts defined in `unocss.config.ts`: `pretty-scrollbar`, `divider`, `bg-surface`, `bg-background`.

**State**: Pinia stores in `src/stores/` (`style.store.ts` for dark mode/screen size/menu state) and `src/tools/tools.store.ts` for tool listing, favorites (persisted to localStorage).

**Routing** (`src/router.ts`): Routes are generated from the tools array. Each tool gets a route at its `path` with `meta.isTool = true` and `meta.layout = layouts.toolLayout`. Tools can define `redirectFrom` for legacy URL support. The home page is at `/`, about at `/about`, and a catch-all 404.

**Layout system** (`src/layouts/`): Two layouts — `BaseLayout` (sidebar menu + content slot) and `ToolLayout` (wraps BaseLayout, adds tool title, description, and favorite button via route meta). The active layout is resolved in `App.vue` from `route.meta.layout`.

## Tool architecture

Each tool lives in `src/tools/<kebab-case-name>/` and follows this pattern:

- **`index.ts`** — Defines the tool with `defineTool()`: name, path, description, keywords, icon (from `@vicons/tabler`), lazy-loaded component, optional `redirectFrom` and `createdAt` (the latter controls the "New" badge for 2 weeks).
- **`<name>.vue`** — The tool component. Typically uses `c-card` wrappers, `c-input-text` (with `multiline` and `raw-text` for monospace), and `c-button` for actions.
- **`<name>.service.ts`** — Pure business logic (optional).
- **`<name>.service.test.ts`** — Vitest unit tests for the service.
- **`<name>.e2e.spec.ts`** — Playwright E2E tests.
- **`<name>.model.ts`** / **`<name>.types.ts`** — Type definitions (optional).

**Registration**: Tools must be imported and added to the appropriate category in `src/tools/index.ts` inside `toolsByCategory`. Categories: Crypto, Converter, Web, Images and videos, Development, Network, Math, Measurement, Text, Data.

The `defineTool()` function in `src/tools/tool.ts` automatically computes `isNew` based on `createdAt` (newer than 2 weeks).

## Key patterns

- **Copy to clipboard**: Use `useCopy` from `src/composable/copy.ts`, NOT `useClipboard` from `@vueuse/core` (enforced by ESLint). It shows a Naive UI toast on copy.
- **URL state**: Use `useQueryParam` from `src/composable/queryParams.ts` to sync reactive state with URL query parameters. Supports string, number, boolean, and object types.
- **Form validation**: `useValidation` from `src/composable/validation.ts` provides reactive validation status and error messages from rule arrays.
- **User preferences**: Use `useStorage` from `@vueuse/core` for persisting settings across sessions (theme, favorites, etc.).
- **i18n**: Translations live in `locales/` and per-tool `src/tools/*/locales/`. The `translate()` helper in `src/plugins/i18n.plugin.ts` returns the locale key itself if no translation exists, so missing translations degrade gracefully. Tool names and descriptions in `index.ts` use `translate()` to reference locale keys like `tools.<path-without-slashes>.title`.
- **Config**: `src/config.ts` uses `figue` with env var mapping for runtime configuration (app version, base URL, Plausible tracking, banner flags).

## Testing

- **Unit tests**: Vitest with jsdom. Files named `*.test.ts` or `*.spec.ts`. Exclude E2E files via `vite.config.ts` test.exclude.
- **E2E tests**: Playwright. Files named `*.e2e.spec.ts`. Run against either built app or local dev server.
- Always verify business logic in `*.service.ts` files with corresponding `*.service.test.ts` files.
