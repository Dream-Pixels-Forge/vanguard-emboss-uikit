import { render, screen } from '@testing-library/react'
import * as UI from './index'
import { describe, it, expect } from 'vitest'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from './menubar'

describe('Menubar', () => {
  it('renders trigger', () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New</MenubarItem>
            <MenubarItem>Open</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
    expect(screen.getByText('File')).toBeInTheDocument()
  })

  it('exports from index', () => {
    expect(UI.Menubar).toBeDefined()
    expect(UI.MenubarMenu).toBeDefined()
    expect(UI.MenubarTrigger).toBeDefined()
    expect(UI.MenubarContent).toBeDefined()
    expect(UI.MenubarItem).toBeDefined()
  })
})
