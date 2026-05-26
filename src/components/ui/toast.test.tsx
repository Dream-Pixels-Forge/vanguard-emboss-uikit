import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import React from 'react'
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose } from './toast'

beforeAll(() => {
  // Polyfill for Radix Toast's animation frames
  vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => {
    cb(0)
    return 0
  })
})

function TestToast({
  variant,
  title = 'Title',
  description = 'Description',
}: {
  variant?: 'default' | 'success' | 'error' | 'warning'
  title?: string
  description?: string
}) {
  const [open, setOpen] = React.useState(true)
  return (
    <ToastProvider>
      <Toast open={open} onOpenChange={setOpen} variant={variant} forceMount>
        <ToastTitle>{title}</ToastTitle>
        <ToastDescription>{description}</ToastDescription>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  )
}

describe('Toast', () => {
  it('renders with title and description', () => {
    render(<TestToast title="Test Title" description="Test Description" />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('applies default variant classes', () => {
    const { container } = render(<TestToast variant="default" />)
    const toast = container.querySelector('[role="status"]') || container.querySelector('li')
    expect(toast).toBeInTheDocument()
    expect(toast).toHaveClass('text-foreground')
  })

  it('applies success variant classes', () => {
    const { container } = render(<TestToast variant="success" />)
    const toast = container.querySelector('[role="status"]') || container.querySelector('li')
    expect(toast).toBeInTheDocument()
    expect(toast).toHaveClass('border-emboss-accent-green/50')
  })

  it('applies error variant classes', () => {
    const { container } = render(<TestToast variant="error" />)
    const toast = container.querySelector('[role="status"]') || container.querySelector('li')
    expect(toast).toBeInTheDocument()
    expect(toast).toHaveClass('border-red-500/50')
  })

  it('applies warning variant classes', () => {
    const { container } = render(<TestToast variant="warning" />)
    const toast = container.querySelector('[role="status"]') || container.querySelector('li')
    expect(toast).toBeInTheDocument()
    expect(toast).toHaveClass('border-emboss-accent-orange/50')
  })
})
