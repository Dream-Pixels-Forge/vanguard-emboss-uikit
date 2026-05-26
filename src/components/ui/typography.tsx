import React from 'react'
import { cn } from '../../lib/utils'

/** @deprecated Use `Text` component instead. Typography is kept for backward compatibility but `Text` provides more variants, weight control, accent colors, and muted support. */
export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'lead' | 'large' | 'small' | 'muted'

/** @deprecated Use `Text` component instead. Will be removed in a future major version. */
export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant
  as?: React.ElementType
}

const variantStyles: Record<TypographyVariant, string> = {
  h1: 'scroll-m-20 text-4xl font-bold tracking-tight',
  h2: 'scroll-m-20 text-3xl font-semibold tracking-tight',
  h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
  h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
  p: 'leading-7',
  lead: 'text-xl text-muted-foreground',
  large: 'text-lg font-semibold',
  small: 'text-sm font-medium leading-none',
  muted: 'text-sm text-muted-foreground',
}

const defaultTags: Record<TypographyVariant, React.ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  p: 'p',
  lead: 'p',
  large: 'div',
  small: 'small',
  muted: 'p',
}

/** @deprecated Use `Text` component instead. Will be removed in a future major version. */
export function Typography({
  className,
  variant = 'p',
  as,
  ...props
}: TypographyProps) {
  const Tag = as ?? defaultTags[variant]
  return (
    <Tag
      className={cn(variantStyles[variant], className)}
      {...props}
    />
  )
}
