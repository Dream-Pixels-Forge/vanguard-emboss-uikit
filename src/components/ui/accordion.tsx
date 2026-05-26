import React, { forwardRef } from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cn } from '../../lib/utils'
import { getEmbossBackground, getEmbossBorder } from '../../lib/tailwind-utils'
import { ChevronDown } from 'lucide-react'

export type AccordionProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>

export function Accordion({ className, ...props }: AccordionProps) {
  return (
    <AccordionPrimitive.Root
      className={cn('w-full', className)}
      {...props}
    />
  )
}

export interface AccordionItemProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {}

export function AccordionItem({ className, ...props }: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item
      className={cn(
        getEmbossBorder(),
        'border-b',
        className
      )}
      {...props}
    />
  )
}

export interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {}

export const AccordionTrigger = forwardRef<React.ElementRef<typeof AccordionPrimitive.Trigger>, AccordionTriggerProps>(
  function AccordionTrigger({ className, children, ...props }, ref) {
    return (
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
          ref={ref}
          className={cn(
            getEmbossBackground(),
            'flex w-full items-center justify-between py-4 text-sm font-medium spring-all [&[data-state=open]>svg]:rotate-180',
            className
          )}
          {...props}
        >
          {children}
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    )
  }
)

export interface AccordionContentProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {}

export const AccordionContent = forwardRef<React.ElementRef<typeof AccordionPrimitive.Content>, AccordionContentProps>(
  function AccordionContent({ className, children, ...props }, ref) {
    return (
      <AccordionPrimitive.Content
        ref={ref}
        className={cn(
          'pb-4 pt-0 text-sm',
          className
        )}
        {...props}
      >
        <div>{children}</div>
      </AccordionPrimitive.Content>
    )
  }
)
