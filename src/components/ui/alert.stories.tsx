import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert } from './alert'

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'success', 'warning', 'info'],
    },
    dismissible: { control: 'boolean' },
    title: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
  args: {
    variant: 'default',
    title: 'Heads up!',
    children: 'This is a default alert with an embossed neumorphic style.',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Alert variant="default" title="Default">A default informational alert.</Alert>
      <Alert variant="info" title="Info">An informational alert for general messages.</Alert>
      <Alert variant="success" title="Success">Your changes have been saved successfully.</Alert>
      <Alert variant="warning" title="Warning">This action cannot be undone.</Alert>
      <Alert variant="destructive" title="Error">Something went wrong. Please try again.</Alert>
    </div>
  ),
}

export const Dismissible: Story = {
  args: {
    variant: 'info',
    title: 'Dismiss me',
    children: 'Click the X button to dismiss this alert.',
    dismissible: true,
  },
}
