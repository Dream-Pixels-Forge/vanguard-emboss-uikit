import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as UI from './index'
import { describe, it, expect } from 'vitest'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'

describe('Select', () => {
  it('renders trigger with placeholder', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Choose an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Option 1</SelectItem>
          <SelectItem value="2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    )
    expect(screen.getByText('Choose an option')).toBeInTheDocument()
  })

  it('opens on click', async () => {
    const user = userEvent.setup()
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Choose" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Option 1</SelectItem>
        </SelectContent>
      </Select>
    )
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
    await user.click(screen.getByRole('combobox'))
    expect(screen.getByText('Option 1')).toBeInTheDocument()
  })

  it('exports from index', () => {
    expect(UI.Select).toBeDefined()
    expect(UI.SelectTrigger).toBeDefined()
    expect(UI.SelectValue).toBeDefined()
    expect(UI.SelectContent).toBeDefined()
    expect(UI.SelectItem).toBeDefined()
  })
})
