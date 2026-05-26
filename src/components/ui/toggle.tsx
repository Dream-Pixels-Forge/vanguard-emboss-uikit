import React from 'react'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { cn } from '../../lib/utils'
import { getEmbossShadow, getEmbossBackground } from '../../lib/tailwind-utils'

// ─── Standalone Toggle ───

export type ToggleProps = React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & {
  size?: 'sm' | 'md' | 'lg'
}

const toggleSizeMap = {
  sm: 'h-8 px-2.5 text-xs',
  md: 'h-9 px-3 text-sm',
  lg: 'h-10 px-4 text-base',
}

export function Toggle({ className, size = 'md', ...props }: ToggleProps) {
  return (
    <TogglePrimitive.Root
      className={cn(
        getEmbossBackground(),
        toggleSizeMap[size],
        'inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium',
        'ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'disabled:pointer-events-none disabled:opacity-50',
        'data-[state=on]:shadow-emboss-in-light-sm data-[state=on]:dark:shadow-emboss-in-dark-sm',
        'data-[state=on]:text-foreground',
        'text-muted-foreground hover:text-foreground',
        getEmbossShadow('out', 'small'),
        className
      )}
      {...props}
    />
  )
}

// ─── Toggle Group ───

type ToggleGroupContextValue = {
  size: 'sm' | 'md' | 'lg'
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({ size: 'md' })

export type ToggleGroupProps = React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & {
  size?: 'sm' | 'md' | 'lg'
}

export function ToggleGroup({ className, size = 'md', children, ...props }: ToggleGroupProps) {
  return (
    <ToggleGroupContext.Provider value={{ size }}>
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
    </ToggleGroupContext.Provider>
  )
}

export type ToggleGroupItemProps = React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & {
  size?: 'sm' | 'md' | 'lg'
}

export function ToggleGroupItem({ className, size: sizeProp, children, ...props }: ToggleGroupItemProps) {
  const { size } = React.useContext(ToggleGroupContext)
  const activeSize = sizeProp ?? size
  return (
    <ToggleGroupPrimitive.Item
      className={cn(
        getEmbossBackground(),
        toggleSizeMap[activeSize],
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
