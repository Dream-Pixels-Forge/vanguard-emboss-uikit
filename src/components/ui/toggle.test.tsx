import { render, screen } from '@testing-library/react'
import * as UI from './index'
import { describe, it, expect } from 'vitest'
import { Toggle, ToggleGroup, ToggleGroupItem } from './toggle'

describe('ToggleGroup', () => {
  it('renders with items', () => {
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>
    )
    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.ToggleGroup).toBeDefined()
    expect(UI.ToggleGroupItem).toBeDefined()
  })
})

describe('Toggle', () => {
  it('renders', () => {
    render(<Toggle aria-label="Toggle me">Toggle</Toggle>)
    expect(screen.getByRole('button', { name: /toggle me/i })).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.Toggle).toBeDefined()
  })
})
