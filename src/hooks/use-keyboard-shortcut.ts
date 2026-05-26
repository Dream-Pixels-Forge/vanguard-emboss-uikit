import { useEffect, useCallback, useRef } from 'react'

export type KeyModifier = 'ctrl' | 'cmd' | 'shift' | 'alt' | 'meta'

export interface KeyboardShortcutOptions {
  enabled?: boolean
  scope?: React.RefObject<HTMLElement | null>
  preventDefault?: boolean
  order?: number
}

function isMac(): boolean {
  if (typeof navigator === 'undefined') return false
  return /Mac|iPhone|iPad|iPod/.test(navigator.platform ?? '')
}

function parseShortcut(shortcut: string): { key: string; modifiers: Set<string> } {
  const parts = shortcut
    .toLowerCase()
    .split('+')
    .map((s) => s.trim())

  const modifiers = new Set<string>()
  let key = ''

  for (const part of parts) {
    if (['ctrl', 'cmd', 'meta', 'shift', 'alt', 'mod'].includes(part)) {
      if (part === 'mod') {
        modifiers.add(isMac() ? 'meta' : 'ctrl')
      } else {
        modifiers.add(part)
      }
    } else {
      key = part
    }
  }

  return { key, modifiers }
}

function matchesEvent(event: KeyboardEvent, parsed: { key: string; modifiers: Set<string> }): boolean {
  const eventKey = event.key.toLowerCase()
  const eventMods = new Set<string>()

  if (event.ctrlKey) eventMods.add('ctrl')
  if (event.metaKey) eventMods.add('meta')
  if (event.shiftKey) eventMods.add('shift')
  if (event.altKey) eventMods.add('alt')

  const normalize = (k: string) => {
    if (k === ' ') return 'space'
    if (k.length === 1) return k
    return k.toLowerCase()
  }

  if (normalize(eventKey) !== normalize(parsed.key)) return false

  if (parsed.modifiers.size !== eventMods.size) return false

  for (const mod of parsed.modifiers) {
    if (!eventMods.has(mod)) return false
  }

  return true
}

export function useKeyboardShortcut(
  shortcut: string,
  handler: (event: KeyboardEvent) => void,
  options?: KeyboardShortcutOptions
): void {
  const { enabled = true, scope, preventDefault: shouldPrevent = false } = options ?? {}
  const handlerRef = useRef(handler)
  handlerRef.current = handler

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return

      const parsed = parseShortcut(shortcut)
      if (!matchesEvent(event, parsed)) return

      if (scope?.current && !scope.current.contains(event.target as Node)) return

      if (shouldPrevent) {
        event.preventDefault()
      }

      handlerRef.current(event)
    },
    [shortcut, enabled, scope, shouldPrevent]
  )

  useEffect(() => {
    if (!enabled) return

    const target = scope?.current ?? window
    target.addEventListener('keydown', handleKeyDown as EventListener)

    return () => {
      target.removeEventListener('keydown', handleKeyDown as EventListener)
    }
  }, [enabled, scope, handleKeyDown])
}
