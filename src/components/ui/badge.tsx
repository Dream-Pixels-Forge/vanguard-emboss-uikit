import React from 'react'
import { cn } from '../../lib/utils'
import { getEmbossShadow, getEmbossBackground } from '../../lib/tailwind-utils'
import { cva, type VariantProps } from 'class-variance-authority'

const badgeVariants = cva(
  cn(
    getEmbossBackground(),
    getEmbossShadow('out', 'small'),
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
    'transition-colors duration-200'
  ),
  {
    variants: {
      variant: {
        default: 'text-foreground',
        accent: 'bg-emboss-accent-blue text-white',
        success: 'bg-emboss-accent-green text-white',
        warning: 'bg-emboss-accent-orange text-white',
        outline: 'border border-emboss-shadow-light/30 dark:border-emboss-shadow-dark/30 text-foreground',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}