import React from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
} from '@tanstack/react-table'
import { cn } from '../../lib/utils'
import { getEmbossBackground } from '../../lib/tailwind-utils'
import { ChevronUp, ChevronDown, ChevronsUpDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { Input } from './input'

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  filterable?: boolean
  filterPlaceholder?: string
  filterColumn?: string
  pageSize?: number
  className?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterable = false,
  filterPlaceholder = 'Filter...',
  filterColumn,
  pageSize = 10,
  className,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    state: { sorting, columnFilters, columnVisibility, pagination },
  })

  const filterCol = filterColumn || (columns[0]?.id as string) || ''

  return (
    <div className={cn('w-full', className)}>
      {filterable && (
        <div className="flex items-center py-4">
          <Input
            placeholder={filterPlaceholder}
            value={(table.getColumn(filterCol)?.getFilterValue() as string) ?? ''}
            onChange={(e) => table.getColumn(filterCol)?.setFilterValue(e.target.value)}
            className="max-w-sm"
          />
        </div>
      )}
      <div className="rounded-xl border border-emboss-shadow-light/30 dark:border-emboss-shadow-dark/30 overflow-hidden">
        <table className="w-full caption-bottom text-sm">
          <thead className={cn(getEmbossBackground(), '[&_tr]:border-b')}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={cn(
                      'h-12 px-4 text-left align-middle font-medium text-muted-foreground',
                      header.column.getCanSort() && 'cursor-pointer select-none hover:text-foreground'
                    )}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        header.column.getIsSorted() === 'asc' ? <ChevronUp className="h-3 w-3" /> :
                        header.column.getIsSorted() === 'desc' ? <ChevronDown className="h-3 w-3" /> :
                        <ChevronsUpDown className="h-3 w-3 opacity-40" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className={cn('[&_tr:last-child]:border-0')}>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={cn(
                    'border-b border-emboss-shadow-light/30 dark:border-emboss-shadow-dark/30',
                    'transition-colors hover:bg-emboss-shadow-light/10 dark:hover:bg-emboss-shadow-dark/10'
                  )}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-4 align-middle">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className="flex items-center gap-2">
          <button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            className={cn(
              getEmbossBackground(),
              'shadow-emboss-out-light-sm dark:shadow-emboss-out-dark-sm',
              'flex h-8 w-8 items-center justify-center rounded-lg',
              'transition-all hover:scale-105 active:scale-95',
              'disabled:pointer-events-none disabled:opacity-50'
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            className={cn(
              getEmbossBackground(),
              'shadow-emboss-out-light-sm dark:shadow-emboss-out-dark-sm',
              'flex h-8 w-8 items-center justify-center rounded-lg',
              'transition-all hover:scale-105 active:scale-95',
              'disabled:pointer-events-none disabled:opacity-50'
            )}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
