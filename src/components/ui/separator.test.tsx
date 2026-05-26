import { render } from '@testing-library/react'
import * as UI from './index'
import { describe, it, expect } from 'vitest'

describe('Separator', () => {
  it('renders as hr element', () => {
    const { container } = render(<UI.Separator />)
    const hr = container.querySelector('hr')
    expect(hr).toBeInTheDocument()
  })

  it('renders with horizontal orientation by default', () => {
    const { container } = render(<UI.Separator />)
    const hr = container.querySelector('hr')
    expect(hr).toHaveClass('h-[1px]')
    expect(hr).toHaveClass('w-full')
  })

  it('renders with vertical orientation', () => {
    const { container } = render(<UI.Separator orientation="vertical" />)
    const hr = container.querySelector('hr')
    expect(hr).toHaveClass('h-full')
    expect(hr).toHaveClass('w-[1px]')
  })

  it('applies emboss decorative class', () => {
    const { container } = render(<UI.Separator />)
    const hr = container.querySelector('hr')
    expect(hr).toHaveClass('bg-emboss-shadow-light/30')
  })

  it('sets aria-orientation for vertical', () => {
    const { container } = render(<UI.Separator orientation="vertical" />)
    const hr = container.querySelector('hr')
    expect(hr).toHaveAttribute('aria-orientation', 'vertical')
  })
})
