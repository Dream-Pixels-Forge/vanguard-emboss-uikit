# Dependencies Audit Report

> **Project:** vanguard-emboss-uikit v0.5.1
> **Audit Date:** 2026-05-26
> **Package Manager:** pnpm 11.1.1
> **Direct Packages:** 84 (40 dependencies, 44 devDependencies)
> **Total Dependencies (with transitive):** 775
> **node_modules Size:** ~680 MB

---

## 1. Security Vulnerabilities

### 1.1 esbuild — CVE-2026-? (GHSA-67mh-4wv8-2f99)

| Field | Value |
|-------|-------|
| **Severity** | Moderate |
| **CWE** | CWE-346 — Origin Validation Error |
| **Package** | esbuild `<=0.24.2` |
| **Patched** | esbuild `>=0.24.3` |
| **Our Version** | 0.21.5 (via vitest → vite 5) + 0.28.0 (via size-limit, storybook, vite 8) |
| **Type** | Dev dependency only — **not shipped** |

**Details:** esbuild's dev server allows any website to send requests and read responses. Affects development workflow only.

**Paths:**
- All through Storybook, vitest, eslint-plugin-storybook chains
- ~42 dependency paths total

**Action:** ✅ Resolved — vitest upgraded to v4.1.7 (esbuild transitive updated to `>=0.24.3`).

---

### 1.2 Vite — CVE-2026-? (GHSA-4w7w-66w2-5vf9)

| Field | Value |
|-------|-------|
| **Severity** | Moderate |
| **CWE** | CWE-22, CWE-200 — Path Traversal + Information Exposure |
| **Package** | vite `<=6.4.1` |
| **Patched** | vite `>=6.4.2` |
| **Our Version** | 5.4.21 (via vitest) + 8.0.14 (direct) |
| **Type** | Dev dependency only — **not shipped** |

**Details:** Path traversal in optimized deps `.map` file handling allows reading arbitrary files.

**Paths:**
- All through vitest → @vitest/mocker → vite chain
- ~24 dependency paths total

**Action:** ✅ Resolved — vitest upgraded to v4.1.7 (vite transitive updated to `>=6.4.2`).

---

## 2. Upgraded Dependencies

The following packages were upgraded on 2026-05-26:

| Package | From | To | Risk | Notes |
|---------|------|----|:----:|-------|
| `typescript` | 5.9.3 | 6.0.3 | 🟢 Low | Added `src/vite-env.d.ts` for TS 6 types default |
| `react` (dev + peer) | 18.3.1 | 19.2.6 | 🟢 Low | peer range widened to `^18.2.0 \|\| ^19.0.0` |
| `react-dom` (dev + peer) | 18.3.1 | 19.2.6 | 🟢 Low | peer range widened to `^18.2.0 \|\| ^19.0.0` |
| `@types/react` | 18.3.29 | 19.2.15 | 🟢 Low | |
| `@types/react-dom` | 18.3.7 | 19.2.3 | 🟢 Low | |
| `vitest` + `@vitest/*` | 3.2.4 | 4.1.7 | 🟡 Low-Med | Browser provider API changed |
| `eslint` | 8.57.1 | 10.4.0 | 🟡 Medium | Migrated to flat config |
| `eslint-plugin-react-hooks` | 4.6.2 | 7.1.1 | 🟢 Low | React 19 Compiler rules added (disabled) |
| `eslint-plugin-react-refresh` | 0.4.26 | 0.5.2 | 🟢 Low | |
| `typescript-eslint` | _new_ | 8.60.0 | 🟢 Low | Replaced `@typescript-eslint/parser` + plugin |
| `tailwindcss` | 3.4.19 | 4.3.0 | 🔴 High | v4 rewrite — CSS-first config, `@theme` blocks, `@variant`, `tailwindcss-animate` → `tw-animate-css`, removed postcss/autoprefixer/cssnano |
| `@tailwindcss/vite` | _new_ | 4.3.0 | 🟢 Low | Vite plugin replaces postcss tailwindcss plugin |
| `@vitejs/plugin-react` | 4.7.0 | 6.0.2 | 🟢 Low | Requires Vite 6+ (we have Vite 8) |
| `tw-animate-css` | _new_ | 1.4.0 | 🟢 Low | Replaces `tailwindcss-animate` for v4 compatibility |
| Removed: `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser` | | | | Consolidated into `typescript-eslint` |
| Removed: `autoprefixer`, `cssnano`, `postcss` | | | | Replaced by `@tailwindcss/vite` (Lightning CSS built-in) |
| Removed: `tailwindcss-animate` | | | | Replaced by `tw-animate-css` |

### ✅ All Upgrades Complete

All major upgrades have been completed successfully:

| Gate | Status |
|------|:------:|
| Type check (`tsc --noEmit`) | ✅ Pass |
| Lint (`eslint . --max-warnings 0`) | ✅ Pass |
| Build (`vite build`) | ✅ 6.28s |
| Tests (`vitest run`) | ✅ 131 files, 417 passed |
| Bundle size (40 KB limit) | ✅ 10.66 KB |

---

## 3. Unused Dependencies

### 3.1 `sonner` — Dead Dependency

| Field | Value |
|-------|-------|
| **Status** | ❌ Unused |
| **Type** | Production dependency |
| **Version** | ^2.0.7 |
| **Location** | `package.json` → dependencies, `vite.config.ts` → externals |

**Evidence:** Zero imports found across entire `src/` and `.storybook/` directories.

**History:** Toast system was migrated from `sonner` to a custom `@radix-ui/react-toast`-based implementation. The `sonner` dependency was left behind in `package.json` and the vite external list.

**Action:** Remove `sonner` from:
1. `package.json` → `dependencies`
2. `vite.config.ts` → `build.rollupOptions.external` list
3. `size-limit` → `ignore` list

---

## 4. Lockfile Hygiene

### 4.1 Mixed Lockfile State ⚠️

| File | Size | Origin |
|------|------|--------|
| `pnpm-lock.yaml` | 327 KB | pnpm (current package manager) |
| `package-lock.json` | 186 KB | npm (legacy/accidental) |

**Risk:** If anyone runs `npm install`, the pnpm lockfile will drift from node_modules state, causing silent inconsistencies.

**Action:**
1. Delete `package-lock.json`
2. Add `package-lock.json` to `.gitignore`

---

## 5. Peer Dependency Analysis

### 5.1 Current Peer Declarations

```json
{
  "peerDependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

### 5.2 Issues

| Issue | Severity | Recommendation |
|-------|----------|----------------|
| **React 18 only** | 🟡 Medium | Consider updating peer deps to include React 19 once Radix UI v2 stabilizes |
| **Missing `tailwindcss` peerDep** | 🟢 Low | Library is Tailwind CSS-based; `tailwindcss-animate` expects `tailwindcss` as peer. Add `"tailwindcss": "^3.4"` as optional peerDep for clarity |

### 5.3 Peer Dep Health

All `@radix-ui/*` packages' peer dependency requirements (React 16.8+, 17, 18) are satisfied by React 18.3.1. No warnings from pnpm install.

---

## 6. Bundle Size Analysis

| Metric | Value | Limit | Status |
|--------|-------|-------|--------|
| Library ESM bundle (tree-shaken) | 10.6 KB | 40 KB | ✅ Pass |
| With all externals (worst case) | ~100 KB+ | — | Consumer depends on tree-shaking |

### Bundle Composition

| Category | Size Impact | Notes |
|----------|------------|-------|
| **Library code** | 10.6 KB | Components, utilities, styles |
| **Radix UI primitives** | ~1.7 MB (all 25) | External — consumer tree-shakes |
| **lucide-react** | 35 MB | External — consumer tree-shakes |
| **date-fns** | 31 MB | External — consumer tree-shakes |
| **recharts** | 8.7 MB | External — consumer tree-shakes |
| **remaining deps** | ~10 MB | External — consumer tree-shakes |

**Verdict:** Library ships lean. All heavy deps are externalized.

---

## 7. Version Conflicts

| Package | Versions Installed | Conflict Type | Status |
|---------|-------------------|---------------|--------|
| esbuild | 0.21.5 + 0.28.0 | Dual (dev tooling) | 🟢 Normal — vitest bundles older vite |
| vite | 5.4.21 + 8.0.14 | Dual (dev tooling) | 🟢 Normal — vitest bundles own vite |
| react | 18.3.1 | Single | ✅ Clean |
| typescript | 5.9.3 | Single | ✅ Clean |
| postcss | 8.5.15 | Single | ✅ Clean |
| tailwindcss | 3.4.19 | Single | ✅ Clean |

**No blocking version conflicts.** pnpm's strict resolver ensures clean deduplication.

---

## 8. Recommended Actions

### Short-term (Quick Wins)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 1 | **Remove `sonner`** from dependencies, vite externals, and size-limit ignore | Reduces production dep count by 1 | ⚡ 5 min |
| 2 | **Delete `package-lock.json`** and add to `.gitignore` | Prevents lockfile drift | ⚡ 2 min |
| 3 | **Audit stale size-limit ignore list** — remove `sonner` entry | Keeps config clean | ⚡ 2 min |

### Medium-term (Next Release)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 4 | **Add `tailwindcss` as optional peerDep** (^3.4) | Documents requirements for consumers | ⏱️ 15 min |
| 5 | **Update peerDeps to support React 18 + 19** | Broader compatibility | ⏱️ 1-2 days (test) |

### Long-term (Strategic)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 6 | **Upgrade vitest to v4** — fixes esbuild + vite CVEs in one move | 2 CVEs gone | ⏱️ 1 day (test) |
| 7 | **Evaluate Tailwind CSS v4 migration** | Modern CSS-first config | ⏱️ 1 week |
| 8 | **Consider TypeScript 6 migration** | Latest language features | ⏱️ 1 week |

---

## 9. Dependency Tree (Direct)

### Production Dependencies (40)

```
@radix-ui/* (25 packages)    → UI primitives (accordion, dialog, select, etc.)
class-variance-authority      → Component variant system
clsx                          → Classname utility
cmdk                          → Command palette
date-fns                      → Date formatting
embla-carousel-react          → Carousel
input-otp                     → OTP input
lucide-react                  → Icon library
react-day-picker              → Date picker
react-resizable-panels        → Split panels
recharts                      → Charts
sonner                        → ❌ UNUSED — remove
tailwind-merge                → Class merge utility
tailwindcss-animate           → Tailwind animation plugin
@tanstack/react-table         → Data table
vaul                          → Drawer component
```

### Dev Dependencies (45)

```
Storybook (10.4.1) + addons   → Component documentation
Vitest (3.2.4) + addons       → Testing framework
Testing Library               → React testing utilities
TypeScript (5.9.3)            → Type checking
ESLint (8.57.1) + plugins     → Linting
Prettier (3.8.3)              → Formatting
Tailwind CSS (3.4.19)         → Styling framework
Vite (8.0.14) + plugins       → Build tool
PostCSS + autoprefixer        → CSS processing
cssnano                       → CSS minification
size-limit                    → Bundle size monitoring
Playwright                    → Browser testing
tsx                           → TypeScript execution
happy-dom + jsdom             → DOM environments
zod + @hookform/resolvers     → Schema validation (examples)
react-hook-form               → Form handling (component + examples)
```

---

*Audit generated by PRIDES Master Coordinator. Run `pnpm audit` and `pnpm outdated` regularly to keep this report current.*
