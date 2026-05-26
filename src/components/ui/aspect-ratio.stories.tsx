import type { Meta, StoryObj } from '@storybook/react-vite'
import { AspectRatio } from './aspect-ratio'

const meta: Meta<typeof AspectRatio> = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AspectRatio>

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <AspectRatio ratio={16 / 9}>
        <div className="flex h-full items-center justify-center rounded-xl bg-emboss-shadow-light/20 text-sm text-muted-foreground">
          16:9
        </div>
      </AspectRatio>
    </div>
  ),
}

export const Square: Story = {
  render: () => (
    <div className="w-40">
      <AspectRatio ratio={1}>
        <div className="flex h-full items-center justify-center rounded-xl bg-emboss-shadow-light/20 text-sm text-muted-foreground">
          1:1
        </div>
      </AspectRatio>
    </div>
  ),
}
