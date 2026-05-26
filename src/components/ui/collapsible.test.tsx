import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as UI from './index'
import { describe, it, expect } from 'vitest'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible'

describe('Collapsible', () => {
  it('renders trigger and toggles content', async () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Show More</CollapsibleTrigger>
        <CollapsibleContent>Hidden content</CollapsibleContent>
      </Collapsible>
    )
    expect(screen.getByText('Show More')).toBeInTheDocument()
    const user = userEvent.setup()
    const trigger = screen.getByText('Show More')
    await user.click(trigger)
    expect(screen.getByText('Hidden content')).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.Collapsible).toBeDefined()
    expect(UI.CollapsibleTrigger).toBeDefined()
    expect(UI.CollapsibleContent).toBeDefined()
  })
})
