import React, { forwardRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils'
import { getEmbossShadow, getEmbossBackground, getEmbossBorder } from '../../lib/tailwind-utils'

export interface SheetProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root> {}

export function Sheet({ ...props }: SheetProps) {
  return <DialogPrimitive.Root {...props} />
}

export const SheetTrigger = DialogPrimitive.Trigger

export const SheetClose = DialogPrimitive.Close

export const SheetPortal = DialogPrimitive.Portal

export type SheetTriggerProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>
export type SheetCloseProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>
export type SheetPortalProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Portal>

export interface SheetOverlayProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> {}

export const SheetOverlay = forwardRef<React.ElementRef<typeof DialogPrimitive.Overlay>, SheetOverlayProps>(
  function SheetOverlay({ className, ...props }, ref) {
    return (
      <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
          'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          className
        )}
        {...props}
      />
    )
  }
)

const sheetSideStyles: Record<string, string> = {
  top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
  bottom: 'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
  left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
  right: 'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
}

export interface SheetContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  side?: 'top' | 'bottom' | 'left' | 'right'
  showClose?: boolean
}

export function SheetContent({
  className,
  children,
  side = 'right',
  showClose = true,
  ...props
}: SheetContentProps) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content
        className={cn(
          getEmbossBackground(),
          getEmbossShadow('out'),
          getEmbossBorder(),
          'fixed z-50 gap-4 p-6 shadow-lg',
          'duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:duration-200',
          sheetSideStyles[side],
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
              'transition-all duration-200 hover:scale-110 active:scale-95 p-1'
            )}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </SheetPortal>
  )
}

export interface SheetHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SheetHeader({ className, ...props }: SheetHeaderProps) {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}
      {...props}
    />
  )
}

export interface SheetFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SheetFooter({ className, ...props }: SheetFooterProps) {
  return (
    <div
      className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
      {...props}
    />
  )
}

export interface SheetTitleProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {}

export function SheetTitle({ className, ...props }: SheetTitleProps) {
  return (
    <DialogPrimitive.Title
      className={cn('text-lg font-semibold text-foreground', className)}
      {...props}
    />
  )
}

export interface SheetDescriptionProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {}

export function SheetDescription({ className, ...props }: SheetDescriptionProps) {
  return (
    <DialogPrimitive.Description
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}
