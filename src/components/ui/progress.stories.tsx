import type { Meta, StoryObj } from '@storybook/react-vite'
import { Progress } from './progress'

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}

export default meta
type Story = StoryObj<typeof Progress>

export const Default: Story = {
  args: {
    value: 60,
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Progress size="sm" value={45} />
      <Progress size="md" value={65} />
      <Progress size="lg" value={85} />
    </div>
  ),
}

export const Indeterminate: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Progress value={undefined} />
    </div>
  ),
}

export const Values: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Progress value={0} />
      <Progress value={25} />
      <Progress value={50} />
      <Progress value={75} />
      <Progress value={100} />
    </div>
  ),
}
