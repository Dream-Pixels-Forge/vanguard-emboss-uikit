import React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../lib/utils'
import { getEmbossShadow, getEmbossBackground, getEmbossBorder } from '../../lib/tailwind-utils'

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  asChild?: boolean
  raised?: boolean
  recessed?: boolean
  size?: 'standard' | 'small'
  border?: boolean
  className?: string
}

export function Box({
  children,
  asChild = false,
  raised = false,
  recessed = false,
  size = 'standard',
  border = false,
  className,
  ...props
}: BoxProps) {
  const Comp = asChild ? Slot : 'div'
  const shadowType = raised ? 'out' : recessed ? 'in' : undefined
  const shadowClass = shadowType ? getEmbossShadow(shadowType, size) : ''
  
  return (
    <Comp
      className={cn(
        getEmbossBackground(),
        shadowClass,
        border && getEmbossBorder(),
        'rounded-lg spring-all',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}