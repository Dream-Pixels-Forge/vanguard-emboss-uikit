import { render, screen } from '@testing-library/react'
import * as UI from './index'
import { describe, it, expect } from 'vitest'

describe('ButtonGroup', () => {
  it('renders children', () => {
    render(
      <UI.ButtonGroup>
        <button>One</button>
        <button>Two</button>
      </UI.ButtonGroup>
    )
    expect(screen.getByText('One')).toBeInTheDocument()
    expect(screen.getByText('Two')).toBeInTheDocument()
  })

  it('renders with horizontal orientation by default', () => {
    const { container } = render(
      <UI.ButtonGroup>
        <button>A</button>
      </UI.ButtonGroup>
    )
    const group = container.firstChild as HTMLElement
    expect(group).toHaveAttribute('data-orientation', 'horizontal')
    expect(group).not.toHaveClass('flex-col')
  })

  it('renders with vertical orientation', () => {
    const { container } = render(
      <UI.ButtonGroup orientation="vertical">
        <button>A</button>
      </UI.ButtonGroup>
    )
    const group = container.firstChild as HTMLElement
    expect(group).toHaveAttribute('data-orientation', 'vertical')
    expect(group).toHaveClass('flex-col')
  })

  it('has role="group"', () => {
    render(
      <UI.ButtonGroup>
        <button>A</button>
      </UI.ButtonGroup>
    )
    expect(screen.getByRole('group')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <UI.ButtonGroup className="custom-class">
        <button>A</button>
      </UI.ButtonGroup>
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('exports from index', () => {
    expect(UI.ButtonGroup).toBeDefined()
  })
})
