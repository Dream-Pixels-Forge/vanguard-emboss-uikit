import { render, screen } from '@testing-library/react'
import * as UI from './index'
import { describe, it, expect } from 'vitest'
import { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from './context-menu'

describe('ContextMenu', () => {
  it('renders trigger', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger className="block">Right-click</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Action</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem checked>Check</ContextMenuCheckboxItem>
          <ContextMenuLabel>Theme</ContextMenuLabel>
          <ContextMenuRadioGroup value="system">
            <ContextMenuRadioItem value="dark">Dark</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
          <ContextMenuSub>
            <ContextMenuSubTrigger>More</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Sub action</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuItem>
            Cut
            <ContextMenuShortcut>⌘X</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )
    expect(screen.getByText('Right-click')).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.ContextMenu).toBeDefined()
    expect(UI.ContextMenuTrigger).toBeDefined()
    expect(UI.ContextMenuContent).toBeDefined()
    expect(UI.ContextMenuItem).toBeDefined()
    expect(UI.ContextMenuSeparator).toBeDefined()
    expect(UI.ContextMenuCheckboxItem).toBeDefined()
    expect(UI.ContextMenuRadioItem).toBeDefined()
    expect(UI.ContextMenuLabel).toBeDefined()
    expect(UI.ContextMenuShortcut).toBeDefined()
    expect(UI.ContextMenuSub).toBeDefined()
    expect(UI.ContextMenuSubTrigger).toBeDefined()
    expect(UI.ContextMenuSubContent).toBeDefined()
    expect(UI.ContextMenuRadioGroup).toBeDefined()
    expect(UI.ContextMenuPortal).toBeDefined()
  })
})
