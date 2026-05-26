import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Kbd } from './kbd'

describe('Kbd', () => {
  it('renders children', () => {
    render(<Kbd>⌘K</Kbd>)
    expect(screen.getByText('⌘K')).toBeInTheDocument()
  })

  it('renders as kbd element', () => {
    const { container } = render(<Kbd>Ctrl</Kbd>)
    expect(container.querySelector('kbd')).toBeInTheDocument()
  })

  it('renders mod as ⌘ on Mac platform', () => {
    Object.defineProperty(navigator, 'platform', {
      value: 'MacIntel',
      configurable: true,
    })
    render(<Kbd>mod+s</Kbd>)
    expect(screen.getByText('⌘+S')).toBeInTheDocument()
  })

  it('renders mod as Ctrl on non-Mac platform', () => {
    Object.defineProperty(navigator, 'platform', {
      value: 'Win32',
      configurable: true,
    })
    render(<Kbd>mod+s</Kbd>)
    expect(screen.getByText('Ctrl+S')).toBeInTheDocument()
  })

  it('handles standalone mod without modifier', () => {
    Object.defineProperty(navigator, 'platform', {
      value: 'Win32',
      configurable: true,
    })
    render(<Kbd>mod</Kbd>)
    expect(screen.getByText('Ctrl')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<Kbd className="custom-class">⌘K</Kbd>)
    expect(container.querySelector('kbd')).toHaveClass('custom-class')
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(<Kbd ref={ref}>Esc</Kbd>)
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })

  it('sets displayName', () => {
    expect(Kbd.displayName).toBe('Kbd')
  })
})
