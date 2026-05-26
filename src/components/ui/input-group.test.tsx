import { render, screen } from '@testing-library/react'
import * as UI from './index'
import { describe, it, expect } from 'vitest'

describe('InputGroup', () => {
  it('renders children', () => {
    render(
      <UI.InputGroup>
        <input placeholder="Test" />
      </UI.InputGroup>
    )
    expect(screen.getByPlaceholderText('Test')).toBeInTheDocument()
  })

  it('renders with addon', () => {
    render(
      <UI.InputGroup>
        <UI.InputGroupAddon>$</UI.InputGroupAddon>
        <input placeholder="Amount" />
      </UI.InputGroup>
    )
    expect(screen.getByText('$')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Amount')).toBeInTheDocument()
  })

  it('renders multiple addons', () => {
    render(
      <UI.InputGroup>
        <UI.InputGroupAddon>$</UI.InputGroupAddon>
        <input placeholder="Amount" />
        <UI.InputGroupAddon>.00</UI.InputGroupAddon>
      </UI.InputGroup>
    )
    expect(screen.getByText('$')).toBeInTheDocument()
    expect(screen.getByText('.00')).toBeInTheDocument()
  })

  it('renders with full width by default', () => {
    const { container } = render(
      <UI.InputGroup>
        <input />
      </UI.InputGroup>
    )
    expect(container.firstChild).toHaveClass('w-full')
  })

  it('can have fullWidth disabled', () => {
    const { container } = render(
      <UI.InputGroup fullWidth={false}>
        <input />
      </UI.InputGroup>
    )
    expect(container.firstChild).not.toHaveClass('w-full')
  })

  it('exports from index', () => {
    expect(UI.InputGroup).toBeDefined()
    expect(UI.InputGroupAddon).toBeDefined()
  })
})
