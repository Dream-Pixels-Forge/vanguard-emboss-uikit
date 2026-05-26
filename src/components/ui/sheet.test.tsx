import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as UI from './index'
import { describe, it, expect } from 'vitest'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from './sheet'

describe('Sheet', () => {
  it('renders trigger and opens content', async () => {
    render(
      <Sheet>
        <SheetTrigger asChild>
          <button>Open</button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle>Test Sheet</SheetTitle>
          <p>Sheet content</p>
        </SheetContent>
      </Sheet>
    )
    const user = userEvent.setup()
    const trigger = screen.getByText('Open')
    await user.click(trigger)
    expect(screen.getByText('Sheet content')).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.Sheet).toBeDefined()
    expect(UI.SheetTrigger).toBeDefined()
    expect(UI.SheetContent).toBeDefined()
  })
})
