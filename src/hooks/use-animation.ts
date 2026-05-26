import { useRef, useState, useCallback, useEffect } from 'react'

const DEFAULT_DURATION = 250
const DEFAULT_EASING = 'cubic-bezier(0.16, 1, 0.3, 1)'
const DEFAULT_DELAY = 0

function useAnimation(options?: {
  duration?: number
  easing?: string
  delay?: number
}): {
  isAnimating: boolean
  start: () => void
  stop: () => void
  style: React.CSSProperties
} {
  const {
    duration = DEFAULT_DURATION,
    easing = DEFAULT_EASING,
    delay = DEFAULT_DELAY,
  } = options ?? {}

  const [isAnimating, setIsAnimating] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const mountedRef = useRef(true)

  useEffect(() => {
    return () => {
      mountedRef.current = false
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const start = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
    }
    setIsAnimating(true)
    timeoutRef.current = setTimeout(() => {
      if (mountedRef.current) {
        setIsAnimating(false)
      }
    }, duration + delay)
  }, [duration, delay])

  const stop = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsAnimating(false)
  }, [])

  const style: React.CSSProperties = {
    transition: `all ${duration}ms ${easing}`,
    transitionDelay: `${delay}ms`,
  }

  return { isAnimating, start, stop, style }
}

export { useAnimation }
