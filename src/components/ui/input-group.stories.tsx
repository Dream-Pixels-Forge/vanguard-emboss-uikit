import type { Meta, StoryObj } from '@storybook/react-vite'
import { InputGroup, InputGroupAddon } from './input-group'
import { Input } from './input'
import { Label } from './label'

const meta: Meta<typeof InputGroup> = {
  title: 'Components/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof InputGroup>

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="amount">Amount</Label>
        <InputGroup>
          <InputGroupAddon>$</InputGroupAddon>
          <Input id="amount" placeholder="0.00" />
        </InputGroup>
      </div>
    </div>
  ),
}

export const WithBothAddons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="weight">Weight</Label>
        <InputGroup>
          <InputGroupAddon>kg</InputGroupAddon>
          <Input id="weight" placeholder="Enter weight" />
          <InputGroupAddon>lbs</InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  ),
}

export const IconAddon: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <InputGroup>
          <InputGroupAddon>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </InputGroupAddon>
          <Input id="email" placeholder="you@example.com" />
        </InputGroup>
      </div>
    </div>
  ),
}

export const WithButton: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="search">Search</Label>
        <InputGroup>
          <Input id="search" placeholder="Search..." />
          <InputGroupAddon>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  ),
}
