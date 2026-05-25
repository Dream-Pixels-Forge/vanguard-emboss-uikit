import React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '../../lib/utils'
import { getEmbossShadow, getEmbossBackground, withDataStateShadow } from '../../lib/tailwind-utils'

export interface TabsProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {}

export function Tabs({ className, ...props }: TabsProps) {
  return (
    <TabsPrimitive.Root
      className={cn('flex flex-col', className)}
      {...props}
    />
  )
}

export interface TabsListProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {}

export function TabsList({ className, ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      className={cn(
        getEmbossBackground(),
        getEmbossShadow('in', 'small'),
        'inline-flex h-10 items-center justify-center rounded-lg p-1',
        className
      )}
      {...props}
    />
  )
}

export interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {}

export function TabsTrigger({ className, ...props }: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        getEmbossBackground(),
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium',
        'ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        withDataStateShadow('data-[state=active]', 'out', 'small'),
        'data-[state=active]:text-foreground',
        'data-[state=inactive]:text-muted-foreground',
        className
      )}
      {...props}
    />
  )
}

export interface TabsContentProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {}

export function TabsContent({ className, ...props }: TabsContentProps) {
  return (
    <TabsPrimitive.Content
      className={cn(
        'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className
      )}
      {...props}
    />
  )
}