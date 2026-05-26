import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { useAnimation } from './use-animation'

describe('useAnimation', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns expected initial state', () => {
    const { result } = renderHook(() => useAnimation())

    expect(result.current.isAnimating).toBe(false)
    expect(typeof result.current.start).toBe('function')
    expect(typeof result.current.stop).toBe('function')
    expect(result.current.style).toBeDefined()
    expect(result.current.style.transition).toBe(
      'all 250ms cubic-bezier(0.16, 1, 0.3, 1)'
    )
  })

  it('start() sets isAnimating to true then resets after duration', async () => {
    vi.useFakeTimers()
    const { result } = renderHook(() => useAnimation({ duration: 300 }))

    act(() => {
      result.current.start()
    })

    expect(result.current.isAnimating).toBe(true)

    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(result.current.isAnimating).toBe(false)

    vi.useRealTimers()
  })

  it('stop() immediately sets isAnimating to false', () => {
    const { result } = renderHook(() => useAnimation())

    act(() => {
      result.current.start()
    })
    expect(result.current.isAnimating).toBe(true)

    act(() => {
      result.current.stop()
    })
    expect(result.current.isAnimating).toBe(false)
  })

  it('accepts custom easing and delay options', () => {
    const { result } = renderHook(() =>
      useAnimation({
        duration: 400,
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        delay: 100,
      })
    )

    expect(result.current.style.transition).toBe(
      'all 400ms cubic-bezier(0.34, 1.56, 0.64, 1)'
    )
    expect(result.current.style.transitionDelay).toBe('100ms')
  })

  it('applies default options when none provided', () => {
    const { result } = renderHook(() => useAnimation())

    expect(result.current.style.transition).toBe(
      'all 250ms cubic-bezier(0.16, 1, 0.3, 1)'
    )
  })

  it('cleans up timeout on unmount', () => {
    const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout')
    const { result, unmount } = renderHook(() => useAnimation({ duration: 500 }))

    act(() => {
      result.current.start()
    })

    unmount()

    expect(clearTimeoutSpy).toHaveBeenCalled()
  })
})
