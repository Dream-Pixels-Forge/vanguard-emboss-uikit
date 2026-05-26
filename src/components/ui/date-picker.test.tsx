import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { DatePicker } from './date-picker'

describe('DatePicker', () => {
  it('renders with placeholder', () => {
    render(<DatePicker placeholder="Pick a date" />)
    expect(screen.getByText('Pick a date')).toBeInTheDocument()
  })
})
