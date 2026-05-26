import { render, screen } from '@testing-library/react'
import * as UI from './index'
import { describe, it, expect } from 'vitest'

describe('NativeSelect', () => {
  it('renders a select element', () => {
    render(<UI.NativeSelect aria-label="Choose" />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('renders placeholder option', () => {
    render(
      <UI.NativeSelect placeholder="Select an option">
        <option value="1">Option 1</option>
      </UI.NativeSelect>
    )
    expect(screen.getByText('Select an option')).toBeInTheDocument()
  })

  it('renders children (options)', () => {
    render(
      <UI.NativeSelect>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </UI.NativeSelect>
    )
    expect(screen.getByText('Option 1')).toBeInTheDocument()
    expect(screen.getByText('Option 2')).toBeInTheDocument()
  })

  it('applies emboss styling classes', () => {
    const { container } = render(<UI.NativeSelect aria-label="Select" />)
    const select = container.querySelector('select')
    expect(select).toHaveClass('shadow-emboss-out-light-sm')
  })

  it('can be disabled', () => {
    render(<UI.NativeSelect disabled aria-label="Disabled" />)
    expect(screen.getByRole('combobox')).toBeDisabled()
  })

  it('exports from index', () => {
    expect(UI.NativeSelect).toBeDefined()
  })
})
