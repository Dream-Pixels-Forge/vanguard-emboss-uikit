import React from 'react'
import { cn } from '../../lib/utils'

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the group takes full width */
  fullWidth?: boolean
}

export function InputGroup({
  className,
  fullWidth = true,
  children,
  ...props
}: InputGroupProps) {
  return (
    <div
      className={cn(
        'flex items-stretch',
        fullWidth && 'w-full',
        // Border-radius is applied via sibling selectors targeting direct children.
        // ⚠️ Wrapping children in arbitrary fragments/divs will break the radius.
        // Pass direct children (Input, InputGroupAddon, etc.) without extra wrappers.
        '[&>:first-child]:rounded-l-lg [&>:first-child]:rounded-r-none',
        '[&>:last-child]:rounded-r-lg [&>:last-child]:rounded-l-none',
        '[&>:not(:first-child):not(:last-child)]:rounded-none',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export interface InputGroupAddonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Side the addon appears on */
  side?: 'left' | 'right'
}

export function InputGroupAddon({
  className,
  children,
  side,
  ...props
}: InputGroupAddonProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center px-3 text-sm text-muted-foreground',
        'bg-emboss-bg-light dark:bg-emboss-bg-dark',
        'border border-emboss-shadow-light/30 dark:border-emboss-shadow-dark/30',
        side === 'left' && 'rounded-l-md border-r-0',
        side === 'right' && 'rounded-r-md border-l-0',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
