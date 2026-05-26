import React from 'react'
import { cn } from '../../lib/utils'

export type KbdProps = React.HTMLAttributes<HTMLElement>

export function Kbd({ className, ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        'pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium',
        'border-emboss-shadow-light/30 dark:border-emboss-shadow-dark/30',
        'bg-emboss-bg-light dark:bg-emboss-bg-dark',
        'text-muted-foreground',
        'opacity-100',
        className
      )}
      {...props}
    />
  )
}
