import type { Meta, StoryObj } from '@storybook/react-vite'
import { Calendar } from './calendar'

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Calendar>

export const Default: Story = {
  render: () => (
    <Calendar mode="single" className="rounded-xl border border-emboss-shadow-light/30 dark:border-emboss-shadow-dark/30" />
  ),
}

export const WithSelectedDate: Story = {
  render: () => (
    <Calendar mode="single" selected={new Date()} className="rounded-xl border border-emboss-shadow-light/30 dark:border-emboss-shadow-dark/30" />
  ),
}
