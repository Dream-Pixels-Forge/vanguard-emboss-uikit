import { useCallback, useRef, useEffect, useState } from 'react'
import { cn } from '../../lib/utils'
import { getEmbossShadow, getEmbossBackground, getAccentColor } from '../../lib/tailwind-utils'

export interface KnobProps {
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  size?: 'sm' | 'md' | 'lg'
  label?: string
  showValue?: boolean
  className?: string
  disabled?: boolean
  ariaLabel?: string
}

const sizeMap = {
  sm: { knob: 'w-10 h-10', indicator: 'h-3.5 w-0.5', text: 'text-xs', label: 'text-[10px]' },
  md: { knob: 'w-16 h-16', indicator: 'h-5 w-0.5', text: 'text-sm', label: 'text-xs' },
  lg: { knob: 'w-24 h-24', indicator: 'h-7 w-1', text: 'text-base', label: 'text-sm' },
}

// atan2 angle (clockwise from right) → ratio 0-1 for a 270° sweep
// Dead zone at the bottom (45°–135° and -45°–-135° physical sides)
function angleToRatio(angle: number): number {
  // Clamp to sweep boundaries
  if (angle >= 45 && angle <= 180) angle = 45
  else if (angle >= -180 && angle < -135) angle = -135
  // atan2(135°) = min, atan2(-135°) = max
  return (135 - angle) / 270
}

function toDegrees(value: number, min: number, max: number): number {
  const ratio = (value - min) / (max - min)
  return 135 - ratio * 270
}

function fromRatio(ratio: number, min: number, max: number, step: number): number {
  const clamped = Math.min(1, Math.max(0, ratio))
  const raw = min + clamped * (max - min)
  const stepped = Math.round(raw / step) * step
  return Math.min(max, Math.max(min, stepped))
}

export function Knob({
  value: controlledValue,
  defaultValue = 50,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  size = 'md',
  label,
  showValue = true,
  className,
  disabled = false,
  ariaLabel,
}: KnobProps) {
  const isControlled = controlledValue !== undefined
  const [internalValue, setInternalValue] = useState(defaultValue)
  const value = isControlled ? controlledValue : internalValue
  const knobRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const setValue = useCallback((v: number) => {
    if (!isControlled) setInternalValue(v)
    onChange?.(v)
  }, [isControlled, onChange])

  useEffect(() => {
    if (!isDragging || !knobRef.current) return
    const knob = knobRef.current

    const handleMove = (clientX: number, clientY: number) => {
      const rect = knob.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const angle = Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI)
      const ratio = angleToRatio(angle)
      setValue(fromRatio(ratio, min, max, step))
    }

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault()
      handleMove(e.clientX, e.clientY)
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      handleMove(e.touches[0].clientX, e.touches[0].clientY)
    }

    const handleEnd = () => setIsDragging(false)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsDragging(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleEnd)
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleEnd)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleEnd)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleEnd)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isDragging, min, max, step, setValue])

  const degrees = toDegrees(value, min, max)
  const s = sizeMap[size]
  const accent = getAccentColor('blue')

  return (
    <div className={cn('flex flex-col items-center gap-1', className)}>
      <div
        ref={knobRef}
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-label={ariaLabel || label || 'Knob'}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-disabled={disabled}
        onMouseDown={() => { if (!disabled) setIsDragging(true) }}
        onTouchStart={() => { if (!disabled) setIsDragging(true) }}
        onKeyDown={(e) => {
          if (disabled) return
          if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
            e.preventDefault()
            setValue(Math.min(max, value + step))
          }
          if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
            e.preventDefault()
            setValue(Math.max(min, value - step))
          }
        }}
        className={cn(
          s.knob,
          'relative rounded-full cursor-grab active:cursor-grabbing',
          getEmbossBackground(),
          getEmbossShadow(isDragging ? 'in' : 'out'),
          isDragging && 'scale-95',
          'spring-press select-none',
          disabled && 'opacity-50 cursor-not-allowed active:cursor-not-allowed',
        )}
      >
        <div
          className={cn(
            'absolute bottom-[18%] left-1/2 -translate-x-1/2 rounded-full origin-bottom',
            s.indicator,
            accent.bg,
          )}
          style={{ transform: `translateX(-50%) rotate(${degrees}deg)` }}
        />
      </div>
      {label && <span className={cn(s.label, 'text-muted-foreground')}>{label}</span>}
      {showValue && (
        <span className={cn(s.text, 'font-medium tabular-nums', accent.text)}>
          {value}
        </span>
      )}
    </div>
  )
}
