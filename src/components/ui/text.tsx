import React from 'react'
import { cn } from '../../lib/utils'

type TextVariant = 
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'p' | 'span' | 'label'
  | 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl'

type TextWeight = 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black'

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  variant?: TextVariant
  weight?: TextWeight
  muted?: boolean
  accent?: 'blue' | 'orange' | 'green'
  className?: string
  as?: keyof JSX.IntrinsicElements
}

interface VariantConfig {
  classes: string
  defaultWeight?: TextWeight
}

const variantConfig: Record<TextVariant, VariantConfig> = {
  h1: { classes: 'text-4xl', defaultWeight: 'bold' },
  h2: { classes: 'text-3xl', defaultWeight: 'bold' },
  h3: { classes: 'text-2xl', defaultWeight: 'semibold' },
  h4: { classes: 'text-xl', defaultWeight: 'semibold' },
  h5: { classes: 'text-lg', defaultWeight: 'medium' },
  h6: { classes: 'text-base', defaultWeight: 'medium' },
  p: { classes: 'text-base', defaultWeight: 'normal' },
  span: { classes: 'text-base', defaultWeight: 'normal' },
  label: { classes: 'text-sm', defaultWeight: 'medium' },
  xs: { classes: 'text-xs', defaultWeight: 'normal' },
  sm: { classes: 'text-sm', defaultWeight: 'normal' },
  base: { classes: 'text-base', defaultWeight: 'normal' },
  lg: { classes: 'text-lg', defaultWeight: 'normal' },
  xl: { classes: 'text-xl', defaultWeight: 'normal' },
  '2xl': { classes: 'text-2xl', defaultWeight: 'normal' },
  '3xl': { classes: 'text-3xl', defaultWeight: 'normal' },
  '4xl': { classes: 'text-4xl', defaultWeight: 'normal' },
  '5xl': { classes: 'text-5xl', defaultWeight: 'normal' },
  '6xl': { classes: 'text-6xl', defaultWeight: 'normal' },
  '7xl': { classes: 'text-7xl', defaultWeight: 'normal' },
  '8xl': { classes: 'text-8xl', defaultWeight: 'normal' },
  '9xl': { classes: 'text-9xl', defaultWeight: 'normal' },
}

const weightClasses: Record<TextWeight, string> = {
  thin: 'font-thin',
  extralight: 'font-extralight',
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
  black: 'font-black',
}

export function Text({
  children,
  variant = 'p',
  weight,
  muted = false,
  accent,
  className,
  as,
  ...props
}: TextProps) {
  const config = variantConfig[variant]
  const Component = as || (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(variant) ? variant : 'p') as React.ElementType
  
  const weightClass = weight
    ? weightClasses[weight]
    : (config.defaultWeight && config.defaultWeight !== 'normal'
      ? weightClasses[config.defaultWeight]
      : '')
  
  const accentClass = accent ? `text-emboss-accent-${accent}` : ''
  
  return React.createElement(
    Component,
    {
      className: cn(
        config.classes,
        weightClass,
        muted ? 'text-muted-foreground' : 'text-foreground',
        accentClass,
        className
      ),
      ...props,
    },
    children
  )
}
