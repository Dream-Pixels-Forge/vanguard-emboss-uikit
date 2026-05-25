import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from './textarea'
import { Label } from './label'

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    resizable: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  args: {
    placeholder: 'Type your message here...',
  },
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="ta-default">Default</Label>
        <Textarea id="ta-default" placeholder="Enter description..." />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="ta-resizable">Resizable</Label>
        <Textarea id="ta-resizable" placeholder="Drag to resize" resizable />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="ta-disabled">Disabled</Label>
        <Textarea id="ta-disabled" placeholder="Cannot edit" disabled />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="ta-error">Error</Label>
        <Textarea id="ta-error" placeholder="Invalid input" error />
      </div>
    </div>
  ),
}
