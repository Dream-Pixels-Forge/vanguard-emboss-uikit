# Deploy Phase — vanguard-emboss-uikit v0.5.1

## Project State
- Version: 0.5.1 (bumped from 0.5.0)
- npm package: `vanguard-emboss-uikit`
- Registry: npmjs.org (public)
- 57 components, 397 tests across 66 test files
- Build: TypeScript + Vite, passes cleanly
- Bundle: 123.15 KB ESM / 88.11 KB CJS
- Size limit: 40 KB (gzip)

## What's Changed Since Last Publish (0.5.0)
- globals.css now included in library entry point
- Added `./styles` export in package.json
- tailwindcss-animate plugin installed and configured
- All 18 code quality issues fixed (see CHANGELOG)
- ThemeProvider/useTheme exported from library entry
- toast wrapper isolates consumers from sonner types
- Deprecations: Typography, ChartTooltip/ChartLegend, EmbossBox

## Deployment Checklist
1. Verify package.json is correct (main, module, types, exports, peerDeps)
2. Verify size-limit config is accurate
3. Verify README is up to date
4. Verify npm publish readiness (dry-run)
5. Verify all peer deps are properly externalized
6. Verify the built dist/ directory contains all expected files

## Peer Dependencies (all in external list)
- react, react-dom, react-resizable-panels, vaul, sonner, recharts, 
  @radix-ui/* (many), @hookform/resolvers, react-hook-form,
  zod, lucide-react, tailwindcss-animate, tailwind-merge,
  clsx, embla-carousel-react, react-day-picker, input-otp,
  @tanstack/react-table, next-themes, @types/react

## Commands
- pnpm build (already verified)
- pnpm test (already verified)
- pnpm size (size-limit check)

Note: This package is already published on npm. The deploy agent should verify readiness for the v0.5.1 release.
