import type { Meta, StoryObj } from '@storybook/react-vite'
import { EmbossBox } from './emboss-box'

const meta: Meta<typeof EmbossBox> = {
  title: 'Components/EmbossBox',
  component: EmbossBox,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof EmbossBox>

export const Default: Story = {
  args: {
    children: 'EmbossBox content',
  },
}
