import React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cn } from '../../lib/utils'
import { getEmbossBackground, getEmbossShadow } from '../../lib/tailwind-utils'

export function TooltipProvider({ delayDuration = 300, skipDelayDuration = 300, children, ...props }: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider delayDuration={delayDuration} skipDelayDuration={skipDelayDuration} {...props}>{children}</TooltipPrimitive.Provider>
}

export interface TooltipProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root> {}

export function Tooltip({ ...props }: TooltipProps) {
  return <TooltipPrimitive.Root {...props} />
}

export interface TooltipTriggerProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger> {}

export function TooltipTrigger({ className, ...props }: TooltipTriggerProps) {
  return <TooltipPrimitive.Trigger className={cn('inline-flex', className)} {...props} />
}

export interface TooltipContentProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {}

export const TooltipContent = React.forwardRef<React.ElementRef<typeof TooltipPrimitive.Content>, TooltipContentProps>(
  function TooltipContent({ className, sideOffset = 4, ...props }, ref) {
    return (
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          ref={ref}
          sideOffset={sideOffset}
          className={cn(
            getEmbossBackground(),
            getEmbossShadow('out', 'small'),
            'z-50 rounded-md px-3 py-1.5 text-xs font-medium',
            'animate-in fade-in-0 zoom-in-95',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
            className
          )}
          {...props}
        />
      </TooltipPrimitive.Portal>
    )
  }
)
