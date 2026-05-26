import { Toaster as SonnerToaster, toast as sonnerToast } from 'sonner'
import { cn } from '../../lib/utils'

export interface ToastProviderProps {
  className?: string
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center'
  richColors?: boolean
  closeButton?: boolean
}

export function ToastProvider({
  className,
  position = 'bottom-right',
  richColors = false,
  closeButton = true,
}: ToastProviderProps) {
  return (
    <SonnerToaster
      position={position}
      richColors={richColors}
      closeButton={closeButton}
      className={cn('pointer-events-auto', className)}
      toastOptions={{
        className: 'border-emboss-shadow-light/30 dark:border-emboss-shadow-dark/30 shadow-emboss-out-light-sm dark:shadow-emboss-out-dark-sm',
      }}
    />
  )
}

type ToastData = Record<string, unknown>

interface ToastAPI {
  (message: string, data?: ToastData): string | number
  success: (message: string, data?: ToastData) => string | number
  error: (message: string, data?: ToastData) => string | number
  info: (message: string, data?: ToastData) => string | number
  warning: (message: string, data?: ToastData) => string | number
  dismiss: (id?: string | number) => void
  loading: (message: string, data?: ToastData) => string | number
  promise: <T>(promise: Promise<T>, data?: ToastData) => string | number
}

/**
 * Thin wrapper around sonner's toast function.
 *
 * This insulates consumers from sonner's raw API — if sonner makes a
 * breaking change, only this wrapper needs updating rather than every
 * consumer's import.
 *
 * @example
 *   toast('Hello world')
 *   toast.success('Saved!')
 *   toast.error('Something went wrong')
 */
export const toast: ToastAPI = sonnerToast as unknown as ToastAPI
