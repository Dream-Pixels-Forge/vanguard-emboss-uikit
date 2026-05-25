import React from 'react'
import { cn } from '../../lib/utils'
import { getEmbossShadow, getEmbossBackground, getEmbossBorder } from '../../lib/tailwind-utils'

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  raised?: boolean
  recessed?: boolean
  size?: 'standard' | 'small'
  border?: boolean
  className?: string
}

export function Box({
  children,
  raised = false,
  recessed = false,
  size = 'standard',
  border = false,
  className,
  ...props
}: BoxProps) {
  // Determine shadow type: raised takes precedence over recessed
  const shadowType = raised ? 'out' : recessed ? 'in' : undefined
  const shadowClass = shadowType ? getEmbossShadow(shadowType, size) : ''
  
  return (
    <div
      className={cn(
        getEmbossBackground(),
        shadowClass,
        border && getEmbossBorder(),
        'rounded-lg transition-all duration-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}