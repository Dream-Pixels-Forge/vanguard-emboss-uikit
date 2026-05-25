import { describe, it, expect } from 'vitest'
import {
  getEmbossShadow,
  withActiveShadow,
  withDataStateShadow,
  getEmbossBackground,
  getEmbossBorder,
  getAccentColor,
} from './tailwind-utils'

describe('getEmbossShadow', () => {
  it('returns out standard shadow', () => {
    const result = getEmbossShadow('out', 'standard')
    expect(result).toBe('shadow-emboss-out-light dark:shadow-emboss-out-dark')
  })

  it('returns out small shadow', () => {
    const result = getEmbossShadow('out', 'small')
    expect(result).toBe('shadow-emboss-out-light-sm dark:shadow-emboss-out-dark-sm')
  })

  it('returns in standard shadow', () => {
    const result = getEmbossShadow('in', 'standard')
    expect(result).toBe('shadow-emboss-in-light dark:shadow-emboss-in-dark')
  })

  it('returns in small shadow', () => {
    const result = getEmbossShadow('in', 'small')
    expect(result).toBe('shadow-emboss-in-light-sm dark:shadow-emboss-in-dark-sm')
  })

  it('defaults to standard size', () => {
    const result = getEmbossShadow('out')
    expect(result).toBe('shadow-emboss-out-light dark:shadow-emboss-out-dark')
  })
})

describe('withActiveShadow', () => {
  it('includes base shadow and active: variant', () => {
    const result = withActiveShadow('out', 'small')
    expect(result).toContain('shadow-emboss-out-light-sm')
    expect(result).toContain('active:shadow-emboss-in-light-sm')
  })

  it('swaps out to in on active', () => {
    const result = withActiveShadow('out')
    expect(result).toContain('shadow-emboss-out-light')
    expect(result).toContain('active:shadow-emboss-in-light')
  })

  it('swaps in to out on active', () => {
    const result = withActiveShadow('in')
    expect(result).toContain('shadow-emboss-in-light')
    expect(result).toContain('active:shadow-emboss-out-light')
  })
})

describe('withDataStateShadow', () => {
  it('includes data-state variant', () => {
    const result = withDataStateShadow('data-[state=active]', 'out', 'small')
    expect(result).toContain('shadow-emboss-out-light-sm')
    expect(result).toContain('data-[state=active]:shadow-emboss-in-light-sm')
  })
})

describe('getEmbossBackground', () => {
  it('returns emboss background classes', () => {
    expect(getEmbossBackground()).toBe('bg-emboss-bg-light dark:bg-emboss-bg-dark')
  })
})

describe('getEmbossBorder', () => {
  it('returns emboss border classes', () => {
    expect(getEmbossBorder()).toBe('border-emboss-shadow-light/30 dark:border-emboss-shadow-dark/30')
  })
})

describe('getAccentColor', () => {
  it('returns blue accent tokens', () => {
    const result = getAccentColor('blue')
    expect(result).toEqual({
      text: 'text-emboss-accent-blue',
      bg: 'bg-emboss-accent-blue',
      border: 'border-emboss-accent-blue',
      ring: 'ring-emboss-accent-blue',
    })
  })

  it('returns orange accent tokens', () => {
    const result = getAccentColor('orange')
    expect(result.bg).toBe('bg-emboss-accent-orange')
  })

  it('returns green accent tokens', () => {
    const result = getAccentColor('green')
    expect(result.text).toBe('text-emboss-accent-green')
  })
})
