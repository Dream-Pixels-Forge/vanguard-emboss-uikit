import { useState, type ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { getEmbossShadow, getEmbossBackground } from '../../lib/tailwind-utils'

export interface SelectorKnobItem {
  /** Display label (used as fallback when no icon) */
  label: string
  /** Icon element — recommended ~20×20 */
  icon?: ReactNode
  /** Unique value */
  value: string
}

export interface SelectorKnobProps {
  items: SelectorKnobItem[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
  ariaLabel?: string
}

const sizeMap = {
  sm: { outer: 72, cap: 48, indicator: { w: 2, h: 10, top: 0.12 }, icon: 14 },
  md: { outer: 100, cap: 64, indicator: { w: 2, h: 16, top: 0.1 }, icon: 18 },
  lg: { outer: 140, cap: 92, indicator: { w: 3, h: 22, top: 0.1 }, icon: 22 },
}

const N = 6

export function SelectorKnob({
  items,
  value: controlledValue,
  defaultValue,
  onChange,
  size = 'md',
  className,
  disabled = false,
  ariaLabel = 'Selector knob',
}: SelectorKnobProps) {
  const [isActive, setIsActive] = useState(false)

  const isControlled = controlledValue !== undefined
  const [internalValue, setInternalValue] = useState(defaultValue ?? items[0]?.value ?? '')
  const currentValue = isControlled ? controlledValue : internalValue

  const selectedIdx = Math.max(0, items.findIndex(i => i.value === currentValue))

  // HSL accent from selection angle (mirrors CSS --angle → color)
  const angle = selectedIdx * (360 / N)
  const hue = ((angle % 360) + 360) % 360
  const accent = `hsl(${hue} 100% 72%)`
  const accentDark = `hsl(${hue} 98% 61%)`

  const handleToggle = () => {
    if (!disabled) setIsActive(a => !a)
  }

  const handleSelect = (val: string) => {
    if (!isControlled) setInternalValue(val)
    onChange?.(val)
    setIsActive(false)
  }

  const s = sizeMap[size]

  return (
    <div
      className={cn('relative select-none', className)}
      style={{ width: s.outer, height: s.outer }}
      data-active={isActive || undefined}
    >
      {/* Outer ring */}
      <div
        className="absolute inset-0 m-auto rounded-full transition-all duration-300"
        style={{
          width: isActive ? '112%' : '100%',
          height: isActive ? '112%' : '100%',
          background: 'hsl(0 0% 85%)',
          boxShadow: isActive
            ? `0 0 2px ${accentDark}, 0 0 6px ${accent}, inset 0 0 10px rgba(0,0,0,.2)`
            : 'inset rgba(0,0,0,.13) 0 0 2px -1px, inset rgba(0,0,0,.13) 0 2px 8px -2px, inset rgba(0,0,0,.13) 0 8px 34px -2px',
        }}
      />

      {/* Inner surface */}
      <div
        className="absolute inset-0 m-auto rounded-full transition-all duration-300"
        style={{
          width: isActive ? '106%' : '90%',
          height: isActive ? '106%' : '90%',
          background: 'hsl(0 0% 91%)',
          boxShadow: isActive
            ? 'inset 0 0 10px rgba(0,0,0,.2)'
            : 'inset rgba(0,0,0,.13) 0 0 2px -1px, inset rgba(0,0,0,.13) 0 2px 8px -2px',
        }}
      />

      {/* Radial items */}
      {items.slice(0, N).map((item, i) => {
        const isSelected = i === selectedIdx
        const deg = i * (360 / N)

        return (
          <div
            key={item.value}
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: isActive ? 1 : 0,
              transition: 'opacity 0.5s ease',
              transitionDelay: isActive ? `${i * 35}ms` : '0ms',
            }}
          >
            <button
              type="button"
              aria-label={item.label}
              aria-selected={isSelected}
              disabled={disabled}
              onClick={() => handleSelect(item.value)}
              className={cn(
                'absolute rounded-full cursor-pointer',
                'flex items-center justify-center',
                getEmbossBackground(),
                getEmbossShadow(isSelected ? 'in' : 'out', 'small'),
                'transition-all duration-300',
                disabled && 'pointer-events-none opacity-50',
              )}
              style={{
                width: s.icon * 2,
                height: s.icon * 2,
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(${isActive ? -s.outer * 0.44 : -s.outer * 0.08}px) rotate(-${deg}deg)`,
                transition: `transform 0.5s cubic-bezier(0.44, -0.9, 0.31, 1.55)`,
                transitionDelay: isActive ? `${i * 35}ms` : '0ms',
                boxShadow: isSelected
                  ? `0 0 8px ${accent}80, 0 0 20px ${accent}40, inset 0 0 3px rgba(0,0,0,.1)`
                  : undefined,
              }}
            >
              {/* Glow halo for selected */}
              {isSelected && (
                <div
                  className="absolute -inset-1.5 rounded-full blur-md pointer-events-none"
                  style={{ background: accent, opacity: 0.3 }}
                />
              )}
              {/* Icon */}
              {item.icon ? (
                <span
                  className={cn(
                    'relative z-[1] flex items-center justify-center',
                    isSelected ? 'opacity-100' : 'opacity-40',
                  )}
                  style={{
                    width: s.icon,
                    height: s.icon,
                    color: isSelected ? accent : undefined,
                  }}
                >
                  {item.icon}
                </span>
              ) : (
                <span
                  className={cn(
                    'relative z-[1] text-[10px] font-medium',
                    isSelected ? 'opacity-100' : 'opacity-40',
                  )}
                  style={{ color: isSelected ? accent : undefined }}
                >
                  {item.label}
                </span>
              )}
            </button>
          </div>
        )
      })}

      {/* Knob cap */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-expanded={isActive}
        aria-disabled={disabled}
        className={cn(
          'absolute inset-0 m-auto rounded-full cursor-pointer z-20',
          getEmbossBackground(),
          getEmbossShadow(isActive ? 'in' : 'out'),
          'transition-all duration-200',
          isActive && 'scale-[0.97]',
          disabled && 'opacity-50 cursor-not-allowed',
        )}
        style={{
          width: s.cap,
          height: s.cap,
          backgroundImage: 'linear-gradient(to bottom, hsl(0 0% 94%), hsl(0 0% 87%))',
        }}
      >
        {/* Indicator */}
        <div
          className="absolute left-1/2 rounded-full transition-all duration-300"
          style={{
            width: s.indicator.w,
            height: s.indicator.h,
            top: `${s.indicator.top * 100}%`,
            transformOrigin: 'center bottom',
            transform: `translateX(-50%) rotate(${angle}deg)`,
            background: `linear-gradient(to bottom, ${accent}, ${accentDark})`,
            boxShadow: isActive
              ? `0 0 1px rgba(0,0,0,.4), 0 0 2px 1px rgba(0,0,0,.2), 0 0 4px ${accent}, 0 0 16px hsl(${hue} 100% 72% / .5)`
              : '0 0 1px rgba(0,0,0,.4), 0 0 2px 1px rgba(0,0,0,.2)',
            opacity: isActive ? 1 : 0.5,
          }}
        />
      </button>
    </div>
  )
}
