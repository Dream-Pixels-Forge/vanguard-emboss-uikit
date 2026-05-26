import { render, screen } from '@testing-library/react'
import * as UI from './index'
import { describe, it, expect } from 'vitest'
import { Progress } from './progress'

describe('Progress', () => {
  it('renders with value', () => {
    render(<Progress value={60} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('applies size classes', () => {
    const { container } = render(<Progress value={50} size="lg" />)
    const root = container.firstChild as HTMLElement
    expect(root.className).toContain('h-4')
  })

  it('renders with 0 value', () => {
    render(<Progress value={0} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.Progress).toBeDefined()
  })
})
