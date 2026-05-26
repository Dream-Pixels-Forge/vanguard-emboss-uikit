import type { Meta, StoryObj } from '@storybook/react-vite'
import { TiltCard } from './tilt-card'
import { Text } from './text'

const meta: Meta<typeof TiltCard> = {
  title: 'Components/TiltCard',
  component: TiltCard,
  tags: ['autodocs'],
  argTypes: {
    maxTilt: { control: { type: 'range', min: 5, max: 45, step: 5 } },
    scale: { control: { type: 'range', min: 1, max: 1.1, step: 0.01 } },
    glare: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof TiltCard>

export const Default: Story = {
  args: {
    children: (
      <div className="p-8">
        <Text variant="h3">3D Tilt Card</Text>
        <Text variant="p" className="mt-2">
          Hover over this card to see the 3D perspective tilt effect with emboss shadows.
        </Text>
      </div>
    ),
    className: 'max-w-sm',
  },
}

export const CustomTilt: Story = {
  args: {
    maxTilt: 30,
    scale: 1.05,
    children: (
      <div className="p-8">
        <Text variant="h3">Extra Tilt</Text>
        <Text variant="p" className="mt-2">
          This one has maxTilt=30 and scale=1.05 for more dramatic effect.
        </Text>
      </div>
    ),
    className: 'max-w-sm',
  },
}

export const NoGlare: Story = {
  args: {
    glare: false,
    children: (
      <div className="p-8">
        <Text variant="h3">No Glare</Text>
        <Text variant="p" className="mt-2">
          Same tilt effect but without the glare overlay.
        </Text>
      </div>
    ),
    className: 'max-w-sm',
  },
}
