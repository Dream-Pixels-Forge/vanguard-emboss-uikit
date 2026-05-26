import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Knob } from './knob'

describe('Knob', () => {
  it('renders with default value', () => {
    render(<Knob defaultValue={50} />)
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '50')
  })

  it('renders label', () => {
    render(<Knob label="Volume" />)
    expect(screen.getByText('Volume')).toBeInTheDocument()
  })

  it('renders with min/max', () => {
    render(<Knob min={0} max={10} defaultValue={5} />)
    const slider = screen.getByRole('slider')
    expect(slider).toHaveAttribute('aria-valuemin', '0')
    expect(slider).toHaveAttribute('aria-valuemax', '10')
  })

  it('applies size classes', () => {
    const { container } = render(<Knob size="lg" />)
    expect(container.firstChild?.firstChild).toHaveClass('w-24')
  })

  it('shows value text by default', () => {
    render(<Knob defaultValue={42} />)
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('hides value when showValue is false', () => {
    render(<Knob defaultValue={42} showValue={false} />)
    expect(screen.queryByText('42')).not.toBeInTheDocument()
  })

  it('is disabled', () => {
    render(<Knob disabled aria-label="Knob" />)
    expect(screen.getByRole('slider')).toHaveAttribute('aria-disabled', 'true')
  })

  it('is controlled', () => {
    const { rerender } = render(<Knob value={30} />)
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '30')
    rerender(<Knob value={80} />)
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '80')
  })

  it('responds to keyboard input', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<Knob defaultValue={50} onChange={onChange} />)
    const slider = screen.getByRole('slider')
    slider.focus()
    await user.keyboard('{ArrowRight}')
    expect(onChange).toHaveBeenCalledWith(51)
  })
})
