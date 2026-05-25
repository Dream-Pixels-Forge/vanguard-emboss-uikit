# Changelog

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
