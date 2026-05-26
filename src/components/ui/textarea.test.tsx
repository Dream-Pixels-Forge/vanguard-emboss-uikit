import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Textarea } from './textarea'

describe('Textarea', () => {
  it('renders textarea', () => {
    render(<Textarea placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('applies error styles', () => {
    const { container } = render(<Textarea error />)
    expect(container.firstChild).toHaveClass('ring-red-500')
  })

  it('sets aria-invalid when error is true', () => {
    render(<Textarea error />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('is resizable when resizable prop is true', () => {
    const { container } = render(<Textarea resizable />)
    expect(container.firstChild).not.toHaveClass('resize-none')
  })

  it('is not resizable by default', () => {
    const { container } = render(<Textarea />)
    expect(container.firstChild).toHaveClass('resize-none')
  })
})
