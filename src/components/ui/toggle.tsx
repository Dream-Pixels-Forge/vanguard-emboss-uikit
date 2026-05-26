import React from 'react'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { cn } from '../../lib/utils'
import { getEmbossShadow, getEmbossBackground } from '../../lib/tailwind-utils'

export type ToggleGroupProps = React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & {
  size?: 'sm' | 'md' | 'lg'
}

export function ToggleGroup({ className, size = 'md', children, ...props }: ToggleGroupProps) {
  return (
    <ToggleGroupPrimitive.Root
      className={cn(
        getEmbossBackground(),
        getEmbossShadow('in', 'small'),
        'inline-flex items-center justify-center rounded-lg gap-1 p-1',
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Root>
  )
}

const toggleSizeMap = {
  sm: 'h-8 px-2.5 text-xs',
  md: 'h-9 px-3 text-sm',
  lg: 'h-10 px-4 text-base',
}

export type ToggleGroupItemProps = React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & {
  size?: 'sm' | 'md' | 'lg'
}

export function ToggleGroupItem({ className, size = 'md', children, ...props }: ToggleGroupItemProps) {
  return (
    <ToggleGroupPrimitive.Item
      className={cn(
        getEmbossBackground(),
        toggleSizeMap[size],
        'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium',
        'ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'disabled:pointer-events-none disabled:opacity-50',
        'data-[state=on]:shadow-emboss-in-light-sm data-[state=on]:dark:shadow-emboss-in-dark-sm',
        'data-[state=off]:text-muted-foreground data-[state=on]:text-foreground',
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}
