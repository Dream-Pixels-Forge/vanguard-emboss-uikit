import type { Meta, StoryObj } from '@storybook/react-vite'
import { DatePicker } from './date-picker'

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DatePicker>

export const Default: Story = {
  render: () => <DatePicker />,
}

export const WithDate: Story = {
  render: () => <DatePicker date={new Date()} />,
}

export const Disabled: Story = {
  render: () => <DatePicker disabled />,
}
