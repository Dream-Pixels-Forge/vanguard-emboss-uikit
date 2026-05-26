import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Box } from './box'

describe('Box', () => {
  it('renders children', () => {
    render(<Box>Content</Box>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('applies raised classes', () => {
    const { container } = render(<Box raised>Raised</Box>)
    expect(container.firstChild).toHaveClass('shadow-emboss-out-light')
  })

  it('applies recessed classes', () => {
    const { container } = render(<Box recessed>Recessed</Box>)
    expect(container.firstChild).toHaveClass('shadow-emboss-in-light')
  })

  it('applies border when border prop is true', () => {
    const { container } = render(<Box border>Bordered</Box>)
    expect(container.firstChild).toHaveClass('border-emboss-shadow-light/30')
  })

  it('raised takes precedence over recessed', () => {
    const { container } = render(<Box raised recessed>Both</Box>)
    expect(container.firstChild).toHaveClass('shadow-emboss-out-light')
  })

  it('renders as child element with asChild', () => {
    render(
      <Box asChild>
        <article>Article Box</article>
      </Box>
    )
    expect(screen.getByText('Article Box').tagName).toBe('ARTICLE')
  })
})
