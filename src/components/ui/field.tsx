import React from 'react'
import { cn } from '../../lib/utils'
import { Label } from './label'

export type FieldProps = React.HTMLAttributes<HTMLDivElement> & {
  label?: string
  htmlFor?: string
  required?: boolean
  error?: string
  description?: string
  children: React.ReactNode
}

export function Field({ className, label, htmlFor, required, error, description, children, ...props }: FieldProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)} {...props}>
      {label && (
        <Label htmlFor={htmlFor} required={required}>
          {label}
        </Label>
      )}
      {children}
      {description && !error && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      {error && (
        <p className="text-xs text-red-500" role="alert">{error}</p>
      )}
    </div>
  )
}
