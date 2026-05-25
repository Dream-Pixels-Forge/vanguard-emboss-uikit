import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text } from './text'

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'label', 'xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'],
    },
    weight: {
      control: 'select',
      options: ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'],
    },
    muted: { control: 'boolean' },
    accent: {
      control: 'select',
      options: ['', 'blue', 'orange', 'green'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Text>

export const Default: Story = {
  args: {
    variant: 'p',
    children: 'This is a paragraph with the default emboss theme typography.',
  },
}

export const HeadingLevels: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Text variant="h1">Heading 1</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="h3">Heading 3</Text>
      <Text variant="h4">Heading 4</Text>
    </div>
  ),
}

export const TextStyling: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Text variant="p">Regular paragraph text.</Text>
      <Text variant="p" muted>Muted paragraph with reduced emphasis.</Text>
      <Text variant="sm">Small text for captions and labels.</Text>
      <Text variant="lg">Larger text for emphasis.</Text>
      <Text variant="p" weight="bold">Bold paragraph text.</Text>
      <Text variant="p" accent="blue">Accented text in blue.</Text>
      <Text variant="p" accent="green">Accented text in green.</Text>
      <Text variant="p" accent="orange">Accented text in orange.</Text>
    </div>
  ),
}
