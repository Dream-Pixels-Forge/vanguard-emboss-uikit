import { render, screen } from '@testing-library/react'
import * as UI from './index'
import { describe, it, expect } from 'vitest'
import { DataTable } from './data-table'

describe('DataTable', () => {
  const columns = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'name', header: 'Name' },
  ]
  const data = [
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' },
  ]

  it('renders rows', () => {
    render(<DataTable columns={columns} data={data} />)
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
  })

  it('renders headers', () => {
    render(<DataTable columns={columns} data={data} />)
    expect(screen.getByText('Name')).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.DataTable).toBeDefined()
  })
})
