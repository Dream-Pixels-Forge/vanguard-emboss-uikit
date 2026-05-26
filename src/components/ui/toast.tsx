import { Toaster as SonnerToaster } from 'sonner'
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
