import React from 'react'
import { cn } from '../../lib/utils'

export interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
}

export function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: SeparatorProps) {
  const Component = decorative ? 'hr' : 'hr'
  return (
    <Component
      aria-orientation={orientation === 'vertical' ? orientation : undefined}
      className={cn(
        'shrink-0 bg-emboss-shadow-light/30 dark:bg-emboss-shadow-dark/30',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className
      )}
      {...props}
    />
  )
}
