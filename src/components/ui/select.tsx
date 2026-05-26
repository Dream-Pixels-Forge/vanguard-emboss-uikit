import React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '../../lib/utils'
import { getEmbossShadow, getEmbossBackground } from '../../lib/tailwind-utils'

export type SelectProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>

export function Select({ ...props }: SelectProps) {
  return <SelectPrimitive.Root {...props} />
}

export type SelectGroupProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Group>

export function SelectGroup({ ...props }: SelectGroupProps) {
  return <SelectPrimitive.Group {...props} />
}

export type SelectValueProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value>

export function SelectValue({ ...props }: SelectValueProps) {
  return <SelectPrimitive.Value {...props} />
}

export interface SelectTriggerProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  error?: boolean
}

export const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  function SelectTrigger({ className, error, children, ...props }, ref) {
    return (
      <SelectPrimitive.Trigger
        ref={ref}
        aria-invalid={error ? true : undefined}
        className={cn(
          getEmbossBackground(),
          getEmbossShadow('in', 'small'),
          'flex h-10 w-full items-center justify-between rounded-lg px-3 py-2',
          'text-sm text-foreground',
          'border border-transparent',
          'focus:outline-none focus:ring-2 focus:ring-emboss-accent-blue',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error && 'ring-2 ring-red-500',
          className
        )}
        {...props}
      >
        {children}
        <SelectPrimitive.Icon asChild>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    )
  }
)
SelectTrigger.displayName = 'SelectTrigger'

export type SelectContentProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>

export function SelectContent({ className, children, position = 'popper', ...props }: SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cn(
          getEmbossBackground(),
          getEmbossShadow('out'),
          'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-lg',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className
        )}
        position={position}
        {...props}
      >
        <SelectPrimitive.ScrollUpButton className="flex cursor-default items-center justify-center py-1">
          <ChevronUp className="h-4 w-4" />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport
          className={cn(
            'p-1',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="flex cursor-default items-center justify-center py-1">
          <ChevronDown className="h-4 w-4" />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

export type SelectItemProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>

export function SelectItem({ className, children, ...props }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      className={cn(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2',
        'text-sm outline-none',
        'focus:bg-emboss-shadow-light/10 dark:focus:bg-emboss-shadow-dark/10',
        'focus:text-foreground',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

export type SelectLabelProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>

export function SelectLabel({ className, ...props }: SelectLabelProps) {
  return (
    <SelectPrimitive.Label
      className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
      {...props}
    />
  )
}

export type SelectSeparatorProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>

export function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  return (
    <SelectPrimitive.Separator
      className={cn('-mx-1 my-1 h-px bg-emboss-shadow-light/20 dark:bg-emboss-shadow-dark/20', className)}
      {...props}
    />
  )
}