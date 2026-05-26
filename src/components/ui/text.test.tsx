import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Text } from './text'

describe('Text', () => {
  it('renders children', () => {
    render(<Text>Hello</Text>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders as heading element when variant is h1', () => {
    render(<Text variant="h1">Heading</Text>)
    expect(screen.getByRole('heading', { name: /heading/i })).toBeInTheDocument()
  })

  it('renders as paragraph by default', () => {
    const { container } = render(<Text>Paragraph</Text>)
    expect(container.querySelector('p')).toBeInTheDocument()
  })

  it('applies muted class', () => {
    render(<Text muted>Muted</Text>)
    expect(screen.getByText('Muted')).toHaveClass('text-muted-foreground')
  })

  it('applies accent class', () => {
    render(<Text accent="blue">Accented</Text>)
    expect(screen.getByText('Accented')).toHaveClass('text-emboss-accent-blue')
  })

  it('applies weight class', () => {
    render(<Text weight="bold">Bold</Text>)
    expect(screen.getByText('Bold')).toHaveClass('font-bold')
  })
})
