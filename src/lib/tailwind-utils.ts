export { cn } from "./utils"

export function getEmbossShadow(type: 'out' | 'in', size: 'standard' | 'small' = 'standard'): string {
  if (type === 'out') {
    return size === 'standard' 
      ? 'shadow-emboss-out-light dark:shadow-emboss-out-dark'
      : 'shadow-emboss-out-light-sm dark:shadow-emboss-out-dark-sm'
  } else {
    return size === 'standard'
      ? 'shadow-emboss-in-light dark:shadow-emboss-in-dark'
      : 'shadow-emboss-in-light-sm dark:shadow-emboss-in-dark-sm'
  }
}

export function withActiveShadow(type: 'out' | 'in', size: 'standard' | 'small' = 'standard'): string {
  const shadow = type === 'out'
    ? (size === 'standard' ? 'shadow-emboss-out-light dark:shadow-emboss-out-dark' : 'shadow-emboss-out-light-sm dark:shadow-emboss-out-dark-sm')
    : (size === 'standard' ? 'shadow-emboss-in-light dark:shadow-emboss-in-dark' : 'shadow-emboss-in-light-sm dark:shadow-emboss-in-dark-sm')
  const activeShadow = type === 'out'
    ? (size === 'standard' ? 'shadow-emboss-in-light dark:shadow-emboss-in-dark' : 'shadow-emboss-in-light-sm dark:shadow-emboss-in-dark-sm')
    : (size === 'standard' ? 'shadow-emboss-out-light dark:shadow-emboss-out-dark' : 'shadow-emboss-out-light-sm dark:shadow-emboss-out-dark-sm')
  return `${shadow} active:${activeShadow.replace(/ /g, ' active:')}`
}

export function withDataStateShadow(state: string, type: 'out' | 'in', size: 'standard' | 'small' = 'standard'): string {
  const shadow = type === 'out'
    ? (size === 'standard' ? 'shadow-emboss-out-light dark:shadow-emboss-out-dark' : 'shadow-emboss-out-light-sm dark:shadow-emboss-out-dark-sm')
    : (size === 'standard' ? 'shadow-emboss-in-light dark:shadow-emboss-in-dark' : 'shadow-emboss-in-light-sm dark:shadow-emboss-in-dark-sm')
  const dataShadow = type === 'out'
    ? (size === 'standard' ? 'shadow-emboss-in-light dark:shadow-emboss-in-dark' : 'shadow-emboss-in-light-sm dark:shadow-emboss-in-dark-sm')
    : (size === 'standard' ? 'shadow-emboss-out-light dark:shadow-emboss-out-dark' : 'shadow-emboss-out-light-sm dark:shadow-emboss-out-dark-sm')
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
