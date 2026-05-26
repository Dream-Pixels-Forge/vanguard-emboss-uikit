import type { Meta, StoryObj } from '@storybook/react'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './resizable'

const meta: Meta<typeof ResizablePanelGroup> = {
  title: 'vanguard/Resizable',
  component: ResizablePanelGroup,
}
export default meta

type Story = StoryObj<typeof ResizablePanelGroup>

export const Default: Story = {
  render: () => (
    <div className="h-[400px] w-full rounded-xl border">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize={30} minSize={20}>
          <div className="flex h-full items-center justify-center p-4 text-sm text-muted-foreground">
            Left Panel
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={70}>
          <div className="flex h-full items-center justify-center p-4 text-sm text-muted-foreground">
            Right Panel
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="h-[400px] w-full rounded-xl border">
      <ResizablePanelGroup orientation="vertical">
        <ResizablePanel defaultSize={40}>
          <div className="flex h-full items-center justify-center p-4 text-sm text-muted-foreground">
            Top Panel
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={60}>
          <div className="flex h-full items-center justify-center p-4 text-sm text-muted-foreground">
            Bottom Panel
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
}
