import type { Meta, StoryObj } from '@storybook/react-vite'
import { Box } from './box'

const meta: Meta<typeof Box> = {
  title: 'Components/Box',
  component: Box,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Box>

export const Default: Story = {
  args: {
    children: 'Box content',
  },
}
