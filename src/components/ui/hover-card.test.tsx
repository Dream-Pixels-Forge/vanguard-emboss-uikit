import { render, screen } from '@testing-library/react'
import * as UI from './index'
import { describe, it, expect } from 'vitest'
import { HoverCard, HoverCardTrigger } from './hover-card'

describe('HoverCard', () => {
  it('renders trigger', () => {
    render(
      <HoverCard>
        <HoverCardTrigger>Hover me</HoverCardTrigger>
      </HoverCard>
    )
    expect(screen.getByText('Hover me')).toBeInTheDocument()
  })

  it('exports from index', () => {
    expect(UI.HoverCard).toBeDefined()
    expect(UI.HoverCardTrigger).toBeDefined()
    expect(UI.HoverCardContent).toBeDefined()
  })
})
