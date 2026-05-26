import React from 'react'
import { cn } from '../../lib/utils'
import { getEmbossBackground, getEmbossShadow } from '../../lib/tailwind-utils'

export interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config?: Record<string, { label: string; color?: string }>
}

export function ChartContainer({ config, className, children, ...props }: ChartContainerProps) {
  const cssVars = React.useMemo(() => {
    if (!config) return {}
    const vars: Record<string, string> = {}
    for (const [key, value] of Object.entries(config)) {
      if (value.color) {
        vars[`--color-${key}`] = value.color
      }
    }
    return vars as React.CSSProperties
  }, [config])

  return (
    <div
      className={cn('flex aspect-video justify-center text-sm', className)}
      style={cssVars}
      {...props}
    >
      <div className="flex h-full w-full flex-col">
        <div className="flex flex-1 items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  )
}

export interface ChartTooltipProps {
  children: React.ReactNode
}

export function ChartTooltip({ children }: ChartTooltipProps) {
  return <>{children}</>
}

export interface ChartTooltipContentProps {
  active?: boolean
  payload?: Array<{ name?: string; value?: number; fill?: string; dataKey?: string }>
  label?: string
  hideLabel?: boolean
  hideIndicator?: boolean
  indicator?: 'dot' | 'line' | 'dashed'
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  hideLabel = false,
  hideIndicator = false,
  indicator = 'dot',
}: ChartTooltipContentProps) {
  if (!active || !payload?.length) return null

  return (
    <div
      className={cn(
        getEmbossBackground(),
        getEmbossShadow('out', 'small'),
        'rounded-xl border border-emboss-shadow-light/30 dark:border-emboss-shadow-dark/30',
        'px-3 py-2 text-sm'
      )}
    >
      {!hideLabel && label && (
        <div className="mb-1 font-medium text-foreground">{label}</div>
      )}
      <div className="flex flex-col gap-1">
        {payload.map((item, i) => {
          const key = item.dataKey || item.name || `item-${i}`
          return (
            <div key={key} className="flex items-center gap-2">
              {!hideIndicator && (
                indicator === 'dot' ? (
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ background: item.fill || 'currentColor' }}
                  />
                ) : indicator === 'line' ? (
                  <div
                    className="h-1 w-3 rounded-full"
                    style={{ background: item.fill || 'currentColor' }}
                  />
                ) : (
                  <div
                    className="h-0.5 w-3 border border-dashed"
                    style={{ borderColor: item.fill || 'currentColor' }}
                  />
                )
              )}
              <span className="text-muted-foreground">{item.name || key}</span>
              <span className="font-medium text-foreground">{item.value}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export interface ChartLegendProps {
  children: React.ReactNode
}

export function ChartLegend({ children }: ChartLegendProps) {
  return <>{children}</>
}

export interface ChartLegendContentProps {
  payload?: Array<{ value?: string; color?: string }>
}

export function ChartLegendContent({ payload }: ChartLegendContentProps) {
  if (!payload?.length) return null

  return (
    <div className="flex flex-wrap items-center gap-4 pt-3">
      {payload.map((item, i) => (
        <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <div
            className="h-2 w-2 rounded-full"
            style={{ background: item.color || 'currentColor' }}
          />
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  )
}
