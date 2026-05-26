import type { Meta, StoryObj } from '@storybook/react-vite'
import { Field } from './field'
import { Input } from './input'

const meta: Meta<typeof Field> = {
  title: 'Components/Field',
  component: Field,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Field>

export const Default: Story = {
  render: () => (
    <Field label="Email" htmlFor="email">
      <Input id="email" placeholder="Enter your email" />
    </Field>
  ),
}

export const Required: Story = {
  render: () => (
    <Field label="Full Name" htmlFor="name" required>
      <Input id="name" placeholder="John Doe" />
    </Field>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <Field label="Password" htmlFor="password" description="Must be at least 8 characters.">
      <Input id="password" type="password" />
    </Field>
  ),
}

export const WithError: Story = {
  render: () => (
    <Field label="Username" htmlFor="username" error="Username is already taken.">
      <Input id="username" error defaultValue="john" />
    </Field>
  ),
}
