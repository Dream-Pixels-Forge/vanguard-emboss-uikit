import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Badge } from './badge'

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('renders with variant classes', () => {
    const { container } = render(<Badge variant="accent">Accent</Badge>)
    expect(container.firstChild).toHaveClass('bg-emboss-accent-blue')
  })

  it('renders with size classes', () => {
    const { container } = render(<Badge size="lg">Large</Badge>)
    expect(container.firstChild).toHaveClass('px-3')
  })

  it('applies custom className', () => {
    const { container } = render(<Badge className="custom">Badge</Badge>)
    expect(container.firstChild).toHaveClass('custom')
  })

  it('renders as child element with asChild', () => {
    render(
      <Badge asChild>
        <a href="/tag">Tag</a>
      </Badge>
    )
    expect(screen.getByRole('link')).toHaveTextContent('Tag')
    expect(screen.getByRole('link')).toHaveAttribute('href', '/tag')
  })
})
