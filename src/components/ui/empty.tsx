import React from 'react'
import { cn } from '../../lib/utils'

export type EmptyProps = React.HTMLAttributes<HTMLDivElement> & {
  icon?: React.ReactNode
  title?: string
  description?: string
  action?: React.ReactNode
}

export function Empty({ className, icon, title, description, action, ...props }: EmptyProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 py-12 text-center',
        className
      )}
      role="status"
      {...props}
    >
      {icon && (
        <div className="text-muted-foreground/50">{icon}</div>
      )}
      {title && (
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      )}
      {description && (
        <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      )}
      {action && (
        <div className="mt-2">{action}</div>
      )}
    </div>
  )
}
