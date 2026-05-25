import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { AlertCircle, CheckCircle, Info, X, XCircle } from 'lucide-react'
import { cn } from '../../lib/utils'
import { getEmbossShadow, getEmbossBackground, getEmbossBorder } from '../../lib/tailwind-utils'

const alertVariants = cva(
  cn(
    getEmbossBackground(),
    getEmbossShadow('out'),
    'relative w-full rounded-lg p-4',
    getEmbossBorder()
  ),
  {
    variants: {
      variant: {
        default: '',
        destructive: 'border-red-500/50 text-red-600 dark:text-red-400',
        success: 'border-emerald-500/50 text-emerald-600 dark:text-emerald-400',
        warning: 'border-amber-500/50 text-amber-600 dark:text-amber-400',
        info: 'border-blue-500/50 text-blue-600 dark:text-blue-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  default: Info,
  destructive: XCircle,
  success: CheckCircle,
  warning: AlertCircle,
  info: Info,
}

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string
  icon?: React.ReactNode
  dismissible?: boolean
  onDismiss?: () => void
}

export function Alert({
  className,
  variant,
  title,
  icon,
  dismissible = false,
  onDismiss,
  children,
  ...props
}: AlertProps) {
  const DefaultIcon = iconMap[variant || 'default']

  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {icon ? (
            React.isValidElement(icon) ? (
              icon
            ) : (
              <span className="h-5 w-5">{icon}</span>
            )
          ) : (
            <DefaultIcon className="h-5 w-5" />
          )}
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h5 className="mb-1 text-sm font-semibold">
              {title}
            </h5>
          )}
          <div className="text-sm">{children}</div>
        </div>
        {dismissible && (
          <button
            type="button"
            className={cn(
              getEmbossBackground(),
              getEmbossShadow('out', 'small'),
              'ml-3 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md',
              'text-muted-foreground hover:text-foreground',
              'focus:outline-none focus:ring-2 focus:ring-emboss-accent-blue',
              'transition-all duration-200 hover:scale-110 active:scale-95'
            )}
            onClick={onDismiss}
            aria-label="Dismiss"
          >
            <span className="sr-only">Dismiss</span>
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}