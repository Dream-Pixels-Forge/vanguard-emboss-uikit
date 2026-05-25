import React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '../../lib/utils'
import { getEmbossShadow, getEmbossBackground } from '../../lib/tailwind-utils'

export interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  error?: boolean
}

export function Slider({ className, error, ...props }: SliderProps) {
  return (
    <SliderPrimitive.Root
      className={cn(
        'relative flex w-full touch-none select-none items-center',
        error && 'space-y-1',
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        className={cn(
          getEmbossBackground(),
          getEmbossShadow('in', 'small'),
          'relative h-2 w-full grow overflow-hidden rounded-full'
        )}
      >
        <SliderPrimitive.Range className="absolute h-full bg-emboss-accent-blue" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={cn(
          getEmbossBackground(),
          getEmbossShadow('out', 'small'),
          'block h-5 w-5 rounded-full',
          'border border-emboss-shadow-light/30 dark:border-emboss-shadow-dark/30',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emboss-accent-blue',
          'transition-transform hover:scale-110 active:scale-95'
        )}
      />
    </SliderPrimitive.Root>
  )
}