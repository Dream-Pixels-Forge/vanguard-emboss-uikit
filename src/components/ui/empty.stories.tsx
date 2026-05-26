import type { Meta, StoryObj } from '@storybook/react-vite'
import { Empty } from './empty'
import { Inbox } from 'lucide-react'
import { Button } from './button'

const meta: Meta<typeof Empty> = {
  title: 'Components/Empty',
  component: Empty,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Empty>

export const Default: Story = {
  render: () => (
    <Empty
      title="No results found"
      description="Try adjusting your search or filter to find what you're looking for."
    />
  ),
}

export const WithIcon: Story = {
  render: () => (
    <Empty
      icon={<Inbox className="h-12 w-12" />}
      title="No messages"
      description="You don't have any messages yet."
      action={<Button>New Message</Button>}
    />
  ),
}

export const WithAction: Story = {
  render: () => (
    <Empty
      icon={<Inbox className="h-12 w-12" />}
      title="Your inbox is empty"
      description="When you receive messages, they'll appear here."
      action={<Button variant="accent">Compose</Button>}
    />
  ),
}
