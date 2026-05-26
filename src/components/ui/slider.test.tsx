import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Slider } from './slider'

describe('Slider', () => {
  it('renders', () => {
    render(<Slider aria-label="Volume" />)
    expect(screen.getByRole('slider')).toBeInTheDocument()
  })

  it('renders with default values', () => {
    render(<Slider defaultValue={[50]} aria-label="Volume" />)
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '50')
  })
})
