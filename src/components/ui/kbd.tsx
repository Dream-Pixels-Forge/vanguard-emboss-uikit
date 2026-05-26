import React from 'react'
import { cn } from '../../lib/utils'

export type KbdProps = React.HTMLAttributes<HTMLElement>

function resolveModDisplay(key: string): string {
  const isMac =
    typeof navigator !== 'undefined' &&
    /Mac|iPhone|iPad|iPod/.test(navigator.platform ?? '')
  const modSymbol = isMac ? '⌘' : 'Ctrl'

  const segments = key.split('+').map((segment) => {
    const trimmed = segment.trim()
    if (trimmed.toLowerCase() === 'mod') return modSymbol
    // Uppercase single letters for display (e.g. "s" → "S")
    if (/^[a-zA-Z]$/.test(trimmed)) return trimmed.toUpperCase()
    return trimmed
  })

  return segments.join('+')
}

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  function Kbd({ className, children, ...props }, ref) {
    const displayChildren =
      typeof children === 'string' ? resolveModDisplay(children) : children

    return (
      <kbd
        ref={ref}
        className={cn(
          'pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium',
          'border-emboss-shadow-light/30 dark:border-emboss-shadow-dark/30',
          'bg-emboss-bg-light dark:bg-emboss-bg-dark',
          'text-muted-foreground',
          className
        )}
        {...props}
      >
        {displayChildren}
      </kbd>
    )
  }
)

Kbd.displayName = 'Kbd'
