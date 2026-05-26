import { render, screen } from '@testing-library/react'
import * as UI from './index'
import { describe, it, expect } from 'vitest'
import { Command, CommandInput, CommandItem, CommandList } from './command'

describe('Command', () => {
  it('renders with input', () => {
    render(
      <Command>
        <CommandInput placeholder="Search..." />
      </Command>
    )
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  it('renders items', () => {
    window.HTMLElement.prototype.scrollIntoView = function () {}
    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandItem value="item1">Item 1</CommandItem>
          <CommandItem value="item2">Item 2</CommandItem>
        </CommandList>
      </Command>
    )
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.Command).toBeDefined()
    expect(UI.CommandInput).toBeDefined()
    expect(UI.CommandList).toBeDefined()
    expect(UI.CommandItem).toBeDefined()
    expect(UI.CommandGroup).toBeDefined()
    expect(UI.CommandEmpty).toBeDefined()
    expect(UI.CommandSeparator).toBeDefined()
    expect(UI.CommandShortcut).toBeDefined()
  })
})
