export const shadows = {
  light: {
    out: {
      standard: '9px 9px 16px rgb(203, 210, 219), -9px -9px 16px rgb(255, 255, 255)',
      small: '4px 4px 8px rgb(203, 210, 219), -4px -4px 8px rgb(255, 255, 255)',
    },
    in: {
      standard: 'inset 6px 6px 10px rgb(203, 210, 219), inset -6px -6px 10px rgb(255, 255, 255)',
      small: 'inset 3px 3px 6px rgb(203, 210, 219), inset -3px -3px 6px rgb(255, 255, 255)',
    },
  },
  
  dark: {
    out: {
      standard: '9px 9px 16px rgb(19, 23, 28), -9px -9px 16px rgb(53, 61, 74)',
      small: '4px 4px 8px rgb(19, 23, 28), -4px -4px 8px rgb(53, 61, 74)',
    },
    in: {
      standard: 'inset 6px 6px 10px rgb(19, 23, 28), inset -6px -6px 10px rgb(53, 61, 74)',
      small: 'inset 3px 3px 6px rgb(19, 23, 28), inset -3px -3px 6px rgb(53, 61, 74)',
    },
  },
} as const

export type ShadowTheme = keyof typeof shadows
export type ShadowType = 'out' | 'in'
export type ShadowSize = 'standard' | 'small'
