import type { Meta, StoryObj } from '@storybook/react'
import { ScrollArea } from './scroll-area'

const meta: Meta<typeof ScrollArea> = {
  title: 'UI/ScrollArea',
  component: ScrollArea,
  parameters: { layout: 'centered' },
}

export default meta

type Story = StoryObj<typeof ScrollArea>

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-48 w-80 rounded-xl border border-emboss-shadow-light/20 p-4">
      <div className="space-y-2">
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} className="text-sm text-emboss-text-light dark:text-emboss-text-dark">
            Item {i + 1}
          </p>
        ))}
      </div>
    </ScrollArea>
  ),
}
