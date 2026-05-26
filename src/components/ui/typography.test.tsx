import { render, screen } from '@testing-library/react'
import * as UI from './index'
import { describe, it, expect } from 'vitest'

describe('Typography', () => {
  it('renders children', () => {
    render(<UI.Typography>Hello</UI.Typography>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders as p by default', () => {
    const { container } = render(<UI.Typography>Text</UI.Typography>)
    expect(container.querySelector('p')).toBeInTheDocument()
  })

  it('renders as h1 with h1 variant', () => {
    render(<UI.Typography variant="h1">Heading</UI.Typography>)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Heading')
  })

  it('renders as h2 with h2 variant', () => {
    render(<UI.Typography variant="h2">Heading 2</UI.Typography>)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Heading 2')
  })

  it('renders as h3 with h3 variant', () => {
    render(<UI.Typography variant="h3">Heading 3</UI.Typography>)
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Heading 3')
  })

  it('renders as h4 with h4 variant', () => {
    render(<UI.Typography variant="h4">Heading 4</UI.Typography>)
    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('Heading 4')
  })

  it('renders as small element with small variant', () => {
    const { container } = render(<UI.Typography variant="small">Small</UI.Typography>)
    expect(container.querySelector('small')).toBeInTheDocument()
  })

  it('renders as custom element with as prop', () => {
    const { container } = render(<UI.Typography as="span">Custom</UI.Typography>)
    expect(container.querySelector('span')).toBeInTheDocument()
  })

  it('applies variant-specific classes', () => {
    const { container } = render(<UI.Typography variant="h1">Heading</UI.Typography>)
    expect(container.firstChild).toHaveClass('text-4xl')
    expect(container.firstChild).toHaveClass('font-bold')
  })

  it('applies muted class for muted variant', () => {
    const { container } = render(<UI.Typography variant="muted">Muted</UI.Typography>)
    expect(container.firstChild).toHaveClass('text-muted-foreground')
  })

  it('applies custom className', () => {
    const { container } = render(<UI.Typography className="custom">Text</UI.Typography>)
    expect(container.firstChild).toHaveClass('custom')
  })

  it('exports from index', () => {
    expect(UI.Typography).toBeDefined()
  })
})
