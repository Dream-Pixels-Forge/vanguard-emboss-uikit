import React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../lib/utils'
import { getEmbossBackground, withActiveShadow } from '../../lib/tailwind-utils'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  cn(
    getEmbossBackground(),
    'inline-flex items-center justify-center rounded-lg font-medium',
    'transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    'disabled:pointer-events-none disabled:opacity-50'
  ),
  {
    variants: {
      variant: {
        default: cn(
          withActiveShadow('out', 'small'),
          'text-foreground',
          'hover:scale-105 active:scale-95'
        ),
        accent: cn(
          withActiveShadow('out', 'small'),
          'bg-emboss-accent-blue text-white',
          'hover:scale-105 active:scale-95'
        ),
        outline: cn(
          'border border-emboss-shadow-light/30 dark:border-emboss-shadow-dark/30',
          'text-foreground',
          'hover:border-emboss-shadow-light/50 dark:hover:border-emboss-shadow-dark/50'
        ),
        ghost: cn(
          'text-foreground',
          'hover:bg-emboss-shadow-light/10 dark:hover:bg-emboss-shadow-dark/10'
        ),
        link: 'text-emboss-accent-blue underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({
    className,
    variant,
    size,
    asChild = false,
    loading = false,
    disabled,
    children,
    ...props
  }, ref) {
    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={cn(buttonVariants({ variant, size, className }))}
          {...props}
        >
          {children}
        </Slot>
      )
    }
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    )
  }
)