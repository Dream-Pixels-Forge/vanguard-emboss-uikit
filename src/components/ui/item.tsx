import React from 'react'
import { cn } from '../../lib/utils'

export interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual style variant */
  variant?: 'default' | 'card'
}

export function Item({
  className,
  variant = 'default',
  children,
  ...props
}: ItemProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-3',
        variant === 'card' && 'rounded-lg border border-emboss-shadow-light/30 dark:border-emboss-shadow-dark/30 p-3',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export interface ItemMediaProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ItemMedia({
  className,
  children,
  ...props
}: ItemMediaProps) {
  return (
    <div
      className={cn('flex-shrink-0', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export interface ItemContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ItemContent({
  className,
  children,
  ...props
}: ItemContentProps) {
  return (
    <div
      className={cn('flex-1 min-w-0', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export interface ItemTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function ItemTitle({
  className,
  children,
  ...props
}: ItemTitleProps) {
  return (
    <h4
      className={cn('text-sm font-medium text-foreground', className)}
      {...props}
    >
      {children}
    </h4>
  )
}

export interface ItemDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function ItemDescription({
  className,
  children,
  ...props
}: ItemDescriptionProps) {
  return (
    <p
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    >
      {children}
    </p>
  )
}

export interface ItemActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ItemActions({
  className,
  children,
  ...props
}: ItemActionsProps) {
  return (
    <div
      className={cn('flex-shrink-0 flex items-center gap-1', className)}
      {...props}
    >
      {children}
    </div>
  )
}
