import type { Meta, StoryObj } from '@storybook/react'
import { SelectorKnob } from './selector-knob'
import {
  Search,
  Star,
  MoreHorizontal,
  RefreshCw,
  ArrowLeft,
  Home,
} from 'lucide-react'

const meta: Meta<typeof SelectorKnob> = {
  title: 'Components/SelectorKnob',
  component: SelectorKnob,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof SelectorKnob>

const defaultItems = [
  { label: 'Home', icon: <Home className="w-5 h-5" />, value: 'home' },
  { label: 'Search', icon: <Search className="w-5 h-5" />, value: 'search' },
  { label: 'Favorites', icon: <Star className="w-5 h-5" />, value: 'favorites' },
  { label: 'More', icon: <MoreHorizontal className="w-5 h-5" />, value: 'more' },
  { label: 'Refresh', icon: <RefreshCw className="w-5 h-5" />, value: 'refresh' },
  { label: 'Back', icon: <ArrowLeft className="w-5 h-5" />, value: 'back' },
]

export const Default: Story = {
  args: {
    items: defaultItems,
    defaultValue: 'home',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-12">
      <div className="flex flex-col items-center gap-2">
        <SelectorKnob items={defaultItems} size="sm" defaultValue="search" />
        <span className="text-xs text-muted-foreground">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <SelectorKnob items={defaultItems} size="md" defaultValue="favorites" />
        <span className="text-xs text-muted-foreground">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <SelectorKnob items={defaultItems} size="lg" defaultValue="refresh" />
        <span className="text-xs text-muted-foreground">Large</span>
      </div>
    </div>
  ),
}

export const CustomItems: Story = {
  args: {
    items: [
      { label: 'A', value: 'a', icon: <span className="font-bold text-sm">A</span> },
      { label: 'B', value: 'b', icon: <span className="font-bold text-sm">B</span> },
      { label: 'C', value: 'c', icon: <span className="font-bold text-sm">C</span> },
      { label: 'D', value: 'd', icon: <span className="font-bold text-sm">D</span> },
      { label: 'E', value: 'e', icon: <span className="font-bold text-sm">E</span> },
      { label: 'F', value: 'f', icon: <span className="font-bold text-sm">F</span> },
    ],
    defaultValue: 'a',
  },
}
