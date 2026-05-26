import React from 'react'
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'
import { cn } from '../../lib/utils'
import { getEmbossBackground, getEmbossShadow, getEmbossBorder } from '../../lib/tailwind-utils'
import { Check, ChevronRight, Circle } from 'lucide-react'

export type ContextMenuProps = React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Root>

export function ContextMenu({ ...props }: ContextMenuProps) {
  return <ContextMenuPrimitive.Root {...props} />
}

export type ContextMenuTriggerProps = React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Trigger>

export function ContextMenuTrigger({ className, ...props }: ContextMenuTriggerProps) {
  return (
    <ContextMenuPrimitive.Trigger
      className={cn('inline-flex cursor-context-menu', className)}
      {...props}
    />
  )
}

export type ContextMenuPortalProps = React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Portal>

export function ContextMenuPortal({ ...props }: ContextMenuPortalProps) {
  return <ContextMenuPrimitive.Portal {...props} />
}

export type ContextMenuSubProps = React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Sub>

export function ContextMenuSub({ ...props }: ContextMenuSubProps) {
  return <ContextMenuPrimitive.Sub {...props} />
}

export type ContextMenuRadioGroupProps = React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioGroup>

export function ContextMenuRadioGroup({ ...props }: ContextMenuRadioGroupProps) {
  return <ContextMenuPrimitive.RadioGroup {...props} />
}

export interface ContextMenuSubTriggerProps extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> {
  inset?: boolean
}

export function ContextMenuSubTrigger({ className, inset, children, ...props }: ContextMenuSubTriggerProps) {
  return (
    <ContextMenuPrimitive.SubTrigger
      className={cn(
        getEmbossBackground(),
        'flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm font-medium outline-none',
        'hover:bg-emboss-shadow-light/10 dark:hover:bg-emboss-shadow-dark/10',
        'data-[state=open]:bg-emboss-shadow-light/10 dark:data-[state=open]:bg-emboss-shadow-dark/10',
        inset && 'pl-8',
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </ContextMenuPrimitive.SubTrigger>
  )
}

export type ContextMenuSubContentProps = React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>

export function ContextMenuSubContent({ className, ...props }: ContextMenuSubContentProps) {
  return (
    <ContextMenuPrimitive.SubContent
      className={cn(
        getEmbossBackground(),
        getEmbossShadow('out', 'small'),
        getEmbossBorder(),
        'z-50 min-w-32 overflow-hidden rounded-xl p-1',
        'animate-in fade-in-0 zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        className
      )}
      {...props}
    />
  )
}

export type ContextMenuContentProps = React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>

export function ContextMenuContent({ className, ...props }: ContextMenuContentProps) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        className={cn(
          getEmbossBackground(),
          getEmbossShadow('out', 'small'),
          getEmbossBorder(),
          'z-50 min-w-32 overflow-hidden rounded-xl p-1 shadow-lg',
          'animate-in fade-in-0 zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          className
        )}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  )
}

export interface ContextMenuItemProps extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> {
  inset?: boolean
}

export function ContextMenuItem({ className, inset, ...props }: ContextMenuItemProps) {
  return (
    <ContextMenuPrimitive.Item
      className={cn(
        'relative flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm font-medium outline-none',
        'hover:bg-emboss-shadow-light/10 dark:hover:bg-emboss-shadow-dark/10',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        inset && 'pl-8',
        className
      )}
      {...props}
    />
  )
}

export type ContextMenuCheckboxItemProps = React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>

export function ContextMenuCheckboxItem({ className, children, checked, ...props }: ContextMenuCheckboxItemProps) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      className={cn(
        'relative flex cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm font-medium outline-none',
        'hover:bg-emboss-shadow-light/10 dark:hover:bg-emboss-shadow-dark/10',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  )
}

export type ContextMenuRadioItemProps = React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>

export function ContextMenuRadioItem({ className, children, ...props }: ContextMenuRadioItemProps) {
  return (
    <ContextMenuPrimitive.RadioItem
      className={cn(
        'relative flex cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm font-medium outline-none',
        'hover:bg-emboss-shadow-light/10 dark:hover:bg-emboss-shadow-dark/10',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <Circle className="h-2 w-2 fill-current" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  )
}

export interface ContextMenuLabelProps extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> {
  inset?: boolean
}

export function ContextMenuLabel({ className, inset, ...props }: ContextMenuLabelProps) {
  return (
    <ContextMenuPrimitive.Label
      className={cn(
        'px-2 py-1.5 text-xs font-semibold text-muted-foreground',
        inset && 'pl-8',
        className
      )}
      {...props}
    />
  )
}

export type ContextMenuSeparatorProps = React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>

export function ContextMenuSeparator({ className, ...props }: ContextMenuSeparatorProps) {
  return (
    <ContextMenuPrimitive.Separator
      className={cn('mx-1 my-1 h-px bg-emboss-shadow-light/30 dark:bg-emboss-shadow-dark/30', className)}
      {...props}
    />
  )
}

export type ContextMenuShortcutProps = React.HTMLAttributes<HTMLSpanElement>

export function ContextMenuShortcut({ className, ...props }: ContextMenuShortcutProps) {
  return (
    <span
      className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)}
      {...props}
    />
  )
}
