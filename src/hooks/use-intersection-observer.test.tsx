import { renderHook, render, waitFor, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useIntersectionObserver } from './use-intersection-observer'

type IOCallback = (entries: Partial<IntersectionObserverEntry>[]) => void

interface MockIOInstance {
  callback: IOCallback
  observe: ReturnType<typeof vi.fn>
  unobserve: ReturnType<typeof vi.fn>
  disconnect: ReturnType<typeof vi.fn>
}

describe('useIntersectionObserver', () => {
  let instances: MockIOInstance[]
  let originalIO: typeof IntersectionObserver | undefined
  let mockCalls: Array<{ callback: IOCallback; options?: IntersectionObserverInit }>

  beforeEach(() => {
    vi.restoreAllMocks()
    instances = []
    mockCalls = []

    class MockIntersectionObserver {
      callback: IOCallback
      observe = vi.fn()
      unobserve = vi.fn()
      disconnect = vi.fn()

      constructor(callback: IOCallback, options?: IntersectionObserverInit) {
        this.callback = callback
        mockCalls.push({ callback, options })
        instances.push(this)
      }
    }

    originalIO = globalThis.IntersectionObserver
    Object.defineProperty(globalThis, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: MockIntersectionObserver,
    })
  })

  afterEach(() => {
    if (originalIO) {
      Object.defineProperty(globalThis, 'IntersectionObserver', {
        writable: true,
        configurable: true,
        value: originalIO,
      })
    }
  })

  it('returns correct initial state', () => {
    const { result } = renderHook(() => useIntersectionObserver())

    expect(result.current.entry).toBeNull()
    expect(result.current.isIntersecting).toBe(false)
    expect(result.current.intersectionRatio).toBe(0)
    expect(result.current.ref).toBeDefined()
  })

  it('observes the ref element and updates on intersection', async () => {
    function TestComponent() {
      const { ref, isIntersecting, intersectionRatio, entry } =
        useIntersectionObserver<HTMLDivElement>()
      return (
        <div>
          <div ref={ref} data-testid="target" />
          <span data-testid="intersecting">{isIntersecting.toString()}</span>
          <span data-testid="ratio">{intersectionRatio}</span>
          <span data-testid="entry-null">{entry === null ? 'null' : 'set'}</span>
        </div>
      )
    }

    const { getByTestId } = render(<TestComponent />)

    // Initially not intersecting
    expect(getByTestId('intersecting').textContent).toBe('false')
    expect(getByTestId('ratio').textContent).toBe('0')
    expect(getByTestId('entry-null').textContent).toBe('null')

    // Simulate intersection
    expect(instances.length).toBeGreaterThan(0)
    const instance = instances[instances.length - 1]

    act(() => {
      instance.callback([
        {
          isIntersecting: true,
          intersectionRatio: 0.75,
          boundingClientRect: {} as DOMRectReadOnly,
          intersectionRect: {} as DOMRectReadOnly,
          rootBounds: null,
          target: getByTestId('target'),
          time: 200,
        },
      ])
    })

    await waitFor(() => {
      expect(getByTestId('intersecting').textContent).toBe('true')
    })
    expect(getByTestId('ratio').textContent).toBe('0.75')
    expect(getByTestId('entry-null').textContent).toBe('set')
  })

  it('cleans up observer on unmount', () => {
    function TestComponent() {
      const { ref } = useIntersectionObserver<HTMLDivElement>()
      return <div ref={ref} />
    }

    const { unmount } = render(<TestComponent />)

    expect(instances.length).toBeGreaterThan(0)
    const instance = instances[instances.length - 1]

    unmount()

    expect(instance.disconnect).toHaveBeenCalledTimes(1)
  })

  it('passes options to IntersectionObserver constructor', () => {
    const options: IntersectionObserverInit = {
      threshold: 0.5,
      rootMargin: '10px',
      root: null,
    }

    function TestComponent() {
      const { ref } = useIntersectionObserver<HTMLDivElement>(options)
      return <div ref={ref} />
    }

    render(<TestComponent />)

    expect(mockCalls.length).toBeGreaterThan(0)
    expect(mockCalls[mockCalls.length - 1].options).toEqual(options)
  })

  it('works without any options (uses defaults)', () => {
    function TestComponent() {
      const { ref } = useIntersectionObserver<HTMLDivElement>()
      return <div ref={ref} />
    }

    render(<TestComponent />)

    expect(mockCalls.length).toBeGreaterThan(0)
    expect(mockCalls[mockCalls.length - 1].options).toBeUndefined()
  })

  it('handles SSR safely when IntersectionObserver is not defined', () => {
    // Remove IntersectionObserver
    Object.defineProperty(globalThis, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: undefined,
    })

    function TestComponent() {
      const { ref, isIntersecting, intersectionRatio, entry } =
        useIntersectionObserver<HTMLDivElement>()
      return (
        <div ref={ref}>
          <span data-testid="ssr-intersecting">{isIntersecting.toString()}</span>
          <span data-testid="ssr-ratio">{intersectionRatio}</span>
          <span data-testid="ssr-entry">{entry === null ? 'null' : 'set'}</span>
        </div>
      )
    }

    let result: ReturnType<typeof render> | undefined
    expect(() => {
      result = render(<TestComponent />)
    }).not.toThrow()

    expect(result!.getByTestId('ssr-intersecting').textContent).toBe('false')
    expect(result!.getByTestId('ssr-ratio').textContent).toBe('0')
    expect(result!.getByTestId('ssr-entry').textContent).toBe('null')
  })
})
