import React from 'react'
import * as MenubarPrimitive from '@radix-ui/react-menubar'
import { Check, ChevronRight, Circle } from 'lucide-react'
import { cn } from '../../lib/utils'
import { getEmbossShadow, getEmbossBackground } from '../../lib/tailwind-utils'

export type MenubarProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>

export function Menubar({ className, ...props }: MenubarProps) {
  return (
    <MenubarPrimitive.Root
      className={cn(
        getEmbossBackground(),
        getEmbossShadow('in', 'small'),
        'flex h-10 items-center space-x-1 rounded-lg p-1',
        className
      )}
      {...props}
    />
  )
}

export type MenubarMenuProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Menu>

export function MenubarMenu({ ...props }: MenubarMenuProps) {
  return <MenubarPrimitive.Menu {...props} />
}

export type MenubarTriggerProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>

export function MenubarTrigger({ className, ...props }: MenubarTriggerProps) {
  return (
    <MenubarPrimitive.Trigger
      className={cn(
        getEmbossBackground(),
        'flex cursor-default select-none items-center rounded-md px-3 py-1.5 text-sm font-medium',
        'focus:bg-emboss-shadow-light/10 dark:focus:bg-emboss-shadow-dark/10',
        'focus:text-foreground data-[state=open]:bg-emboss-shadow-light/10 dark:data-[state=open]:bg-emboss-shadow-dark/10',
        'data-[state=open]:text-foreground',
        'transition-colors',
        className
      )}
      {...props}
    />
  )
}

export type MenubarContentProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>

export function MenubarContent({ className, align = 'start', sideOffset = 4, ...props }: MenubarContentProps) {
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        className={cn(
          getEmbossBackground(),
          getEmbossShadow('out'),
          'z-50 min-w-[12rem] overflow-hidden rounded-xl p-1',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
}

export type MenubarItemProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item>

export function MenubarItem({ className, inset, ...props }: MenubarItemProps & { inset?: boolean }) {
  return (
    <MenubarPrimitive.Item
      className={cn(
        'relative flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm outline-none',
        'focus:bg-emboss-shadow-light/10 dark:focus:bg-emboss-shadow-dark/10',
        'focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        inset && 'pl-8',
        className
      )}
      {...props}
    />
  )
}

export type MenubarCheckboxItemProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>

export function MenubarCheckboxItem({ className, children, checked, ...props }: MenubarCheckboxItemProps) {
  return (
    <MenubarPrimitive.CheckboxItem
      className={cn(
        'relative flex cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm outline-none',
        'focus:bg-emboss-shadow-light/10 dark:focus:bg-emboss-shadow-dark/10',
        'focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  )
}

export type MenubarRadioItemProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>

export function MenubarRadioItem({ className, children, ...props }: MenubarRadioItemProps) {
  return (
    <MenubarPrimitive.RadioItem
      className={cn(
        'relative flex cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm outline-none',
        'focus:bg-emboss-shadow-light/10 dark:focus:bg-emboss-shadow-dark/10',
        'focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <Circle className="h-2 w-2 fill-current" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  )
}

export type MenubarLabelProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label>

export function MenubarLabel({ className, inset, ...props }: MenubarLabelProps & { inset?: boolean }) {
  return (
    <MenubarPrimitive.Label
      className={cn(
        'px-2 py-1.5 text-sm font-semibold',
        inset && 'pl-8',
        className
      )}
      {...props}
    />
  )
}

export type MenubarSeparatorProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>

export function MenubarSeparator({ className, ...props }: MenubarSeparatorProps) {
  return (
    <MenubarPrimitive.Separator
      className={cn('-mx-1 my-1 h-px bg-emboss-shadow-light/20 dark:bg-emboss-shadow-dark/20', className)}
      {...props}
    />
  )
}

export type MenubarShortcutProps = React.HTMLAttributes<HTMLSpanElement>

export function MenubarShortcut({ className, ...props }: MenubarShortcutProps) {
  return (
    <span
      className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)}
      {...props}
    />
  )
}

export type MenubarSubProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Sub>

export function MenubarSub({ ...props }: MenubarSubProps) {
  return <MenubarPrimitive.Sub {...props} />
}

export type MenubarSubTriggerProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger>

export function MenubarSubTrigger({ className, inset, children, ...props }: MenubarSubTriggerProps & { inset?: boolean }) {
  return (
    <MenubarPrimitive.SubTrigger
      className={cn(
        'relative flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm outline-none',
        'focus:bg-emboss-shadow-light/10 dark:focus:bg-emboss-shadow-dark/10',
        'focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        inset && 'pl-8',
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </MenubarPrimitive.SubTrigger>
  )
}

export type MenubarSubContentProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>

export function MenubarSubContent({ className, ...props }: MenubarSubContentProps) {
  return (
    <MenubarPrimitive.SubContent
      className={cn(
        getEmbossBackground(),
        getEmbossShadow('out'),
        'z-50 min-w-[8rem] overflow-hidden rounded-xl p-1',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
        'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  )
}

export type MenubarGroupProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Group>

export function MenubarGroup({ ...props }: MenubarGroupProps) {
  return <MenubarPrimitive.Group {...props} />
}

export type MenubarPortalProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Portal>

export function MenubarPortal({ ...props }: MenubarPortalProps) {
  return <MenubarPrimitive.Portal {...props} />
}

export type MenubarRadioGroupProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioGroup>

export function MenubarRadioGroup({ ...props }: MenubarRadioGroupProps) {
  return <MenubarPrimitive.RadioGroup {...props} />
}
