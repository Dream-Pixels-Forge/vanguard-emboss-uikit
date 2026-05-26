import React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { cn } from '../../lib/utils'
import { getEmbossShadow, getEmbossBackground, withDataStateShadow } from '../../lib/tailwind-utils'

export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  error?: boolean
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  function Checkbox({ className, error, ...props }, ref) {
    return (
      <CheckboxPrimitive.Root
        ref={ref}
        aria-invalid={error ? true : undefined}
        className={cn(
          getEmbossBackground(),
          getEmbossShadow('in', 'small'),
          'peer h-5 w-5 shrink-0 rounded-md',
          'border border-emboss-shadow-light/30 dark:border-emboss-shadow-dark/30',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emboss-accent-blue',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'data-[state=checked]:bg-emboss-accent-blue data-[state=checked]:text-white',
          withDataStateShadow('data-[state=checked]', 'out', 'small'),
          error && 'ring-2 ring-red-500',
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
          <Check className="h-3.5 w-3.5" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    )
  }
)
Checkbox.displayName = 'Checkbox'