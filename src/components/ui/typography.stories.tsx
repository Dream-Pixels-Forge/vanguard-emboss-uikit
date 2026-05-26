import type { Meta, StoryObj } from '@storybook/react-vite'
import { Typography } from './typography'

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'p', 'lead', 'large', 'small', 'muted'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Typography>

export const Heading1: Story = {
  args: {
    variant: 'h1',
    children: 'This is an h1 heading',
  },
}

export const Heading2: Story = {
  args: {
    variant: 'h2',
    children: 'This is an h2 heading',
  },
}

export const Heading3: Story = {
  args: {
    variant: 'h3',
    children: 'This is an h3 heading',
  },
}

export const Heading4: Story = {
  args: {
    variant: 'h4',
    children: 'This is an h4 heading',
  },
}

export const Paragraph: Story = {
  args: {
    variant: 'p',
    children: 'This is a paragraph with default styling.',
  },
}

export const Lead: Story = {
  args: {
    variant: 'lead',
    children: 'A lead paragraph stands out from regular text.',
  },
}

export const Large: Story = {
  args: {
    variant: 'large',
    children: 'Large text element.',
  },
}

export const Small: Story = {
  args: {
    variant: 'small',
    children: 'Small text element.',
  },
}

export const Muted: Story = {
  args: {
    variant: 'muted',
    children: 'Muted text with reduced visual prominence.',
  },
}
