import type { Meta, StoryObj } from '@storybook/react'
import { Group } from 'react-resizable-panels'
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarTrigger,
  SidebarInset,
} from './sidebar'

const meta: Meta<typeof SidebarProvider> = {
  title: 'vanguard/Sidebar',
  component: SidebarProvider,
}
export default meta

type Story = StoryObj<typeof SidebarProvider>

export const Default: Story = {
  render: () => (
    <SidebarProvider defaultOpen>
      <Group direction="horizontal" className="flex w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2">
              <div className="h-6 w-6 rounded-full bg-emboss-accent-blue" />
              <span className="font-semibold">Vanguard</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>General</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive>Dashboard</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>Analytics</SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Settings</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>Profile</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>Preferences</SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>Logout</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <div className="flex items-center gap-2 p-4">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
          <div className="p-4 text-muted-foreground">
            Main content area
          </div>
        </SidebarInset>
      </Group>
    </SidebarProvider>
  ),
}
