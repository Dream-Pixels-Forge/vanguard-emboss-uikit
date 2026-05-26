import React from 'react'
import { Command as CommandPrimitive } from 'cmdk'
import { Search } from 'lucide-react'
import { cn } from '../../lib/utils'
import { getEmbossShadow, getEmbossBackground } from '../../lib/tailwind-utils'

export type CommandProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive>

export function Command({ className, ...props }: CommandProps) {
  return (
    <CommandPrimitive
      className={cn(
        getEmbossBackground(),
        getEmbossShadow('out'),
        'flex h-full w-full flex-col overflow-hidden rounded-xl',
        className
      )}
      {...props}
    />
  )
}

export type CommandDialogProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive> & {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function CommandDialog({ open, onOpenChange, ...props }: CommandDialogProps) {
  return (
    <div role="dialog" aria-modal="true" data-state={open ? 'open' : 'closed'}>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange?.(false)} />
          <Command
            className="relative z-50 max-h-[60vh] w-full max-w-md"
            {...props}
          />
        </div>
      )}
    </div>
  )
}

export type CommandInputProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>

export function CommandInput({ className, ...props }: CommandInputProps) {
  return (
    <div
      className={cn(
        getEmbossShadow('in', 'small'),
        'flex items-center rounded-lg px-3 m-3',
        'border border-emboss-shadow-light/20 dark:border-emboss-shadow-dark/20',
      )}
      cmdk-input-wrapper=""
    >
      <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        className={cn(
          'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none',
          'placeholder:text-muted-foreground',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    </div>
  )
}

export type CommandListProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>

export function CommandList({ className, ...props }: CommandListProps) {
  return (
    <CommandPrimitive.List
      className={cn('max-h-[300px] overflow-y-auto overflow-x-hidden px-3 pb-3', className)}
      {...props}
    />
  )
}

export type CommandEmptyProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>

export function CommandEmpty({ className, ...props }: CommandEmptyProps) {
  return (
    <CommandPrimitive.Empty
      className={cn('py-6 text-center text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

export type CommandGroupProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>

export function CommandGroup({ className, ...props }: CommandGroupProps) {
  return (
    <CommandPrimitive.Group
      className={cn(
        'overflow-hidden [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5',
        '[&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium',
        '[&_[cmdk-group-heading]]:text-muted-foreground',
        className
      )}
      {...props}
    />
  )
}

export type CommandSeparatorProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>

export function CommandSeparator({ className, ...props }: CommandSeparatorProps) {
  return (
    <CommandPrimitive.Separator
      className={cn('-mx-1 h-px bg-emboss-shadow-light/20 dark:bg-emboss-shadow-dark/20', className)}
      {...props}
    />
  )
}

export type CommandItemProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>

export function CommandItem({ className, ...props }: CommandItemProps) {
  return (
    <CommandPrimitive.Item
      className={cn(
        'relative flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm outline-none',
        'aria-selected:bg-emboss-shadow-light/10 dark:aria-selected:bg-emboss-shadow-dark/10',
        'aria-selected:text-foreground',
        'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
        className
      )}
      {...props}
    />
  )
}

export type CommandShortcutProps = React.HTMLAttributes<HTMLSpanElement>

export function CommandShortcut({ className, ...props }: CommandShortcutProps) {
  return (
    <span
      className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)}
      {...props}
    />
  )
}
