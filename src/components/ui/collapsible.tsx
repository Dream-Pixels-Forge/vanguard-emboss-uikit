import React from 'react'
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import { cn } from '../../lib/utils'
import { getEmbossBackground, getEmbossShadow } from '../../lib/tailwind-utils'
import { ChevronDown } from 'lucide-react'

export type CollapsibleProps = React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>

export function Collapsible({ className, ...props }: CollapsibleProps) {
  return <CollapsiblePrimitive.Root className={cn('w-full', className)} {...props} />
}

export interface CollapsibleTriggerProps
  extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger> {
  showIcon?: boolean
}

export function CollapsibleTrigger({
  className,
  children,
  showIcon = true,
  ...props
}: CollapsibleTriggerProps) {
  return (
    <CollapsiblePrimitive.Trigger
      className={cn(
        getEmbossBackground(),
        getEmbossShadow('out', 'small'),
        'flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium',
        'transition-all hover:scale-[1.02] active:scale-[0.98]',
        'data-[state=open]:shadow-emboss-in-light-sm data-[state=open]:dark:shadow-emboss-in-dark-sm',
        className
      )}
      {...props}
    >
      {children}
      {showIcon && (
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-muted-foreground',
            'transition-transform duration-200',
            'data-[state=open]:rotate-180'
          )}
        />
      )}
    </CollapsiblePrimitive.Trigger>
  )
}

export type CollapsibleContentProps = React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>

export function CollapsibleContent({ className, children, ...props }: CollapsibleContentProps) {
  return (
    <CollapsiblePrimitive.Content
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:slide-out-to-top-1 data-[state=open]:slide-in-from-top-1',
        className
      )}
      {...props}
    >
      <div className="px-4 py-3 text-sm text-muted-foreground">{children}</div>
    </CollapsiblePrimitive.Content>
  )
}
