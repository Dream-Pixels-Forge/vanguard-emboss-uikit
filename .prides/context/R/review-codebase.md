# Vanguard Emboss UI Kit — Review Context

## Project Overview
A neumorphic (soft UI) React component library built with:
- React 18 + TypeScript
- Tailwind CSS v3
- Radix UI primitives (checkbox, dialog, select, slider, switch, tabs, navigation-menu, radio-group)
- CVA (class-variance-authority) for variant management
- Lucide React icons
- Vite build tool

## Design Concept
45° top-left light source neumorphism. Light theme uses "Soft Clay" (#eceef1), dark uses "Polished Slate" (#282e38). Dual-shadow technique for raised/recessed illusion.

## Codebase Structure
- `src/tokens/` — colors, shadows, spacing, typography design tokens
- `src/components/ui/` — 18 components with index.ts barrel export
- `src/lib/` — utils (cn), tailwind-utils (theme-aware shadow/bg helpers)
- `src/providers/` — theme-provider with localStorage + system preference
- `src/styles/` — globals.css with CSS custom properties

## Issues Identified
1. tailwind-utils.ts imports useTheme but doesn't use it in helpers; dead hook exports
2. Text component has fragile weight logic using string-inspection of Tailwind classes
3. Several components hardcode shadow strings instead of using getEmbossShadow()
4. Breadcrumb over-embosses every crumb item
5. Textarea has resize-none hardcoded
6. DialogTrigger is overly opinionated styling
7. EmbossBox flagged as legacy but still exported
8. Alert dismiss icon conflicts with destructive variant icon
9. No npm distribution config (private: true, no exports)
10. No tests or Storybook
11. Stale tsconfig build artifacts committed

## Files Checked
- All 18 components in src/components/ui/
- tailwind.config.js, globals.css
- All token files
- lib/utils.ts, lib/tailwind-utils.ts
- providers/theme-provider.tsx
- App.tsx, package.json
