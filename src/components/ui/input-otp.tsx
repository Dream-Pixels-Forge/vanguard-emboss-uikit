import React from 'react'
import { OTPInput, OTPInputContext } from 'input-otp'
import { cn } from '../../lib/utils'
import { getEmbossShadow, getEmbossBackground } from '../../lib/tailwind-utils'
import { Minus } from 'lucide-react'

export interface InputOTPProps {
  children?: React.ReactNode
  maxLength: number
  value?: string
  onChange?: (newValue: string) => unknown
  onComplete?: (...args: unknown[]) => unknown
  textAlign?: 'left' | 'center' | 'right'
  containerClassName?: string
  className?: string
  disabled?: boolean
}

export const InputOTP = React.forwardRef<HTMLInputElement, InputOTPProps>(
  function InputOTP({ className, containerClassName, children, ...props }, ref) {
    return (
      <OTPInput
        ref={ref}
        containerClassName={cn('flex items-center gap-2 has-[:disabled]:opacity-50', containerClassName)}
        className={cn('disabled:cursor-not-allowed', className)}
        {...props}
      >
        {children}
      </OTPInput>
    )
  }
)

export type InputOTPGroupProps = React.HTMLAttributes<HTMLDivElement>

export function InputOTPGroup({ className, ...props }: InputOTPGroupProps) {
  return <div className={cn('flex items-center', className)} {...props} />
}

export interface InputOTPSlotProps {
  index: number
  className?: string
}

export const InputOTPSlot = React.forwardRef<HTMLDivElement, InputOTPSlotProps>(
  function InputOTPSlot({ index, className }, ref) {
    const inputOTPContext = React.useContext(OTPInputContext)
    const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

    return (
      <div
        ref={ref}
        className={cn(
          getEmbossBackground(),
          getEmbossShadow(isActive ? 'in' : 'out', 'small'),
          'relative flex h-10 w-10 items-center justify-center rounded-lg border',
          'border-emboss-shadow-light/30 dark:border-emboss-shadow-dark/30',
          'text-sm font-medium transition-all',
          isActive && 'ring-2 ring-emboss-accent-blue',
          className
        )}
      >
        {char}
        {hasFakeCaret && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
          </div>
        )}
      </div>
    )
  }
)

export type InputOTPSeparatorProps = React.HTMLAttributes<HTMLDivElement>

export function InputOTPSeparator({ ...props }: InputOTPSeparatorProps) {
  return (
    <div role="separator" {...props}>
      <Minus className="h-4 w-4 text-muted-foreground" />
    </div>
  )
}
