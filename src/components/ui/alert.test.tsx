import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Alert } from './alert'

describe('Alert', () => {
  it('renders children', () => {
    render(<Alert>Message</Alert>)
    expect(screen.getByText('Message')).toBeInTheDocument()
  })

  it('renders with role="alert"', () => {
    render(<Alert>Alert</Alert>)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(<Alert title="Warning">Message</Alert>)
    expect(screen.getByText('Warning')).toBeInTheDocument()
  })

  it('renders dismiss button when dismissible', () => {
    const onDismiss = vi.fn()
    render(<Alert dismissible onDismiss={onDismiss}>Dismiss me</Alert>)
    expect(screen.getByRole('button', { name: /dismiss/i })).toBeInTheDocument()
  })

  it('calls onDismiss when dismiss button clicked', async () => {
    const onDismiss = vi.fn()
    const user = userEvent.setup()
    render(<Alert dismissible onDismiss={onDismiss}>Dismiss me</Alert>)
    await user.click(screen.getByRole('button', { name: /dismiss/i }))
    expect(onDismiss).toHaveBeenCalledOnce()
  })

  it('renders custom icon', () => {
    render(<Alert icon={<span data-testid="custom-icon">*</span>}>Alert</Alert>)
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
  })
})
