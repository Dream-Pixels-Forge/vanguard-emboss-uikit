import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Combobox } from './combobox'

describe('Combobox', () => {
  it('renders with placeholder', () => {
    render(<Combobox items={[{ value: 'a', label: 'A' }]} placeholder="Select..." />)
    expect(screen.getByText('Select...')).toBeInTheDocument()
  })
})
