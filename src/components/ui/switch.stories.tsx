import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Switch } from './switch'
import { Label } from './label'

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  render: () => {
    const [enabled, setEnabled] = useState(false)
    return (
      <div className="flex items-center gap-3">
        <Switch id="airplane-mode" checked={enabled} onCheckedChange={setEnabled} />
        <Label htmlFor="airplane-mode">Airplane Mode {enabled ? 'On' : 'Off'}</Label>
      </div>
    )
  },
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Switch id="off" />
        <Label htmlFor="off">Toggled Off</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="on" defaultChecked />
        <Label htmlFor="on">Toggled On</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="switch-disabled" disabled />
        <Label htmlFor="switch-disabled">Disabled</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="switch-error" error />
        <Label htmlFor="switch-error">Error State</Label>
      </div>
    </div>
  ),
}
