import { render, screen } from '@testing-library/react'
import * as UI from './index'
import { describe, it, expect } from 'vitest'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from './sidebar'

describe('Sidebar', () => {
  it('renders with content', () => {
    render(
      <SidebarProvider defaultOpen>
        <Sidebar collapsible="none">
          <SidebarHeader>Header</SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Group</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>Item</SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>Footer</SidebarFooter>
        </Sidebar>
        <main>Content</main>
      </SidebarProvider>
    )
    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })

  it('renders menu items', () => {
    render(
      <SidebarProvider defaultOpen>
        <Sidebar collapsible="none">
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>Dashboard</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <main>Content</main>
      </SidebarProvider>
    )
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.SidebarProvider).toBeDefined()
    expect(UI.Sidebar).toBeDefined()
    expect(UI.SidebarHeader).toBeDefined()
    expect(UI.SidebarContent).toBeDefined()
    expect(UI.SidebarFooter).toBeDefined()
    expect(UI.SidebarGroup).toBeDefined()
    expect(UI.SidebarGroupLabel).toBeDefined()
    expect(UI.SidebarGroupContent).toBeDefined()
    expect(UI.SidebarMenu).toBeDefined()
    expect(UI.SidebarMenuItem).toBeDefined()
    expect(UI.SidebarMenuButton).toBeDefined()
    expect(UI.SidebarTrigger).toBeDefined()
    expect(UI.SidebarInset).toBeDefined()
  })
})
