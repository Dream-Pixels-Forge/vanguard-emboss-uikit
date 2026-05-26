import React from 'react'
import { cn } from '../../lib/utils'

export type SpinnerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: 'sm' | 'md' | 'lg'
}

const spinnerSizeMap = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-8 w-8 border-[3px]',
}

export function Spinner({ className, size = 'md', ...props }: SpinnerProps) {
  return (
    <div
      className={cn(
        'animate-spin rounded-full',
        'border-emboss-shadow-light/30 dark:border-emboss-shadow-dark/30',
        'border-t-emboss-accent-blue dark:border-t-emboss-accent-blue',
        spinnerSizeMap[size],
        className
      )}
      role="status"
      aria-label="Loading"
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}
