// Vanguard Emboss Color Tokens
// Strictly follows the 45° light source and background matching rules

export const colors = {
  // Light Theme (Soft Clay)
  light: {
    background: '#eceef1', // HSL: 210, 20%, 94%
    highlight: '#ffffff',  // Pure white light source reflection
    shadow: '#cbd2db',     // HSL: 210, 16%, 80% - Soft volumetric shadow
    
    // Accent Colors
    accent: {
      blue: '#3b82f6',     // Active blue track/dial glow
      orange: '#f97316',   // "Correct" active orange glow
      green: '#10b981',    // Success green
    },
  },
  
  // Dark Theme (Polished Slate)
  dark: {
    background: '#282e38', // HSL: 215, 15%, 18%
    highlight: '#353d4a',  // HSL: 215, 15%, 24% - Subtle upper-left edge glow
    shadow: '#13171c',     // HSL: 215, 25%, 10% - Heavy structural shadow
    
    // Accent Colors (same as light for consistency)
    accent: {
      blue: '#3b82f6',
      orange: '#f97316',
      green: '#10b981',
    },
  },
} as const

export type ColorTheme = keyof typeof colors
export type ColorToken = typeof colors.light | typeof colors.dark