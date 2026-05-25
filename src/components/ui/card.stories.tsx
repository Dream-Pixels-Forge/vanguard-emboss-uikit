import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card'
import { Button } from './button'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    raised: { control: 'boolean' },
    border: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          This is the card content area with embossed neumorphic styling.
        </p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Action</Button>
      </CardFooter>
    </Card>
  ),
}

export const WithBorder: Story = {
  render: () => (
    <Card border className="w-80">
      <CardHeader>
        <CardTitle>Bordered Card</CardTitle>
        <CardDescription>With an embossed border outline.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Content inside a bordered embossed card.</p>
      </CardContent>
    </Card>
  ),
}

export const Flat: Story = {
  render: () => (
    <Card raised={false} className="w-80">
      <CardHeader>
        <CardTitle>Flat Card</CardTitle>
        <CardDescription>Without the raised shadow effect.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">This card has no embossed shadow.</p>
      </CardContent>
    </Card>
  ),
}
