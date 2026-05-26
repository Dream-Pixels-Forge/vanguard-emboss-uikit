import type { Meta, StoryObj } from '@storybook/react-vite'
import { Combobox } from './combobox'

const meta: Meta<typeof Combobox> = {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Combobox>

const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt.js', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
  { value: 'angular', label: 'Angular' },
  { value: 'vue', label: 'Vue.js' },
]

export const Default: Story = {
  args: {
    items: frameworks,
  },
}

export const WithValue: Story = {
  args: {
    items: frameworks,
    value: 'next.js',
  },
}

export const Disabled: Story = {
  args: {
    items: frameworks,
    disabled: true,
  },
}
