import { render } from '@testing-library/react'
import * as UI from './index'
import { describe, it, expect } from 'vitest'
import { Skeleton } from './skeleton'

describe('Skeleton', () => {
  it('renders text variant', () => {
    const { container } = render(<Skeleton variant="text" />)
    const el = container.firstChild as HTMLElement
    expect(el.className).toContain('animate-pulse')
  })

  it('renders circle variant', () => {
    const { container } = render(<Skeleton variant="circle" className="h-12 w-12" />)
    const el = container.firstChild as HTMLElement
    expect(el.className).toContain('rounded-full')
  })

  it('renders card variant', () => {
    const { container } = render(<Skeleton variant="card" />)
    const el = container.firstChild as HTMLElement
    expect(el.className).toContain('rounded-xl')
  })

  it('is exported from index', () => {
    expect(UI.Skeleton).toBeDefined()
  })
})
