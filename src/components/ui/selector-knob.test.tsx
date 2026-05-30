import { render, screen, fireEvent } from '@testing-library/react'
import * as UI from './index'
import { describe, it, expect, vi } from 'vitest'
import { SelectorKnob } from './selector-knob'

const items = [
  { label: 'Home', value: 'home', icon: <span>H</span> },
  { label: 'Search', value: 'search', icon: <span>S</span> },
  { label: 'Star', value: 'star', icon: <span>*</span> },
  { label: 'More', value: 'more', icon: <span>+</span> },
  { label: 'Refresh', value: 'refresh', icon: <span>R</span> },
  { label: 'Back', value: 'back', icon: <span>&lt;</span> },
]

describe('SelectorKnob', () => {
  it('renders without error', () => {
    expect(() =>
      render(<SelectorKnob items={items} defaultValue="home" />)
    ).not.toThrow()
  })

  it('is exported from index', () => {
    expect(UI.SelectorKnob).toBeDefined()
  })

  it('renders with default value', () => {
    render(<SelectorKnob items={items} defaultValue="star" />)
    const knob = screen.getByRole('button', { name: 'Selector knob' })
    expect(knob).toBeInTheDocument()
  })

  it('opens on click', () => {
    render(<SelectorKnob items={items} defaultValue="home" />)
    const knob = screen.getByRole('button', { name: 'Selector knob' })
    expect(knob).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(knob)
    expect(knob).toHaveAttribute('aria-expanded', 'true')
  })

  it('closes on second click', () => {
    render(<SelectorKnob items={items} defaultValue="home" />)
    const knob = screen.getByRole('button', { name: 'Selector knob' })
    fireEvent.click(knob)
    expect(knob).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(knob)
    expect(knob).toHaveAttribute('aria-expanded', 'false')
  })

  it('calls onChange when an item is selected', () => {
    const onChange = vi.fn()
    render(<SelectorKnob items={items} defaultValue="home" onChange={onChange} />)
    const knob = screen.getByRole('button', { name: 'Selector knob' })
    fireEvent.click(knob)
    const searchItem = screen.getByLabelText('Search')
    fireEvent.click(searchItem)
    expect(onChange).toHaveBeenCalledWith('search')
  })

  it('closes after item selection', () => {
    render(<SelectorKnob items={items} defaultValue="home" />)
    const knob = screen.getByRole('button', { name: 'Selector knob' })
    fireEvent.click(knob)
    fireEvent.click(screen.getByLabelText('Star'))
    expect(knob).toHaveAttribute('aria-expanded', 'false')
  })

  it('supports controlled mode', () => {
    const { rerender } = render(
      <SelectorKnob items={items} value="home" onChange={() => {}} />
    )
    const knob = screen.getByRole('button', { name: 'Selector knob' })
    expect(knob).toBeInTheDocument()
    rerender(<SelectorKnob items={items} value="search" onChange={() => {}} />)
    expect(knob).toBeInTheDocument()
  })

  it('respects disabled prop', () => {
    render(<SelectorKnob items={items} disabled />)
    const knob = screen.getByRole('button', { name: 'Selector knob' })
    expect(knob).toHaveAttribute('aria-disabled', 'true')
    fireEvent.click(knob)
    expect(knob).toHaveAttribute('aria-expanded', 'false')
  })
})
