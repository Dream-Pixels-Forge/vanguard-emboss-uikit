import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as UI from './index'
import { describe, it, expect } from 'vitest'

describe('DropdownMenu', () => {
  it('renders trigger', () => {
    render(
      <UI.DropdownMenu>
        <UI.DropdownMenuTrigger>Open</UI.DropdownMenuTrigger>
        <UI.DropdownMenuContent>
          <UI.DropdownMenuItem>Item</UI.DropdownMenuItem>
        </UI.DropdownMenuContent>
      </UI.DropdownMenu>
    )
    expect(screen.getByText('Open')).toBeInTheDocument()
  })

  it('opens content on click', async () => {
    const user = userEvent.setup()
    render(
      <UI.DropdownMenu>
        <UI.DropdownMenuTrigger>Open</UI.DropdownMenuTrigger>
        <UI.DropdownMenuContent>
          <UI.DropdownMenuItem>Item</UI.DropdownMenuItem>
        </UI.DropdownMenuContent>
      </UI.DropdownMenu>
    )
    expect(screen.queryByText('Item')).not.toBeInTheDocument()
    await user.click(screen.getByText('Open'))
    expect(screen.getByText('Item')).toBeInTheDocument()
  })

  it('renders menu items', async () => {
    const user = userEvent.setup()
    render(
      <UI.DropdownMenu>
        <UI.DropdownMenuTrigger>Open</UI.DropdownMenuTrigger>
        <UI.DropdownMenuContent>
          <UI.DropdownMenuItem>Profile</UI.DropdownMenuItem>
          <UI.DropdownMenuItem>Settings</UI.DropdownMenuItem>
          <UI.DropdownMenuItem>Logout</UI.DropdownMenuItem>
        </UI.DropdownMenuContent>
      </UI.DropdownMenu>
    )
    await user.click(screen.getByText('Open'))
    expect(screen.getByText('Profile')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })

  it('renders separator', async () => {
    const user = userEvent.setup()
    render(
      <UI.DropdownMenu>
        <UI.DropdownMenuTrigger>Open</UI.DropdownMenuTrigger>
        <UI.DropdownMenuContent>
          <UI.DropdownMenuItem>Item</UI.DropdownMenuItem>
          <UI.DropdownMenuSeparator />
          <UI.DropdownMenuItem>After</UI.DropdownMenuItem>
        </UI.DropdownMenuContent>
      </UI.DropdownMenu>
    )
    await user.click(screen.getByText('Open'))
    const items = screen.getAllByRole('menuitem')
    expect(items).toHaveLength(2)
    expect(items[0]).toHaveTextContent('Item')
    expect(items[1]).toHaveTextContent('After')
  })

  it('renders checkbox items', async () => {
    const user = userEvent.setup()
    render(
      <UI.DropdownMenu>
        <UI.DropdownMenuTrigger>Open</UI.DropdownMenuTrigger>
        <UI.DropdownMenuContent>
          <UI.DropdownMenuCheckboxItem checked>Checkbox</UI.DropdownMenuCheckboxItem>
        </UI.DropdownMenuContent>
      </UI.DropdownMenu>
    )
    await user.click(screen.getByText('Open'))
    const checkboxItem = screen.getByText('Checkbox')
    expect(checkboxItem).toBeInTheDocument()
    expect(checkboxItem.closest('[role="menuitemcheckbox"]')).toHaveAttribute('data-state', 'checked')
  })

  it('is exported from index', () => {
    expect(UI.DropdownMenu).toBeDefined()
    expect(UI.DropdownMenuTrigger).toBeDefined()
    expect(UI.DropdownMenuContent).toBeDefined()
    expect(UI.DropdownMenuItem).toBeDefined()
    expect(UI.DropdownMenuCheckboxItem).toBeDefined()
    expect(UI.DropdownMenuRadioItem).toBeDefined()
    expect(UI.DropdownMenuSeparator).toBeDefined()
    expect(UI.DropdownMenuLabel).toBeDefined()
    expect(UI.DropdownMenuShortcut).toBeDefined()
    expect(UI.DropdownMenuGroup).toBeDefined()
    expect(UI.DropdownMenuPortal).toBeDefined()
    expect(UI.DropdownMenuSub).toBeDefined()
    expect(UI.DropdownMenuRadioGroup).toBeDefined()
    expect(UI.DropdownMenuSubTrigger).toBeDefined()
    expect(UI.DropdownMenuSubContent).toBeDefined()
  })
})
