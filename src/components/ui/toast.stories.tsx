import type { Meta, StoryObj } from '@storybook/react-vite'
import { ToastProvider } from './toast'

const meta: Meta<typeof ToastProvider> = {
  title: 'Components/Toast',
  component: ToastProvider,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ToastProvider>

export const Default: Story = {
  args: {},
}
