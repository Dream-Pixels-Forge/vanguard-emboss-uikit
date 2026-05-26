import type { Meta, StoryObj } from '@storybook/react-vite'
import { Pagination } from './pagination'

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  args: {
    total: 10,
    current: 1,
    onPageChange: () => {},
  },
}

export const MidPage: Story = {
  args: {
    total: 20,
    current: 10,
    onPageChange: () => {},
  },
}

export const ManyPages: Story = {
  args: {
    total: 100,
    current: 50,
    onPageChange: () => {},
  },
}
