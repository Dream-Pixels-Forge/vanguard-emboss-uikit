import type { Meta, StoryObj } from '@storybook/react-vite'
import { Breadcrumb } from './breadcrumb'

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
    showHome: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Breadcrumb>

export const Default: Story = {
  args: {
    items: [
      { label: 'Products', href: '/products' },
      { label: 'Categories', href: '/categories' },
      { label: 'Current Item' },
    ],
  },
}

export const WithoutHome: Story = {
  args: {
    showHome: false,
    items: [
      { label: 'Docs', href: '/docs' },
      { label: 'Components', href: '/components' },
      { label: 'Breadcrumb' },
    ],
  },
}

export const DeepNavigation: Story = {
  args: {
    items: [
      { label: 'Settings', href: '/settings' },
      { label: 'Account', href: '/settings/account' },
      { label: 'Profile', href: '/settings/account/profile' },
      { label: 'Edit' },
    ],
  },
}
