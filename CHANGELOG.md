# Changelog

## [0.2.1] - 2026-05-26

### Fixed
- Bundle size bloat: 6 packages missing from `vite.config.ts` externals (`@radix-ui/react-accordion`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-popover`, `@radix-ui/react-slot`, `@radix-ui/react-tooltip`, `sonner`) causing 230 KB ESM bundle instead of ~34 KB. Published bundle size restored to expected size.
- `react` and `react-dom` moved from `dependencies` to `peerDependencies` to prevent duplicate React instances for consumers.
- Release workflow now runs type-check, lint, test, and size checks before publishing.
- Duplicate `@layer base` blocks in `globals.css` merged into a single block.
- Added `.prettierrc` and `.editorconfig` for consistent code formatting.

### Added
- Tests: Separator component (orientation, emboss class), Tooltip (styling, delay), Toast (duration, rendering).
- Prettier as devDependency with configuration.

## [0.2.0] - 2026-05-26

### Added
- Storybook 10 with 18 CSF3 component stories (themes, a11y, docs, vitest addons)
- Knob/Dial rotary component (mouse drag, keyboard, ARIA slider, 3 sizes)
- Polymorphic `asChild` support for Button, Badge, Box (via `@radix-ui/react-slot`)
- Separator component (previously missing)
- Popover, Accordion, DropdownMenu (15 sub-components), Tooltip, Toast/Sonner wrapper
- MIT LICENSE with Dream Pixels Forge copyright
- Bundle size CI check (size-limit, 35 KB ESM limit)
- React Hook Form integration example with zod validation
- Spring-like press physics utilities in `globals.css`
- CSS custom property theming documentation

### Changed
- All components use `React.forwardRef` for Slot compatibility
- Bundle size ignore list updated for all peer deps

### Infrastructure
- CI: type-check, build, lint, test, size-limit, build-storybook
- Release: GitHub Release + npm publish on `v*` tags (NPM_TOKEN configured)
- Storybook addon-mcp for agentic control
- Added Storybook addon-vitest integration

## [0.1.0] - 2026-05-25

### Added
- 18 neumorphic UI components built with React + Radix + Tailwind
  - Layout: Box, Card, EmbossBox
  - Typography: Text
  - Interactive: Button, Badge, Switch, Slider, Checkbox, Radio, Tabs
  - Form: Input, Textarea, Select, Label
  - Navigation: NavigationMenu, Breadcrumb
  - Feedback: Alert, Dialog
- Design tokens system (colors, shadows, spacing, typography)
- Light/dark theme provider with localStorage persistence and system preference detection
- Tailwind CSS configuration with emboss shadow utilities
- Library distribution (ESM + CJS + TypeScript declarations)
- Theme-aware utility functions (getEmbossShadow, getEmbossBackground, getEmbossBorder, getAccentColor)

### Accessibility
- `aria-invalid` on all error-prop components (Input, Textarea, Select, Checkbox, Radio, Switch)
- `aria-required` on Label component

### Fixed
- Hardcoded shadow strings replaced with utility functions (withActiveShadow, withDataStateShadow)
- Border opacity standardized to /30 across all components
- DialogTrigger now supports Radix `asChild` pattern
- Alert dismiss icon changed from XCircle to X to avoid icon conflict
- Textarea `resizable` prop added (default: false)
- Breadcrumb simplified with flat styling instead of heavy emboss on every crumb
- Text component weight logic refactored to explicit config map
- EmbossBox marked as `@deprecated` — use Box instead
- Dead `useTheme` import and unused hook wrappers removed from tailwind-utils.ts
- Dead `getShadow()` / `getSpacing()` helpers removed from token files
- ESLint config added
- .gitignore added for build artifacts
