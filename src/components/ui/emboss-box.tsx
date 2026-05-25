import React from 'react'
import { cn } from '../../lib/utils'
import { getEmbossShadow, getEmbossBackground } from '../../lib/tailwind-utils'

/** @deprecated Use Box component instead. EmbossBox is kept for backward compatibility. */
interface EmbossBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  raised?: boolean
  size?: 'standard' | 'small'
  className?: string
}

export function EmbossBox({
  children,
  raised = true,
  size = 'standard',
  className,
  ...props
}: EmbossBoxProps) {
  const shadowClass = getEmbossShadow(raised ? 'out' : 'in', size)
  const backgroundClass = getEmbossBackground()
  
  return (
    <div
      className={cn(
        backgroundClass,
        shadowClass,
        'rounded-lg p-4 transition-all duration-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
