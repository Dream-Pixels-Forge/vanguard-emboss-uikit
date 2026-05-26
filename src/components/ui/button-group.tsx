import React from 'react'
import { cn } from '../../lib/utils'

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Orientation of the button group */
  orientation?: 'horizontal' | 'vertical'
}

export function ButtonGroup({
  className,
  orientation = 'horizontal',
  children,
  ...props
}: ButtonGroupProps) {
  return (
    <div
      role="group"
      className={cn(
        'inline-flex',
        orientation === 'vertical' && 'flex-col',
        className
      )}
      data-orientation={orientation}
      {...props}
    >
      {children}
    </div>
  )
}
