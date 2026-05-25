import type { Meta, StoryObj } from '@storybook/react-vite'
import { RadioGroup, Radio } from './radio'
import { Label } from './label'

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1">
      <div className="flex items-center gap-2">
        <Radio value="option-1" id="r1" />
        <Label htmlFor="r1">Option A</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio value="option-2" id="r2" />
        <Label htmlFor="r2">Option B</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio value="option-3" id="r3" />
        <Label htmlFor="r3">Option C</Label>
      </div>
    </RadioGroup>
  ),
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <RadioGroup defaultValue="enabled">
        <p className="text-sm text-muted-foreground mb-2">Enabled</p>
        <div className="flex items-center gap-2">
          <Radio value="enabled" id="enabled" />
          <Label htmlFor="enabled">Selected</Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio value="disabled" id="radio-disabled" disabled />
          <Label htmlFor="radio-disabled">Disabled</Label>
        </div>
      </RadioGroup>
      <RadioGroup defaultValue="">
        <div className="flex items-center gap-2">
          <Radio value="error" id="radio-error" error />
          <Label htmlFor="radio-error">Error State</Label>
        </div>
      </RadioGroup>
    </div>
  ),
}
