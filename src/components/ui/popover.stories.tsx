import type { Meta, StoryObj } from '@storybook/react-vite'
import { Popover, PopoverTrigger, PopoverContent } from './popover'

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger>Open</PopoverTrigger>
      <PopoverContent>Content here</PopoverContent>
    </Popover>
  ),
}
