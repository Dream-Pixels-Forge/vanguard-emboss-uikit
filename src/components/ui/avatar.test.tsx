import { render, screen } from '@testing-library/react'
import * as UI from './index'
import { describe, it, expect } from 'vitest'
import { Avatar } from './avatar'

describe('Avatar', () => {
  it('renders fallback when no image', () => {
    render(<Avatar fallback="AK" />)
    expect(screen.getByText('AK')).toBeInTheDocument()
  })

  it('renders with image (shows container)', () => {
    const { container } = render(<Avatar src="https://example.com/avatar.png" alt="User" fallback="AK" />)
    const root = container.firstChild as HTMLElement
    expect(root.className).toContain('rounded-full')
  })

  it('applies size classes', () => {
    const { container } = render(<Avatar size="lg" fallback="L" />)
    const root = container.firstChild as HTMLElement
    expect(root.className).toContain('h-14')
  })

  it('is exported from index', () => {
    expect(UI.Avatar).toBeDefined()
  })
})
