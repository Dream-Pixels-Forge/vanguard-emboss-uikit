import React from 'react'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { cn } from '../../lib/utils'
import { getEmbossShadow, getEmbossBackground } from '../../lib/tailwind-utils'

export type PaginationProps = React.ComponentPropsWithoutRef<'nav'> & {
  total: number
  current: number
  onPageChange: (page: number) => void
  siblingCount?: number
}

function getPageRange(total: number, current: number, siblingCount: number): (number | 'ellipsis')[] {
  const totalPages = total
  const totalPageNumbers = siblingCount * 2 + 5

  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const leftSiblingIndex = Math.max(current - siblingCount, 1)
  const rightSiblingIndex = Math.min(current + siblingCount, totalPages)

  const showLeftEllipsis = leftSiblingIndex > 2
  const showRightEllipsis = rightSiblingIndex < totalPages - 1

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1)
    return [...leftRange, 'ellipsis', totalPages]
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingCount
    const rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + i + 1)
    return [1, 'ellipsis', ...rightRange]
  }

  const middleRange = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, i) => leftSiblingIndex + i
  )
  return [1, 'ellipsis', ...middleRange, 'ellipsis', totalPages]
}

export function Pagination({ className, total, current, onPageChange, siblingCount = 1, ...props }: PaginationProps) {
  const range = getPageRange(total, current, siblingCount)

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    >
      <ul className="flex items-center gap-1">
        <li>
          <button
            onClick={() => onPageChange(current - 1)}
            disabled={current <= 1}
            className={cn(
              getEmbossBackground(),
              getEmbossShadow('out', 'small'),
              'inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm',
              'disabled:pointer-events-none disabled:opacity-50',
              'transition-all hover:scale-105 active:scale-95'
            )}
            aria-label="Go to previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </li>
        {range.map((item, i) => {
          if (item === 'ellipsis') {
            return (
              <li key={`ellipsis-${i}`}>
                <span className="flex h-9 w-9 items-center justify-center">
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </span>
              </li>
            )
          }
          const page = item
          const isActive = page === current
          return (
            <li key={page}>
              <button
                onClick={() => onPageChange(page)}
                disabled={isActive}
                className={cn(
                  isActive
                    ? getEmbossShadow('in', 'small')
                    : cn(getEmbossBackground(), getEmbossShadow('out', 'small')),
                  'inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium',
                  'transition-all hover:scale-105 active:scale-95',
                  isActive ? 'text-foreground' : 'text-muted-foreground',
                  'disabled:pointer-events-none'
                )}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`Page ${page}`}
              >
                {page}
              </button>
            </li>
          )
        })}
        <li>
          <button
            onClick={() => onPageChange(current + 1)}
            disabled={current >= total}
            className={cn(
              getEmbossBackground(),
              getEmbossShadow('out', 'small'),
              'inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm',
              'disabled:pointer-events-none disabled:opacity-50',
              'transition-all hover:scale-105 active:scale-95'
            )}
            aria-label="Go to next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </li>
      </ul>
    </nav>
  )
}
