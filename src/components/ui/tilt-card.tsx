import React, { useRef, useState, useCallback } from 'react'
import { cn } from '../../lib/utils'
import { getEmbossShadow, getEmbossBackground, getEmbossBorder } from '../../lib/tailwind-utils'

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  perspective?: number
  maxTilt?: number
  scale?: number
  glare?: boolean
  className?: string
}

export function TiltCard({
  children,
  perspective = 1000,
  maxTilt = 15,
  scale = 1.02,
  glare = true,
  className,
  ...props
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glareOpacity, setGlareOpacity] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) / (rect.width / 2)
      const deltaY = (e.clientY - centerY) / (rect.height / 2)
      setTilt({ x: deltaY * maxTilt, y: deltaX * maxTilt })
      if (glare) {
        setGlareOpacity(Math.max(0, 1 - Math.abs(deltaX) - Math.abs(deltaY)))
      }
    },
    [maxTilt, glare]
  )

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setTilt({ x: 0, y: 0 })
    setGlareOpacity(0)
  }, [])

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn('perspective-[var(--perspective)]', className)}
      style={{ '--perspective': `${perspective}px` } as React.CSSProperties}
      {...props}
    >
      <div
        className={cn(
          getEmbossBackground(),
          getEmbossShadow('out'),
          getEmbossBorder(),
          'relative rounded-xl overflow-hidden',
          'transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]',
          isHovered && 'z-10'
        )}
        style={{
          transform: isHovered
            ? `perspective(${perspective}px) rotateX(${-tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${scale},${scale},${scale})`
            : `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`,
        }}
      >
        {children}
        {glare && (
          <div
            className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-200"
            style={{
              opacity: glareOpacity * 0.4,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)',
            }}
          />
        )}
      </div>
    </div>
  )
}
