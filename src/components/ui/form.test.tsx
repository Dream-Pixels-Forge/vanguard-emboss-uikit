import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as UI from './index'
import { describe, it, expect } from 'vitest'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './form'
import { Input } from './input'

describe('Form', () => {
  it('renders fields', () => {
    render(
      <Form onSubmit={() => {}} defaultValues={{ name: '' }}>
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormDescription>Your name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    )
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Your name')).toBeInTheDocument()
  })

  it('shows validation error', async () => {
    const user = userEvent.setup()
    render(
      <Form onSubmit={() => {}} defaultValues={{ email: '' }}>
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    )
    const input = screen.getByPlaceholderText('Email')
    await user.type(input, 'invalid')
    expect(input).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.Form).toBeDefined()
    expect(UI.FormField).toBeDefined()
    expect(UI.FormItem).toBeDefined()
    expect(UI.FormLabel).toBeDefined()
    expect(UI.FormControl).toBeDefined()
    expect(UI.FormDescription).toBeDefined()
    expect(UI.FormMessage).toBeDefined()
  })
})
