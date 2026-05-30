import { useState } from 'react'
import { cn } from '../../lib/utils'
import { getEmbossShadow, getEmbossBackground } from '../../lib/tailwind-utils'

export interface SelectorKnobItem {
  /** Display label */
  label: string
  /** Icon element (rendered at ~20×20) */
  icon?: React.ReactNode
  /** Unique value */
  value: string
}

export interface SelectorKnobProps {
  items: SelectorKnobItem[]
  /** Controlled selected value */
  value?: string
  /** Uncontrolled default */
  defaultValue?: string
  onChange?: (value: string) => void
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
  ariaLabel?: string
}

const sizeMap = {
  sm: { outer: 80, cap: 56, indicatorH: 10, indicatorW: 2, icon: 16 },
  md: { outer: 112, cap: 76, indicatorH: 14, indicatorW: 3, icon: 20 },
  lg: { outer: 160, cap: 110, indicatorH: 18, indicatorW: 3, icon: 24 },
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

  // Dynamic HSL accent — mirrors the CSS reference's angle → color mapping
  const angle = selectedIdx * (360 / N)
  const hue = ((angle % 360) + 360) % 360
  const accent = `hsl(${hue} 100% 72%)`
  const accentDark = `hsl(${hue} 98% 61%)`

  const toggle = () => {
    if (!disabled) setIsActive(a => !a)
  }

  const select = (val: string) => {
    if (!isControlled) setInternalValue(val)
    onChange?.(val)
    setIsActive(false)
  }

  const s = sizeMap[size]

  return (
    <div
      className={cn('relative', className)}
      style={{ width: s.outer, height: s.outer }}
      data-active={isActive || undefined}
    >
      {/* ── Outer ring (border + glow) ── */}
      <div
        className="absolute inset-0 m-auto rounded-full transition-all duration-300"
        style={{
          width: isActive ? '112%' : '100%',
          height: isActive ? '112%' : '100%',
          background: 'hsl(0 0% 85%)',
          boxShadow: isActive
            ? `0 0 2px ${accentDark}, 0 0 6px ${accent}, ` +
              `inset 0 0 10px rgba(0,0,0,.2), ` +
              `0 0 2px -.5px rgba(0,0,0,.125), 0 1px 5px -1px rgba(0,0,0,.125), ` +
              `0 4px 12px -1.5px rgba(0,0,0,.125), 0 9px 28px -2px rgba(0,0,0,.125)`
            : `inset rgba(0,0,0,.13) 0 0 2px -1px, ` +
              `inset rgba(0,0,0,.13) 0 2px 8px -2px, ` +
              `inset rgba(0,0,0,.13) 0 8px 34px -2px`,
          zIndex: 1,
        }}
      />

      {/* ── Inner surface ── */}
      <div
        className={cn(
          'absolute inset-0 m-auto rounded-full transition-all duration-300',
          getEmbossBackground(),
        )}
        style={{
          width: isActive ? '106%' : '90%',
          height: isActive ? '106%' : '90%',
          boxShadow: isActive
            ? 'inset 0 0 10px rgba(0,0,0,.2)'
            : 'inset rgba(0,0,0,.13) 0 0 2px -1px, inset rgba(0,0,0,.13) 0 2px 8px -2px',
          zIndex: 2,
        }}
      />

      {/* ── Radial items ── */}
      {items.slice(0, N).map((item, i) => {
        const isSelected = i === selectedIdx
        const deg = i * (360 / N)

        return (
          <button
            key={item.value}
            type="button"
            aria-label={item.label}
            aria-selected={isSelected}
            disabled={disabled}
            onClick={() => select(item.value)}
            className={cn(
              'absolute inset-0 m-auto rounded-full cursor-pointer',
              'flex items-center justify-center',
              'transition-all duration-500',
              disabled && 'pointer-events-none',
            )}
            style={{
              // Each item sits in a small circle that can slide outward
              width: '24%',
              height: '24%',
              opacity: isActive ? 1 : 0,
              transform: isActive
                ? `rotate(${deg}deg) translateY(-140%) rotate(-${deg}deg) scale(1)`
                : `rotate(${deg}deg) translateY(-20%) rotate(-${deg}deg) scale(0.6)`,
              transitionDelay: isActive ? `${i * 35}ms` : '0ms',
              zIndex: 10,
              background: getEmbossBackground().includes('dark')
                ? 'hsl(200 15% 11%)'
                : 'hsl(0 0% 91%)',
              boxShadow: isSelected
                ? `inset 0 0 6px rgba(0,0,0,.15), 0 0 8px ${accent}80, 0 0 20px ${accent}40`
                : getEmbossShadow('out', 'small'),
            }}
          >
            {/* Selected glow halo */}
            {isSelected && (
              <div
                className="absolute inset-[-4px] rounded-full blur-md pointer-events-none"
                style={{ background: accent, opacity: 0.35 }}
              />
            )}
            {/* Icon / label */}
            {item.icon ? (
              <span
                className={cn(
                  'relative z-[1] flex items-center justify-center',
                  isSelected ? 'opacity-100' : 'opacity-45',
                  'transition-opacity duration-300',
                )}
                style={{ width: s.icon, height: s.icon }}
              >
                {item.icon}
              </span>
            ) : (
              <span
                className={cn(
                  'relative z-[1] text-xs font-medium',
                  isSelected ? 'opacity-100' : 'opacity-45',
                )}
                style={{ color: isSelected ? accent : undefined }}
              >
                {item.label}
              </span>
            )}
          </button>
        )
      })}

      {/* ── Knob cap (raised circle on top) ── */}
      <button
        type="button"
        onClick={toggle}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-expanded={isActive}
        aria-disabled={disabled}
        className={cn(
          'absolute inset-0 m-auto rounded-full cursor-pointer z-20',
          'flex items-center justify-center',
          getEmbossBackground(),
          getEmbossShadow(isActive ? 'in' : 'out'),
          'transition-transform duration-200',
          isActive && 'scale-[0.97]',
          disabled && 'opacity-50 cursor-not-allowed',
        )}
        style={{
          width: s.cap,
          height: s.cap,
          backgroundImage: `linear-gradient(to bottom, hsl(0 0% 94%), hsl(0 0% 87%))`,
        }}
      >
        {/* Knob indicator */}
        <div
          className="absolute rounded-full transition-all duration-300"
          style={{
            width: s.indicatorW,
            height: s.indicatorH,
            top: Math.round(s.cap * 0.12),
            left: '50%',
            transformOrigin: 'center bottom',
            transform: `translateX(-50%) rotate(${angle}deg)`,
            background: `linear-gradient(to bottom, ${accent}, ${accentDark})`,
            boxShadow: isActive
              ? `0 0 1px rgba(0,0,0,.4), 0 0 2px 1px rgba(0,0,0,.2), ` +
                `0 0 4px ${accent}, 0 0 16px hsl(${hue} 100% 72% / .5)`
              : '0 0 1px rgba(0,0,0,.4), 0 0 2px 1px rgba(0,0,0,.2)',
            opacity: isActive ? 1 : 0.5,
          }}
        />
      </button>
    </div>
  )
}
