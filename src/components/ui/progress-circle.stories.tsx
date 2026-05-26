import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProgressCircle } from './progress-circle'

const meta: Meta<typeof ProgressCircle> = {
  title: 'Components/ProgressCircle',
  component: ProgressCircle,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    showValue: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof ProgressCircle>

export const Default: Story = {
  args: {
    value: 75,
    label: 'Completion',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-8">
      <ProgressCircle size="sm" value={60} label="Small" />
      <ProgressCircle size="md" value={75} label="Medium" />
      <ProgressCircle size="lg" value={90} label="Large" />
    </div>
  ),
}

export const Values: Story = {
  render: () => (
    <div className="flex gap-8">
      <ProgressCircle value={0} label="Empty" />
      <ProgressCircle value={25} label="Quarter" />
      <ProgressCircle value={50} label="Half" />
      <ProgressCircle value={100} label="Full" />
    </div>
  ),
}
