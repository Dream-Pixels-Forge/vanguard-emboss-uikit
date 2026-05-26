import type { Meta, StoryObj } from '@storybook/react-vite'
import { ButtonGroup } from './button-group'
import { Button } from './button'

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
}

export default meta
type Story = StoryObj<typeof ButtonGroup>

export const Horizontal: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="default">Left</Button>
      <Button variant="default">Center</Button>
      <Button variant="default">Right</Button>
    </ButtonGroup>
  ),
}

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical">
      <Button variant="default">Top</Button>
      <Button variant="default">Middle</Button>
      <Button variant="default">Bottom</Button>
    </ButtonGroup>
  ),
}

export const MixedVariants: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="accent">Save</Button>
      <Button variant="outline">Cancel</Button>
      <Button variant="ghost">Delete</Button>
    </ButtonGroup>
  ),
}
