export { cn } from "./utils"

/** Shared shadow string lookup — single source of truth for all 8 shadow values */
function getShadowString(type: 'out' | 'in', size: 'standard' | 'small'): string {
  if (type === 'out') {
    return size === 'standard'
      ? 'shadow-emboss-out-light dark:shadow-emboss-out-dark'
      : 'shadow-emboss-out-light-sm dark:shadow-emboss-out-dark-sm'
  }
  return size === 'standard'
    ? 'shadow-emboss-in-light dark:shadow-emboss-in-dark'
    : 'shadow-emboss-in-light-sm dark:shadow-emboss-in-dark-sm'
}

/** Returns the opposite shadow type (out ↔ in) for active/pressed states */
function oppositeShadow(type: 'out' | 'in'): 'out' | 'in' {
  return type === 'out' ? 'in' : 'out'
}

export function getEmbossShadow(type: 'out' | 'in', size: 'standard' | 'small' = 'standard'): string {
  return getShadowString(type, size)
}

export function withActiveShadow(type: 'out' | 'in', size: 'standard' | 'small' = 'standard'): string {
  const shadow = getShadowString(type, size)
  const activeShadow = getShadowString(oppositeShadow(type), size)
  return `${shadow} active:${activeShadow.replace(/ /g, ' active:')}`
}

export function withDataStateShadow(state: string, type: 'out' | 'in', size: 'standard' | 'small' = 'standard'): string {
  const shadow = getShadowString(type, size)
  const dataShadow = getShadowString(oppositeShadow(type), size)
  return `${shadow} ${state}:${dataShadow.replace(/ /g, ` ${state}:`)}`
}

export function getEmbossBackground(): string {
  return 'bg-emboss-bg-light dark:bg-emboss-bg-dark'
}

export function getEmbossBorder(): string {
  return 'border-emboss-shadow-light/30 dark:border-emboss-shadow-dark/30'
}

export function getAccentColor(color: 'blue' | 'orange' | 'green') {
  const base = `emboss-accent-${color}`
  return {
    text: `text-${base}`,
    bg: `bg-${base}`,
    border: `border-${base}`,
    ring: `ring-${base}`,
  }
}
