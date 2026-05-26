import { useState, useEffect } from 'react'

const MAX_TOASTS = 5

export type ToastVariant = 'default' | 'success' | 'error' | 'warning'

export interface ToastData {
  id: string
  title?: string
  description?: string
  variant: ToastVariant
  duration: number
}

let globalListeners: Array<() => void> = []
let globalToasts: ToastData[] = []

function subscribe(listener: () => void) {
  globalListeners = [...globalListeners, listener]
  return () => {
    globalListeners = globalListeners.filter(l => l !== listener)
  }
}

function addToast(toast: Omit<ToastData, 'id'>) {
  const id = Math.random().toString(36).slice(2)
  const newToast: ToastData = { ...toast, id }
  globalToasts = [...globalToasts, newToast].slice(-MAX_TOASTS)
  globalListeners.forEach(l => l())

  if (toast.duration > 0) {
    setTimeout(() => dismissToast(id), toast.duration)
  }

  return id
}

function dismissToast(id: string) {
  globalToasts = globalToasts.filter(t => t.id !== id)
  globalListeners.forEach(l => l())
}

function toastFn(title: string, options?: { description?: string; variant?: ToastVariant; duration?: number }) {
  return addToast({
    title,
    description: options?.description,
    variant: options?.variant ?? 'default',
    duration: options?.duration ?? 5000,
  })
}

toastFn.success = (title: string, options?: { description?: string; duration?: number }) =>
  toastFn(title, { ...options, variant: 'success' })

toastFn.error = (title: string, options?: { description?: string; duration?: number }) =>
  toastFn(title, { ...options, variant: 'error' })

toastFn.warning = (title: string, options?: { description?: string; duration?: number }) =>
  toastFn(title, { ...options, variant: 'warning' })

toastFn.dismiss = dismissToast

export { toastFn as toast }

export function useToast() {
  const [toasts, setToasts] = useState<ToastData[]>([])

  useEffect(() => {
    setToasts([...globalToasts])
    return subscribe(() => {
      setToasts([...globalToasts])
    })
  }, [])

  return {
    toasts,
    toast: toastFn,
    dismiss: dismissToast,
  }
}
