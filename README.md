# Vanguard Emboss UI Kit

<img width="1920" height="1080" alt="Screenshot from 2026-05-26 12-19-02" src="https://github.com/user-attachments/assets/7784487f-cb66-4385-bc12-1e6c56400f9a" />


[![npm version](https://badge.fury.io/js/vanguard-emboss-uikit.svg)](https://badge.fury.io/js/vanguard-emboss-uikit)
[![CI](https://github.com/Dream-Pixels-Forge/vanguard-emboss-uikit/actions/workflows/ci.yml/badge.svg)](https://github.com/Dream-Pixels-Forge/vanguard-emboss-uikit/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Premium neumorphic (soft UI) React component library. Components appear seamlessly extruded from or recessed into the canvas using a simulated 45° top-left light source. Built with Radix UI primitives for accessibility and Tailwind CSS for styling.

## Install

```bash
pnpm add vanguard-emboss-uikit
# or
npm install vanguard-emboss-uikit
```

## Quick Start

```tsx
import { Button, Card, ThemeProvider } from 'vanguard-emboss-uikit'
import 'vanguard-emboss-uikit/styles'  // required

function App() {
  return (
    <ThemeProvider>
      <Card>
        <h2 className="text-xl font-semibold mb-4">Hello, Vanguard</h2>
        <Button variant="accent">Get Started</Button>
      </Card>
    </ThemeProvider>
  )
}
```

Wrap your app with `ThemeProvider` to enable light/dark theme switching. The provider detects system preference and persists choice to localStorage.

## Components

### Layout
| Component | Description |
|-----------|-------------|
| `Box` | Foundation container with raised/recessed emboss effects |
| `Card` | Content container with header, title, description, content, footer |
| `EmbossBox` | Legacy container (deprecated — use `Box` instead) |

### Typography
| Component | Description |
|-----------|-------------|
| `Text` | Multi-variant text with heading levels, weights, muted, and accent colors |

### Interactive
| Component | Radix Primitive | Description |
|-----------|-----------------|-------------|
| `Button` | — | 5 variants (default, accent, outline, ghost, link), 3 sizes, loading state |
| `Badge` | — | Status indicator with 5 variants and 3 sizes |
| `Switch` | `@radix-ui/react-switch` | Binary toggle with recessed track and raised thumb |
| `Slider` | `@radix-ui/react-slider` | Range input with embossed track and raised thumb |
| `Checkbox` | `@radix-ui/react-checkbox` | Checkbox with recessed unchecked and raised checked states |
| `Radio` | `@radix-ui/react-radio-group` | Radio button with emboss styling |
| `Tabs` | `@radix-ui/react-tabs` | Tab navigation with active state switching between recessed/raised |

### Form
| Component | Description |
|-----------|-------------|
| `Input` | Text input with recessed emboss styling, error state with `aria-invalid` |
| `Textarea` | Multi-line input, optional `resizable` prop |
| `Select` | Dropdown with embossed trigger and raised dropdown content |
| `Label` | Form label with `required` prop and `aria-required` |
| `Slider` | Range slider with recessed track and raised thumb |

### Navigation
| Component | Radix Primitive | Description |
|-----------|-----------------|-------------|
| `NavigationMenu` | `@radix-ui/react-navigation-menu` | Site navigation with dropdown content and viewport |
| `Breadcrumb` | — | Flat navigation hierarchy with active page indicator |
| `Tabs` | `@radix-ui/react-tabs` | Tab-based navigation |

### Feedback
| Component | Description |
|-----------|-------------|
| `Alert` | Status messages with 5 variants (default, destructive, success, warning, info), optional title and dismiss |
| `Dialog` | Modal dialog with overlay, animated content, optional close button, `asChild` trigger |

## Design Principles

### 45° Light Source
All components follow a strict lighting model with a virtual light from the top-left:
- **Raised elements**: Light top-left shadow + dark bottom-right shadow
- **Recessed elements**: Dark inner top-left shadow + light inner bottom-right shadow

### Background Matching Rule
Every component's background must match its parent container:
- **Light**: `#eceef1` (210, 20%, 94%)
- **Dark**: `#282e38` (215, 15%, 18%)

### Theme
Light/dark switching via `ThemeProvider`. Components use the `dark:` Tailwind prefix and CSS custom properties for seamless transitions.

## Tailwind Config

Your project needs the emboss shadow utilities. Copy these into your `tailwind.config.js`:

```js
// tailwind.config.js
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'emboss-bg-light': '#eceef1',
        'emboss-highlight-light': '#ffffff',
        'emboss-shadow-light': '#cbd2db',
        'emboss-bg-dark': '#282e38',
        'emboss-highlight-dark': '#353d4a',
        'emboss-shadow-dark': '#13171c',
        'emboss-accent-blue': '#3b82f6',
        'emboss-accent-orange': '#f97316',
        'emboss-accent-green': '#10b981',
      },
      boxShadow: {
        'emboss-out-light': '9px 9px 16px rgb(203,210,219), -9px -9px 16px rgb(255,255,255)',
        'emboss-out-light-sm': '4px 4px 8px rgb(203,210,219), -4px -4px 8px rgb(255,255,255)',
        'emboss-in-light': 'inset 6px 6px 10px rgb(203,210,219), inset -6px -6px 10px rgb(255,255,255)',
        'emboss-in-light-sm': 'inset 3px 3px 6px rgb(203,210,219), inset -3px -3px 6px rgb(255,255,255)',
        'emboss-out-dark': '9px 9px 16px rgb(19,23,28), -9px -9px 16px rgb(53,61,74)',
        'emboss-out-dark-sm': '4px 4px 8px rgb(19,23,28), -4px -4px 8px rgb(53,61,74)',
        'emboss-in-dark': 'inset 6px 6px 10px rgb(19,23,28), inset -6px -6px 10px rgb(53,61,74)',
        'emboss-in-dark-sm': 'inset 3px 3px 6px rgb(19,23,28), inset -3px -3px 6px rgb(53,61,74)',
      },
      borderRadius: {
        lg: '1.5rem',
        md: 'calc(1.5rem - 2px)',
        sm: 'calc(1.5rem - 4px)',
      },
    },
  },
}
```

Also import the globals CSS in your app:

```css
@import 'vanguard-emboss-uikit/styles';
```

## Development

```bash
pnpm install
pnpm dev        # Start dev server
pnpm build      # Build library (ESM + CJS + types)
pnpm type-check # Run TypeScript check
pnpm lint       # Run ESLint
```

## License

MIT

## Built With

This project was crafted using [Dream Pixels Forge (DPF)](https://github.com/Dream-Pixels-Forge) tools:
- **[dpf-publisher-engineer](https://github.com/Dream-Pixels-Forge/dpf-publisher-engineer)** — Release automation, CI/CD publishing, and distribution
- **[dpf-senior-software-engineer](https://github.com/Dream-Pixels-Forge/dpf-senior-software-engineer)** — Code review, refactoring, and architecture design
- **[review-inspector](https://github.com/Dream-Pixels-Forge/review-inspector)** — Deep code inspection and quality assurance
