import React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cn } from '../../lib/utils'
import { getEmbossShadow, getEmbossBackground } from '../../lib/tailwind-utils'

export interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  size?: 'sm' | 'md' | 'lg'
  src?: string
  alt?: string
  fallback?: string
}

const sizeMap = {
  sm: { root: 'h-8 w-8', text: 'text-xs' },
  md: { root: 'h-10 w-10', text: 'text-sm' },
  lg: { root: 'h-14 w-14', text: 'text-lg' },
}

export function Avatar({
  className,
  size = 'md',
  src,
  alt = '',
  fallback,
  children,
  ...props
}: AvatarProps) {
  const s = sizeMap[size]
  return (
    <AvatarPrimitive.Root
      className={cn(
        getEmbossBackground(),
        getEmbossShadow('out', 'small'),
        s.root,
        'relative inline-flex items-center justify-center rounded-full align-middle',
        className
      )}
      {...props}
    >
      <AvatarPrimitive.Image
        src={src}
        alt={alt}
        className="h-full w-full rounded-full object-cover"
      />
      <AvatarPrimitive.Fallback
        className={cn(
          getEmbossBackground(),
          s.text,
          'flex h-full w-full items-center justify-center rounded-full font-medium text-muted-foreground'
        )}
      >
        {fallback || children}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
}
