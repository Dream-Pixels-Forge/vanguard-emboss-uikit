import React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cn } from '../../lib/utils'
import { getEmbossShadow, getEmbossBackground } from '../../lib/tailwind-utils'

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  error?: boolean
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  function Switch({ className, error, ...props }, ref) {
    return (
      <SwitchPrimitive.Root
        ref={ref}
        aria-invalid={error ? true : undefined}
        className={cn(
          getEmbossBackground(),
          getEmbossShadow('in', 'small'),
          'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full',
          'border border-emboss-shadow-light/30 dark:border-emboss-shadow-dark/30',
          'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emboss-accent-blue',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'data-[state=checked]:bg-emboss-accent-blue',
          error && 'ring-2 ring-red-500',
          className
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            getEmbossBackground(),
            getEmbossShadow('out', 'small'),
            'pointer-events-none block h-5 w-5 rounded-full',
            'transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5'
          )}
        />
      </SwitchPrimitive.Root>
    )
  }
)
Switch.displayName = 'Switch'