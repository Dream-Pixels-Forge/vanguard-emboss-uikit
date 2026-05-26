import React from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'
import { cn } from '../../lib/utils'
import { getEmbossBackground, getEmbossBorder } from '../../lib/tailwind-utils'

/* Drawer root — uses as any cast because vaul's DialogProps is a
   discriminated union (WithFadeFromProps | WithoutFadeFromProps) that
   makes strict prop typing impractical for a pass-through wrapper. */
export interface DrawerProps {
  children?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  shouldScaleBackground?: boolean
  dismissible?: boolean
  direction?: 'top' | 'bottom' | 'left' | 'right'
  snapPoints?: (number | string)[]
  noBodyStyles?: boolean
  closeThreshold?: number
  handleOnly?: boolean
  modal?: boolean
  fixed?: boolean
  nested?: boolean
  activeSnapPoint?: number | string | null
  setActiveSnapPoint?: (snapPoint: number | string | null) => void
  setBackgroundColorOnScale?: boolean
  scrollLockTimeout?: number
}

export function Drawer(props: DrawerProps) {
  return <DrawerPrimitive.Root {...(props as any)} />
}

export interface DrawerTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export function DrawerTrigger({ ...props }: DrawerTriggerProps) {
  return <DrawerPrimitive.Trigger {...props} />
}

export interface DrawerPortalProps {
  children?: React.ReactNode
}

export function DrawerPortal({ ...props }: DrawerPortalProps) {
  return <DrawerPrimitive.Portal {...props} />
}

export interface DrawerCloseProps extends React.HTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export function DrawerClose({ ...props }: DrawerCloseProps) {
  return <DrawerPrimitive.Close {...props} />
}

export interface DrawerOverlayProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DrawerOverlay({ className, ...props }: DrawerOverlayProps) {
  return (
    <DrawerPrimitive.Overlay
      className={cn('fixed inset-0 z-50 bg-black/50 backdrop-blur-sm', className)}
      aria-hidden="true"
      {...props}
    />
  )
}

export interface DrawerContentProps extends React.HTMLAttributes<HTMLDivElement> {
  showHandle?: boolean
}

export function DrawerContent({ className, children, showHandle = true, ...props }: DrawerContentProps) {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        className={cn(
          getEmbossBackground(),
          'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-xl',
          getEmbossBorder(),
          className
        )}
        {...props}
      >
        {showHandle && (
          <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-emboss-shadow-light/50 dark:bg-emboss-shadow-dark/50" />
        )}
        <div className="p-6">{children}</div>
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}

export interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DrawerHeader({ className, ...props }: DrawerHeaderProps) {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}
      {...props}
    />
  )
}

export interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DrawerFooter({ className, ...props }: DrawerFooterProps) {
  return (
    <div
      className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
      {...props}
    />
  )
}

export interface DrawerTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function DrawerTitle({ className, ...props }: DrawerTitleProps) {
  return (
    <DrawerPrimitive.Title
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
}

export interface DrawerDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function DrawerDescription({ className, ...props }: DrawerDescriptionProps) {
  return (
    <DrawerPrimitive.Description
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}
