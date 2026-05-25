import React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { Circle } from 'lucide-react'
import { cn } from '../../lib/utils'
import { getEmbossShadow, getEmbossBackground } from '../../lib/tailwind-utils'

export interface RadioProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  error?: boolean
}

export function Radio({ className, error, ...props }: RadioProps) {
  return (
    <RadioGroupPrimitive.Item
      aria-invalid={error ? true : undefined}
      className={cn(
        getEmbossBackground(),
        getEmbossShadow('in', 'small'),
        'aspect-square h-5 w-5 rounded-full',
        'border border-emboss-shadow-light/30 dark:border-emboss-shadow-dark/30',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emboss-accent-blue',
        'disabled:cursor-not-allowed disabled:opacity-50',
        error && 'ring-2 ring-red-500',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-emboss-accent-blue" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  error?: boolean
}

export function RadioGroup({ className, error, ...props }: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-2', error && 'space-y-1', className)}
      {...props}
    />
  )
}