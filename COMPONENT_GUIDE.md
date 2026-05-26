# Component Authoring Guide

> A living document for contributors. Follow these patterns to keep the component API consistent.

## Component Architecture

- Every component goes in `src/components/ui/<name>.tsx`
- Use **named exports**, never default exports
- One file per component; compound sub-components live in the same file

## Props Pattern

| Wrapping | Props type |
|----------|-----------|
| Radix primitive | `extends React.ComponentPropsWithoutRef<typeof Primitive.Root>` |
| Native element | `extends React.InputHTMLAttributes<HTMLInputElement>` (or appropriate element) |
| Generic div | `React.HTMLAttributes<HTMLDivElement>` |

Common extras:

```ts
error?: boolean        // aria-invalid forwarding
loading?: boolean      // spinner + disabled
asChild?: boolean      // Radix Slot forwarding
```

## Refs

- **ALL** interactive components MUST use `React.forwardRef`
- Use a named function inside `forwardRef` for better stack traces:

```ts
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ className, variant, size, ...props }, ref) {
    return <button ref={ref} className={...} {...props} />
  }
)
```

- Always add `displayName`:

```ts
Button.displayName = 'Button'
```

See `Button` for the reference implementation.

## Styling

- Use `cn()` from `../../lib/utils` for className merging
- Use `getEmbossBackground()`, `getEmbossShadow()`, `withActiveShadow()`, `getEmbossBorder()` from `../../lib/tailwind-utils`
- Use Tailwind utility classes only; no CSS modules or styled-components
- Use theme tokens: `text-foreground`, `bg-background`, `text-muted-foreground`, etc.

## Emboss Utility Functions

| Function | Purpose |
|----------|---------|
| `getEmbossBackground()` | Recessed bg for inputs/tracks |
| `getEmbossShadow('out', 'size')` | Raised element shadow |
| `getEmbossShadow('in', 'size')` | Recessed/carved element shadow |
| `withActiveShadow('out', 'size')` | Shadow that flips on `:active` |
| `withDataStateShadow('data-[state=checked]', 'out', 'size')` | Shadow that flips on Radix data-state |
| `getEmbossBorder()` | Subtle border for disabled states |

Available sizes: `'small'`, `'standard'` (default).

## Variants

Use `cva` from `class-variance-authority` for multi-variant components (see `Button`):

```ts
const buttonVariants = cva('base classes', {
  variants: {
    variant: { default: '...', accent: '...' },
    size: { sm: '...', md: '...', lg: '...' },
  },
  defaultVariants: { variant: 'default', size: 'md' },
})
```

## Compound Components

Group related sub-components in one file. Export all as named exports.

```ts
export function Dialog({ ...props }: DialogProps) { ... }
export function DialogTrigger({ ...props }: DialogTriggerProps) { ... }
export function DialogContent({ ...props }: DialogContentProps) { ... }
```

Example files: `dialog.tsx`, `select.tsx`, `dropdown-menu.tsx`, `drawer.tsx`.

## Testing

- Tests go in `components.test.tsx` (legacy) or `<name>.test.tsx` (preferred for new)
- Use `@testing-library/react` and `@testing-library/user-event`
- Standard coverage: renders, props, error state, disabled state, accessibility

```ts
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
```

## Barrel Exports

Every new component must be added to `src/components/ui/index.ts`. Export both the component(s) and their props types.

The barrel file can be auto-generated via:

```sh
pnpm tsx scripts/generate-barrel.ts
```

## Import path convention

Components import from `../../lib/utils` and `../../lib/tailwind-utils`. Tests import directly from `./component-name`.
