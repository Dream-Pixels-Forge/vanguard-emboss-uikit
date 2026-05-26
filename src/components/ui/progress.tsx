import React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '../../lib/utils'
import { getEmbossShadow, getEmbossBackground } from '../../lib/tailwind-utils'

export interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: { root: 'h-2', indicator: '' },
  md: { root: 'h-3', indicator: '' },
  lg: { root: 'h-4', indicator: '' },
}

export function Progress({ className, value, size = 'md', ...props }: ProgressProps) {
  const s = sizeMap[size]
  return (
    <ProgressPrimitive.Root
      className={cn(
        getEmbossBackground(),
        getEmbossShadow('in', 'small'),
        s.root,
        'relative w-full overflow-hidden rounded-full',
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          s.indicator,
          'h-full w-full flex-1 rounded-full bg-emboss-accent-blue',
          'transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]'
        )}
        style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}
