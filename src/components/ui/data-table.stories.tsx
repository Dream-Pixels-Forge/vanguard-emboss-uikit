import type { Meta, StoryObj } from '@storybook/react'
import { DataTable } from './data-table'
import type { ColumnDef } from '@tanstack/react-table'

type Payment = {
  id: string
  amount: number
  status: 'pending' | 'completed' | 'failed'
  email: string
}

const columns: ColumnDef<Payment>[] = [
  { accessorKey: 'id', header: 'ID', enableSorting: false },
  { accessorKey: 'amount', header: 'Amount' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'email', header: 'Email' },
]

const data: Payment[] = [
  { id: '1', amount: 100, status: 'completed', email: 'a@example.com' },
  { id: '2', amount: 200, status: 'pending', email: 'b@example.com' },
  { id: '3', amount: 300, status: 'failed', email: 'c@example.com' },
]

const meta: Meta<typeof DataTable> = {
  title: 'vanguard/DataTable',
  component: DataTable,
}
export default meta

type Story = StoryObj<typeof DataTable>

export const Default: Story = {
  render: () => <DataTable columns={columns} data={data} />,
}

export const WithFilter: Story = {
  render: () => <DataTable columns={columns} data={data} filterable filterColumn="email" />,
}
