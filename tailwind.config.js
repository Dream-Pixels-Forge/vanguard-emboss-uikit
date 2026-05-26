/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Emboss Design Tokens
        'emboss-bg-light': '#eceef1',
        'emboss-highlight-light': '#ffffff',
        'emboss-shadow-light': '#cbd2db',
        'emboss-bg-dark': '#282e38',
        'emboss-highlight-dark': '#353d4a',
        'emboss-shadow-dark': '#13171c',
        
        // Accent Colors
        'emboss-accent-blue': '#3b82f6',
        'emboss-accent-orange': '#f97316',
        'emboss-accent-green': '#10b981',
        
        // Shadcn/ui Semantic Colors (Light Theme)
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        popover: 'hsl(var(--popover))',
        'popover-foreground': 'hsl(var(--popover-foreground))',
        primary: 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        secondary: 'hsl(var(--secondary))',
        'secondary-foreground': 'hsl(var(--secondary-foreground))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        accent: 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))',
        destructive: 'hsl(var(--destructive))',
        'destructive-foreground': 'hsl(var(--destructive-foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        // --- Light Theme (Clay) Shadows ---
        /* Standard Raised Element */
        'emboss-out-light': '9px 9px 16px rgb(203, 210, 219), -9px -9px 16px rgb(255, 255, 255)',
        /* Micro Raised Element (Toggles, Sliders, Knobs) */
        'emboss-out-light-sm': '4px 4px 8px rgb(203, 210, 219), -4px -4px 8px rgb(255, 255, 255)',
        /* Deep Carved Recess (Input tracks, wells) */
        'emboss-in-light': 'inset 6px 6px 10px rgb(203, 210, 219), inset -6px -6px 10px rgb(255, 255, 255)',
        /* Micro Recessed Element */
        'emboss-in-light-sm': 'inset 3px 3px 6px rgb(203, 210, 219), inset -3px -3px 6px rgb(255, 255, 255)',

        // --- Dark Theme (Slate) Shadows ---
        /* Standard Raised Element */
        'emboss-out-dark': '9px 9px 16px rgb(19, 23, 28), -9px -9px 16px rgb(53, 61, 74)',
        /* Micro Raised Element */
        'emboss-out-dark-sm': '4px 4px 8px rgb(19, 23, 28), -4px -4px 8px rgb(53, 61, 74)',
        /* Deep Carved Recess */
        'emboss-in-dark': 'inset 6px 6px 10px rgb(19, 23, 28), inset -6px -6px 10px rgb(53, 61, 74)',
        /* Micro Recessed Element */
        'emboss-in-dark-sm': 'inset 3px 3px 6px rgb(19, 23, 28), inset -3px -3px 6px rgb(53, 61, 74)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}