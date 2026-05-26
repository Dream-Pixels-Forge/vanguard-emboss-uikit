import type { Meta, StoryObj } from '@storybook/react-vite'
import { Item, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions } from './item'
import { Avatar } from './avatar'
import { Button } from './button'
import { Badge } from './badge'

const meta: Meta<typeof Item> = {
  title: 'Components/Item',
  component: Item,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Item>

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-2 max-w-md">
      <Item>
        <ItemMedia>
          <Avatar fallback="JD" size="sm" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>John Doe</ItemTitle>
          <ItemDescription>Software Engineer</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm">View</Button>
        </ItemActions>
      </Item>
    </div>
  ),
}

export const CardStyle: Story = {
  render: () => (
    <div className="flex flex-col gap-2 max-w-md">
      <Item variant="card">
        <ItemMedia>
          <div className="w-10 h-10 rounded-lg bg-emboss-accent-blue/20 flex items-center justify-center text-emboss-accent-blue font-bold">
            D
          </div>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Design System</ItemTitle>
          <ItemDescription>Components and tokens for consistent UI</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Badge variant="accent">Active</Badge>
        </ItemActions>
      </Item>
    </div>
  ),
}

export const List: Story = {
  render: () => (
    <div className="flex flex-col gap-2 max-w-md">
      <Item>
        <ItemMedia>
          <Avatar fallback="AK" size="sm" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Alice Kim</ItemTitle>
          <ItemDescription>Product Designer</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="ghost">Edit</Button>
        </ItemActions>
      </Item>
      <Item>
        <ItemMedia>
          <Avatar fallback="BM" size="sm" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Bob Miller</ItemTitle>
          <ItemDescription>Frontend Developer</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="ghost">Edit</Button>
        </ItemActions>
      </Item>
      <Item>
        <ItemMedia>
          <Avatar fallback="CJ" size="sm" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Carol Johnson</ItemTitle>
          <ItemDescription>Backend Engineer</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="ghost">Edit</Button>
        </ItemActions>
      </Item>
    </div>
  ),
}
