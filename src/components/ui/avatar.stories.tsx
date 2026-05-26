import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar } from './avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    fallback: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=avatar',
    alt: 'User avatar',
    fallback: 'JD',
  },
}

export const Fallback: Story = {
  args: {
    fallback: 'AK',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar size="sm" fallback="S" />
      <Avatar size="md" fallback="M" />
      <Avatar size="lg" fallback="L" />
    </div>
  ),
}
