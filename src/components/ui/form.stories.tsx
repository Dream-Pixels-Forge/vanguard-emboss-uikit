import type { Meta, StoryObj } from '@storybook/react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from './button'
import { Input } from './input'
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from './form'

const formSchema = z.object({
  username: z.string().min(2, { message: 'Username must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
})

const meta: Meta<typeof Form> = {
  title: 'UI/Form',
  component: Form,
  parameters: { layout: 'centered' },
}

export default meta

type Story = StoryObj<typeof Form>

export const Default: Story = {
  render: () => (
    <Form
      onSubmit={(values) => console.log(values)}
      resolver={zodResolver(formSchema)}
      defaultValues={{ username: '', email: '' }}
      className="w-96"
    >
      <FormField
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="johndoe" {...field} />
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="john@example.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Submit</Button>
    </Form>
  ),
}
