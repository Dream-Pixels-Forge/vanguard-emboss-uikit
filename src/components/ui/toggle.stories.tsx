import type { Meta, StoryObj } from '@storybook/react-vite'
import { ToggleGroup, ToggleGroupItem } from './toggle'

const meta: Meta<typeof ToggleGroup> = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ToggleGroup>

export const Single: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="bold">
      <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
      <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Multiple: Story = {
  render: () => (
    <ToggleGroup type="multiple" defaultValue={['bold', 'italic']}>
      <ToggleGroupItem value="bold">B</ToggleGroupItem>
      <ToggleGroupItem value="italic">I</ToggleGroupItem>
      <ToggleGroupItem value="underline">U</ToggleGroupItem>
      <ToggleGroupItem value="strikethrough">S</ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 items-start">
      <ToggleGroup type="single" size="sm" defaultValue="a">
        <ToggleGroupItem size="sm" value="a">Small</ToggleGroupItem>
        <ToggleGroupItem size="sm" value="b">Items</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" size="md" defaultValue="a">
        <ToggleGroupItem size="md" value="a">Medium</ToggleGroupItem>
        <ToggleGroupItem size="md" value="b">Items</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" size="lg" defaultValue="a">
        <ToggleGroupItem size="lg" value="a">Large</ToggleGroupItem>
        <ToggleGroupItem size="lg" value="b">Items</ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
}
