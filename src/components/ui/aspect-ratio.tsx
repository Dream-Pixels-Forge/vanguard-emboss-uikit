import React from 'react'
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio'

export type AspectRatioProps = React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root>

export function AspectRatio({ ...props }: AspectRatioProps) {
  return <AspectRatioPrimitive.Root {...props} />
}
