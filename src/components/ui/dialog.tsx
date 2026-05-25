import React, { forwardRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils'
import { getEmbossShadow, getEmbossBackground, getEmbossBorder } from '../../lib/tailwind-utils'

export interface DialogProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root> {}

export function Dialog({ ...props }: DialogProps) {
  return <DialogPrimitive.Root {...props} />
}

export interface DialogTriggerProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger> {}

export function DialogTrigger({ className, asChild, ...props }: DialogTriggerProps) {
  return <DialogPrimitive.Trigger asChild={asChild} className={asChild ? undefined : cn(
    getEmbossBackground(),
    getEmbossShadow('out', 'small'),
    'inline-flex items-center justify-center rounded-md px-4 py-2',
    'text-sm font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    'disabled:pointer-events-none disabled:opacity-50',
    className
  )} {...props} />
}

export interface DialogPortalProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Portal> {}

export function DialogPortal({ ...props }: DialogPortalProps) {
  return <DialogPrimitive.Portal {...props} />
}

export interface DialogOverlayProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> {}

export const DialogOverlay = forwardRef<React.ElementRef<typeof DialogPrimitive.Overlay>, DialogOverlayProps>(
  function DialogOverlay({ className, ...props }, ref) {
    return (
      <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
          'fixed inset-0 z-50 bg-black/50',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          className
        )}
        {...props}
      />
    )
  }
)

export interface DialogContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  showClose?: boolean
}

export function DialogContent({ className, children, showClose = true, ...props }: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          getEmbossBackground(),
          getEmbossShadow('out'),
          'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-xl p-6',
          getEmbossBorder(),
          'duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
          'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
          className
        )}
        {...props}
      >
        {children}
        {showClose && (
          <DialogPrimitive.Close
            className={cn(
              getEmbossBackground(),
              getEmbossShadow('out', 'small'),
              'absolute right-4 top-4 rounded-sm opacity-70',
              'ring-offset-background transition-opacity',
              'hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring',
              'disabled:pointer-events-none',
              'transition-all duration-200 hover:scale-110 active:scale-95'
            )}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}
      {...props}
    />
  )
}

export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DialogFooter({ className, ...props }: DialogFooterProps) {
  return (
    <div
      className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
      {...props}
    />
  )
}

export interface DialogTitleProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {}

export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <DialogPrimitive.Title
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
}

export interface DialogDescriptionProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {}

export function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}
