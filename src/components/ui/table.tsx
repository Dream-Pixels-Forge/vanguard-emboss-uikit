import React from 'react'
import { cn } from '../../lib/utils'

export type TableProps = React.HTMLAttributes<HTMLTableElement>

export function Table({ className, ...props }: TableProps) {
  return (
    <div className="relative w-full overflow-auto rounded-xl border border-emboss-shadow-light/30 dark:border-emboss-shadow-dark/30">
      <table
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  )
}

export type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement>

export function TableHeader({ className, ...props }: TableHeaderProps) {
  return (
    <thead
      className={cn(
        '[&_tr]:border-b border-emboss-shadow-light/20 dark:border-emboss-shadow-dark/20',
        className
      )}
      {...props}
    />
  )
}

export type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>

export function TableBody({ className, ...props }: TableBodyProps) {
  return (
    <tbody
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  )
}

export type TableFooterProps = React.HTMLAttributes<HTMLTableSectionElement>

export function TableFooter({ className, ...props }: TableFooterProps) {
  return (
    <tfoot
      className={cn(
        'border-t border-emboss-shadow-light/20 dark:border-emboss-shadow-dark/20',
        'font-medium',
        className
      )}
      {...props}
    />
  )
}

export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>

export function TableRow({ className, ...props }: TableRowProps) {
  return (
    <tr
      className={cn(
        'border-b border-emboss-shadow-light/20 dark:border-emboss-shadow-dark/20',
        'transition-colors hover:bg-emboss-shadow-light/5 dark:hover:bg-emboss-shadow-dark/5',
        'data-[state=selected]:bg-emboss-shadow-light/10 dark:data-[state=selected]:bg-emboss-shadow-dark/10',
        className
      )}
      {...props}
    />
  )
}

export type TableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement>

export function TableHead({ className, ...props }: TableHeadProps) {
  return (
    <th
      className={cn(
        'h-12 px-4 text-left align-middle font-medium text-muted-foreground',
        '[&:has([role=checkbox])]:pr-0',
        className
      )}
      {...props}
    />
  )
}

export type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>

export function TableCell({ className, ...props }: TableCellProps) {
  return (
    <td
      className={cn(
        'p-4 align-middle [&:has([role=checkbox])]:pr-0',
        className
      )}
      {...props}
    />
  )
}

export type TableCaptionProps = React.HTMLAttributes<HTMLTableCaptionElement>

export function TableCaption({ className, ...props }: TableCaptionProps) {
  return (
    <caption
      className={cn('mt-4 text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}
