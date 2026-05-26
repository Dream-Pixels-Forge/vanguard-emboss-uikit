import type { Meta, StoryObj } from '@storybook/react-vite'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './collapsible'

const meta: Meta<typeof Collapsible> = {
  title: 'Components/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Collapsible>

export const Default: Story = {
  render: () => (
    <Collapsible className="w-full max-w-sm">
      <CollapsibleTrigger>
        What is this component?
      </CollapsibleTrigger>
      <CollapsibleContent>
        Collapsible reveals hidden content when triggered. It uses Radix UI
        primitives and maintains the embossed neumorphic design language.
      </CollapsibleContent>
    </Collapsible>
  ),
}

export const WithCustomContent: Story = {
  render: () => (
    <Collapsible className="w-full max-w-sm">
      <CollapsibleTrigger>
        Show Details
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col gap-2">
          <p>Version: 0.3.0</p>
          <p>Author: Dream Pixels Forge</p>
          <p>License: MIT</p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
}
