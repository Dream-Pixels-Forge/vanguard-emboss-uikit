import { render, screen } from '@testing-library/react'
import * as UI from './index'
import { describe, it, expect } from 'vitest'

describe('Direction', () => {
  it('renders children', () => {
    render(<UI.DirectionProvider>Content</UI.DirectionProvider>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('useDirection throws when no DirectionProvider is present', () => {
    function TestComponent() {
      const dir = UI.useDirection()
      return <span data-testid="dir">{dir}</span>
    }
    expect(() => render(<TestComponent />)).toThrow(
      'useDirection must be used within a DirectionProvider'
    )
  })

  it('useDirection returns rtl when wrapped in DirectionProvider with dir="rtl"', () => {
    function TestComponent() {
      const dir = UI.useDirection()
      return <span data-testid="dir">{dir}</span>
    }
    render(
      <UI.DirectionProvider dir="rtl">
        <TestComponent />
      </UI.DirectionProvider>
    )
    expect(screen.getByTestId('dir')).toHaveTextContent('rtl')
  })

  it('exports from index', () => {
    expect(UI.DirectionProvider).toBeDefined()
    expect(UI.useDirection).toBeDefined()
  })
})
