import React from 'react'
import { cn } from '../../lib/utils'
import { getEmbossBackground, getEmbossShadow } from '../../lib/tailwind-utils'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circle' | 'card'
}

export function Skeleton({ className, variant = 'text', ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        getEmbossBackground(),
        getEmbossShadow('in', 'small'),
        'animate-pulse',
        variant === 'circle' && 'rounded-full',
        variant === 'text' && 'h-4 w-full rounded-md',
        variant === 'card' && 'h-32 w-full rounded-xl',
        className
      )}
      {...props}
    />
  )
}
