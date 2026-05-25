import React from 'react'
import { cn } from '../../lib/utils'
import { getEmbossShadow, getEmbossBackground } from '../../lib/tailwind-utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
  resizable?: boolean
}

export function Textarea({ className, error, resizable = false, ...props }: TextareaProps) {
  return (
    <textarea
      aria-invalid={error ? true : undefined}
      className={cn(
        getEmbossBackground(),
        getEmbossShadow('in', 'small'),
        'flex min-h-[80px] w-full rounded-lg px-3 py-2',
        'text-sm text-foreground',
        'border border-transparent',
        'placeholder:text-muted-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emboss-accent-blue',
        'disabled:cursor-not-allowed disabled:opacity-50',
        !resizable && 'resize-none',
        error && 'ring-2 ring-red-500',
        className
      )}
      {...props}
    />
  )
}