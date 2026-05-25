import React from 'react'
import { cn } from '../../lib/utils'
import { getEmbossShadow, getEmbossBackground } from '../../lib/tailwind-utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export function Input({ className, error, type, ...props }: InputProps) {
  return (
    <input
      type={type}
      aria-invalid={error ? true : undefined}
      className={cn(
        getEmbossBackground(),
        getEmbossShadow('in', 'small'),
        'flex h-10 w-full rounded-lg px-3 py-2',
        'text-sm text-foreground',
        'border border-transparent',
        'placeholder:text-muted-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emboss-accent-blue',
        'disabled:cursor-not-allowed disabled:opacity-50',
        error && 'ring-2 ring-red-500',
        className
      )}
      {...props}
    />
  )
}