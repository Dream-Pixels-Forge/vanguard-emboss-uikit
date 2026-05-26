import type { Meta, StoryObj } from '@storybook/react'
import { ChartContainer, ChartTooltipContent, ChartLegendContent } from './chart'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const meta: Meta<typeof ChartContainer> = {
  title: 'vanguard/Chart',
  component: ChartContainer,
}
export default meta

type Story = StoryObj<typeof ChartContainer>

const data = [
  { month: 'Jan', revenue: 400, profit: 240 },
  { month: 'Feb', revenue: 300, profit: 139 },
  { month: 'Mar', revenue: 500, profit: 380 },
  { month: 'Apr', revenue: 450, profit: 320 },
  { month: 'May', revenue: 600, profit: 410 },
  { month: 'Jun', revenue: 550, profit: 390 },
]

export const LineChartStory: Story = {
  render: () => (
    <ChartContainer config={{ revenue: { label: 'Revenue', color: '#2563eb' }, profit: { label: 'Profit', color: '#16a34a' } }}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
          <YAxis stroke="var(--color-muted-foreground)" />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend content={<ChartLegendContent />} />
          <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} />
          <Line type="monotone" dataKey="profit" stroke="var(--color-profit)" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  ),
}

export const BarChartStory: Story = {
  render: () => (
    <ChartContainer config={{ revenue: { label: 'Revenue', color: '#2563eb' } }}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
          <YAxis stroke="var(--color-muted-foreground)" />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend content={<ChartLegendContent />} />
          <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  ),
}
