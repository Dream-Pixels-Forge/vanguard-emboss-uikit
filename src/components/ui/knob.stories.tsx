import type { Meta, StoryObj } from '@storybook/react-vite'
import { Knob } from './knob'

const meta: Meta<typeof Knob> = {
  title: 'Components/Knob',
  component: Knob,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    defaultValue: { control: 'number' },
    disabled: { control: 'boolean' },
    showValue: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Knob>

export const Default: Story = {
  args: {
    label: 'Volume',
    defaultValue: 60,
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-8">
      <Knob size="sm" label="Small" defaultValue={30} />
      <Knob size="md" label="Medium" defaultValue={60} />
      <Knob size="lg" label="Large" defaultValue={90} />
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="flex gap-8">
      <Knob label="Default" defaultValue={50} />
      <Knob label="Min" defaultValue={0} />
      <Knob label="Max" defaultValue={100} />
      <Knob label="Disabled" defaultValue={50} disabled />
    </div>
  ),
}

export const CustomRange: Story = {
  args: {
    label: 'Bass',
    min: -12,
    max: 12,
    defaultValue: 0,
    step: 1,
  },
}
