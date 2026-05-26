import { cn } from '../../lib/utils'
import { getEmbossBackground, getEmbossShadow } from '../../lib/tailwind-utils'

export interface ProgressCircleProps {
  value?: number
  defaultValue?: number
  size?: 'sm' | 'md' | 'lg'
  strokeWidth?: number
  label?: string
  showValue?: boolean
  className?: string
}

const sizeMap = {
  sm: { size: 64, text: 'text-sm' },
  md: { size: 96, text: 'text-xl' },
  lg: { size: 128, text: 'text-2xl' },
}

export function ProgressCircle({
  value,
  defaultValue = 0,
  size = 'md',
  strokeWidth,
  label,
  showValue = true,
  className,
}: ProgressCircleProps) {
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : defaultValue
  const s = sizeMap[size]
  const sw = strokeWidth ?? (size === 'sm' ? 6 : size === 'md' ? 8 : 10)
  const radius = (s.size - sw) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (currentValue / 100) * circumference

  return (
    <div className={cn('flex flex-col items-center gap-1', className)}>
      <div
        className={cn(
          'relative inline-flex items-center justify-center rounded-full',
          getEmbossBackground(),
          getEmbossShadow('out', 'small'),
        )}
      >
        <svg
          width={s.size}
          height={s.size}
          className="-rotate-90"
        >
          <circle
            cx={s.size / 2}
            cy={s.size / 2}
            r={radius}
            fill="none"
            strokeWidth={sw}
            className="stroke-emboss-shadow-light/30 dark:stroke-emboss-shadow-dark/30"
          />
          <circle
            cx={s.size / 2}
            cy={s.size / 2}
            r={radius}
            fill="none"
            strokeWidth={sw}
            strokeLinecap="round"
            className="stroke-emboss-accent-blue transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        {showValue && (
          <span
            className={cn(
              'absolute font-semibold tabular-nums text-emboss-accent-blue',
              s.text
            )}
          >
            {Math.round(currentValue)}
          </span>
        )}
      </div>
      {label && (
        <span className="text-xs text-muted-foreground">{label}</span>
      )}
    </div>
  )
}
