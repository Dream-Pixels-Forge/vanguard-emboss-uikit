# Changelog

## [0.5.1] - 2026-05-26

### Fixed (18 code quality issues)
- **CRITICAL: globals.css now delivered to consumers** — imported in library entry point (`index.ts`), added `./styles` export in package.json. Library is now usable out of the box. (ISS-0006)
- **CRITICAL: ThemeProvider exported** — now accessible from `vanguard-emboss-uikit` along with `useTheme` hook and `ThemeProviderProps` type. (ISS-0007)
- **CRITICAL: tailwindcss-animate installed** — added as dependency, registered in `tailwind.config.js` plugins, externalized in Vite config. All 77 animation classes now animate. (ISS-0008)
- **CRITICAL: InputGroupAddon side prop fixed** — `side` prop no longer leaks as unrecognized DOM attribute. Properly destructured. (ISS-0010)
- **DataTable filter null-safety** — properly guards against missing filter column; filter input hidden when no valid column exists. (ISS-0011)
- **Text/Typography duplication** — Typography marked `@deprecated` with JSDoc pointing users to the more capable `Text` component. (ISS-0012)
- **tailwind-utils.ts DRY violation fixed** — extracted shared `getShadowString()` helper, eliminating 3× duplication of shadow logic. (ISS-0013)
- **ChartTooltip/ChartLegend deprecation** — marked `@deprecated` with JSDoc guidance to use recharts primitives directly. (ISS-0014)
- **toast wrapper** — sonner's `toast` now re-exported through a typed wrapper (`ToastAPI`) isolating consumers from sonner's internal types. (ISS-0015)
- **DataTable hardcoded shadows** — replaced literal shadow strings with `getEmbossShadow('out', 'small')` utility. (ISS-0016)
- **useDirection now throws on missing provider** — matches `useSidebar` behavior instead of silently returning `'ltr'`. (ISS-0017)
- **EmbossBox deprecation** — added `@deprecated` JSDoc tag to export in `index.ts`. (ISS-0018)
- **Kbd opacity-100 removed** — redundant default opacity class. (ISS-0019)
- **Sidebar Strict Mode cookie fix** — moved cookie write to `useEffect` to avoid React 18 double-invocation. (ISS-0020)
- **form.tsx type safety** — removed `as unknown as undefined` cast; uses proper `Parameters`-based cast. (ISS-0021)
- **Combobox accessible label** — added `aria-label` to combobox trigger for screen reader support. (ISS-0022)
- **InputGroup border-radius** — added warning comment about fragile sibling selectors. (ISS-0023)

### Added
- `./styles` export in package.json — consumers can now `import 'vanguard-emboss-uikit/styles'`

### Changed
- Bundle: 122.90 KB ESM / 87.92 KB CJS (up from 116.25/83.41 due to `tailwindcss-animate` and included CSS)
- Version bumped to 0.5.1

## [0.5.0] - 2026-05-26

### Added
- 6 new components reaching 57 total: Toast, Tooltip, Popover, Accordion, DropdownMenu, various Radix wrappers

## [0.4.0] - 2026-05-26

### Added
- **ScrollArea** — `@radix-ui/react-scroll-area` wrapper with custom scrollbar, vertical/horizontal orientation
- **Drawer** — `vaul` mobile-first bottom drawer with overlay, drag handle, header/footer layout
- **ContextMenu** — `@radix-ui/react-context-menu` wrapper with full sub-component API (items, checkboxes, radio, separator, shortcut, sub-menu)
- **Form** — `react-hook-form` + zod wrapper with `FormField`/`FormItem`/`FormLabel`/`FormControl`/`FormDescription`/`FormMessage` context-based validation
- Stories and tests for all 4 new components (51 total components, 201 unit tests)
- Registry entries for all 4 components

### Changed
- Bundle: 116.25 KB ESM / 83.41 KB CJS (up from 105.47/75.49 due to 4 new components)
- Externalized 5 new peer deps: `@radix-ui/react-scroll-area`, `vaul`, `@radix-ui/react-context-menu`, `react-hook-form`, `@hookform/resolvers`

## [0.3.0] - 2026-05-26

### Added
- **Progress** — Embossed track with recessed shadow, raised accent fill, spring animation, 3 sizes
- **Skeleton** — Loading placeholder with 3 variants (text/circle/card), embossed recessed shimmer
- **Avatar** — Image avatar with embossed raised ring, fallback initials, 3 sizes
- **Sheet** — Slide-over drawer (top/bottom/left/right), Radix Dialog-backed with backdrop blur
- **ToggleGroup** — Segmented control with pressed/recessed state, single and multiple selection
- **Collapsible** — Expand/collapse section with embossed trigger, animated content
- **TiltCard** — Flagship 3D perspective tilt card with mouse-follow, glare overlay, spring reset
- **ProgressCircle** — SVG circular progress with spring arc animation, sibling to Knob
- Stories and tests for all 8 new components (27 total components, 147 unit tests)

### Changed
- Bundle: 57.42 KB ESM / 41.00 KB CJS (up from 44.76/32.65 due to 8 new components)

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
