import type { Meta, StoryObj } from '@storybook/react-vite'
import { DirectionProvider, useDirection } from './direction'
import { Button } from './button'
import { Text } from './text'

function DirectionDemo() {
  const dir = useDirection()
  return (
    <div dir={dir} className="space-y-2">
      <Text variant="h4">Current direction: {dir}</Text>
      <Text variant="p">
        This text renders in {dir === 'ltr' ? 'left-to-right' : 'right-to-left'} mode.
      </Text>
      <Button>{dir === 'ltr' ? '→ Forward' : '← Forward'}</Button>
    </div>
  )
}

const meta: Meta = {
  title: 'Components/Direction',
  tags: ['autodocs'],
}

export default meta

export const LTR: StoryObj = {
  render: () => (
    <DirectionProvider dir="ltr">
      <DirectionDemo />
    </DirectionProvider>
  ),
}

export const RTL: StoryObj = {
  render: () => (
    <DirectionProvider dir="rtl">
      <DirectionDemo />
    </DirectionProvider>
  ),
}
