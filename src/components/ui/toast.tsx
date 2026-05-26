import React from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { getEmbossShadow, getEmbossBackground, getEmbossBorder } from '../../lib/tailwind-utils'

// ─── ToastProvider ────────────────────────────────────────────────

export type ToastProviderProps = React.ComponentPropsWithoutRef<typeof ToastPrimitive.Provider>

export function ToastProvider({ ...props }: ToastProviderProps) {
  return <ToastPrimitive.Provider {...props} />
}

// ─── ToastViewport ────────────────────────────────────────────────

export type ToastViewportProps = React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>

export const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  ToastViewportProps
>(function ToastViewport({ className, ...props }, ref) {
  return (
    <ToastPrimitive.Viewport
      ref={ref}
      className={cn(
        'fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4',
        'sm:max-w-[420px]',
        'gap-2',
        className
      )}
      {...props}
    />
  )
})

ToastViewport.displayName = 'ToastViewport'

// ─── Toast Variants ───────────────────────────────────────────────

const toastVariants = cva(
  cn(
    getEmbossBackground(),
    getEmbossShadow('out', 'small'),
    getEmbossBorder(),
    'group pointer-events-auto relative flex w-full items-center justify-between',
    'rounded-xl p-4',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[swipe=end]:animate-out',
    'data-[state=closed]:fade-out-80 data-[state=open]:fade-in-0',
    'data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-right-full',
    'data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]',
    'data-[swipe=cancel]:translate-x-0',
    'transition-all duration-200'
  ),
  {
    variants: {
      variant: {
        default: 'text-foreground',
        success: 'border-emboss-accent-green/50 text-foreground',
        error: 'border-red-500/50 text-foreground',
        warning: 'border-emboss-accent-orange/50 text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

// ─── Toast ────────────────────────────────────────────────────────

export interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>,
    VariantProps<typeof toastVariants> {
  duration?: number
}

export const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  ToastProps
>(function Toast({ className, variant, duration, ...props }, ref) {
  return (
    <ToastPrimitive.Root
      ref={ref}
      duration={duration}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})

Toast.displayName = 'Toast'

// ─── ToastAction ──────────────────────────────────────────────────

export type ToastActionProps = React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>

export const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>,
  ToastActionProps
>(function ToastAction({ className, ...props }, ref) {
  return (
    <ToastPrimitive.Action
      ref={ref}
      className={cn(
        'inline-flex h-8 shrink-0 items-center justify-center rounded-md border px-3 text-xs font-medium',
        'border-emboss-shadow-light/30 dark:border-emboss-shadow-dark/30',
        'bg-transparent hover:bg-emboss-shadow-light/10 dark:hover:bg-emboss-shadow-dark/10',
        'focus:outline-none focus:ring-2 focus:ring-emboss-accent-blue',
        'disabled:pointer-events-none disabled:opacity-50',
        'transition-colors',
        className
      )}
      {...props}
    />
  )
})

ToastAction.displayName = 'ToastAction'

// ─── ToastClose ───────────────────────────────────────────────────

export type ToastCloseProps = React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>

export const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  ToastCloseProps
>(function ToastClose({ className, ...props }, ref) {
  return (
    <ToastPrimitive.Close
      ref={ref}
      className={cn(
        'absolute right-2 top-2 rounded-md p-1',
        'text-muted-foreground/50 opacity-0 transition-opacity',
        'hover:text-muted-foreground',
        'focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-emboss-accent-blue',
        'group-hover:opacity-100',
        className
      )}
      {...props}
    />
  )
})

ToastClose.displayName = 'ToastClose'

// ─── ToastTitle ───────────────────────────────────────────────────

export type ToastTitleProps = React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>

export const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  ToastTitleProps
>(function ToastTitle({ className, ...props }, ref) {
  return (
    <ToastPrimitive.Title
      ref={ref}
      className={cn('text-sm font-semibold [&+&]:mt-1', className)}
      {...props}
    />
  )
})

ToastTitle.displayName = 'ToastTitle'

// ─── ToastDescription ─────────────────────────────────────────────

export type ToastDescriptionProps = React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>

export const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  ToastDescriptionProps
>(function ToastDescription({ className, ...props }, ref) {
  return (
    <ToastPrimitive.Description
      ref={ref}
      className={cn('text-sm opacity-90', className)}
      {...props}
    />
  )
})

ToastDescription.displayName = 'ToastDescription'
