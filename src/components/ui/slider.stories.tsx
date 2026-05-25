import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Slider } from './slider'

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Slider>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState([50])
    return (
      <div className="flex flex-col gap-4 max-w-sm">
        <span className="text-sm text-muted-foreground">Value: {value[0]}</span>
        <Slider value={value} onValueChange={setValue} max={100} step={1} />
      </div>
    )
  },
}

export const Range: Story = {
  render: () => {
    const [value, setValue] = useState([25, 75])
    return (
      <div className="flex flex-col gap-4 max-w-sm">
        <span className="text-sm text-muted-foreground">Range: {value[0]} – {value[1]}</span>
        <Slider value={value} onValueChange={setValue} min={0} max={100} step={1} />
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <div className="max-w-sm">
      <Slider defaultValue={[40]} disabled />
    </div>
  ),
}
