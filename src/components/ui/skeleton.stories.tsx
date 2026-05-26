import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton } from './skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['text', 'circle', 'card'] },
  },
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Text: Story = {
  args: {
    variant: 'text',
    className: 'w-3/4',
  },
}

export const Circle: Story = {
  args: {
    variant: 'circle',
    className: 'h-16 w-16',
  },
}

export const Card: Story = {
  args: {
    variant: 'card',
  },
}

export const Composer: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <div className="flex items-center gap-4">
        <Skeleton variant="circle" className="h-12 w-12" />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton variant="text" className="w-1/2" />
          <Skeleton variant="text" className="w-1/3" />
        </div>
      </div>
      <Skeleton variant="card" />
      <div className="flex gap-2">
        <Skeleton variant="text" className="flex-1" />
        <Skeleton variant="text" className="w-20" />
      </div>
    </div>
  ),
}
