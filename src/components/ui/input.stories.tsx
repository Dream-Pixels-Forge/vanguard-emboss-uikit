import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './input'
import { Label } from './label'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'url'],
    },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: 'Enter your name...',
  },
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="default">Default</Label>
        <Input id="default" placeholder="Default input" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="focused-auto">Focused</Label>
        <Input id="focused-auto" placeholder="Click to focus" autoFocus />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="disabled">Disabled</Label>
        <Input id="disabled" placeholder="Disabled input" disabled />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="error">Error</Label>
        <Input id="error" placeholder="Invalid input" error />
      </div>
    </div>
  ),
}
