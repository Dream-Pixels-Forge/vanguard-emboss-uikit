import { render, screen } from '@testing-library/react'
import * as UI from './index'
import { describe, it, expect } from 'vitest'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table'

describe('Table', () => {
  it('renders table elements', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Data')).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.Table).toBeDefined()
    expect(UI.TableHeader).toBeDefined()
    expect(UI.TableBody).toBeDefined()
    expect(UI.TableRow).toBeDefined()
    expect(UI.TableHead).toBeDefined()
    expect(UI.TableCell).toBeDefined()
  })
})
