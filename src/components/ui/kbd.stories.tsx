import type { Meta, StoryObj } from '@storybook/react-vite'
import { Kbd } from './kbd'

const meta: Meta<typeof Kbd> = {
  title: 'Components/Kbd',
  component: Kbd,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Kbd>

export const Default: Story = {
  render: () => <Kbd>⌘K</Kbd>,
}

export const ModifierCombos: Story = {
  render: () => (
    <div className="flex gap-4">
      <Kbd>⌘S</Kbd>
      <Kbd>⌘⇧P</Kbd>
      <Kbd>⌥F4</Kbd>
      <Kbd>Ctrl+C</Kbd>
    </div>
  ),
}
