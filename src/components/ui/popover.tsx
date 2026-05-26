import React, { forwardRef } from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { cn } from '../../lib/utils'
import { getEmbossBackground, getEmbossShadow, getEmbossBorder } from '../../lib/tailwind-utils'

export interface PopoverProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root> {}

export function Popover({ ...props }: PopoverProps) {
  return <PopoverPrimitive.Root {...props} />
}

export interface PopoverTriggerProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger> {}

export function PopoverTrigger({ className, asChild, ...props }: PopoverTriggerProps) {
  return (
    <PopoverPrimitive.Trigger
      asChild={asChild}
      className={asChild ? undefined : cn(
        getEmbossBackground(),
        'inline-flex items-center justify-center rounded-md px-4 py-2',
        'text-sm font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
}

export interface PopoverContentProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {}

export const PopoverContent = forwardRef<React.ElementRef<typeof PopoverPrimitive.Content>, PopoverContentProps>(
  function PopoverContent({ className, align = 'center', sideOffset = 4, ...props }, ref) {
    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          ref={ref}
          align={align}
          sideOffset={sideOffset}
          className={cn(
            getEmbossBackground(),
            getEmbossShadow('out'),
            getEmbossBorder(),
            'z-50 w-72 rounded-xl border p-4',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            'data-[side=bottom]:slide-in-from-top-2',
            'data-[side=left]:slide-in-from-right-2',
            'data-[side=right]:slide-in-from-left-2',
            'data-[side=top]:slide-in-from-bottom-2',
            className
          )}
          {...props}
        />
      </PopoverPrimitive.Portal>
    )
  }
)
