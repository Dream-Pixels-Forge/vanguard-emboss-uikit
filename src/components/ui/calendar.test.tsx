import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Calendar } from './calendar'

describe('Calendar', () => {
  it('renders', () => {
    const { container } = render(<Calendar mode="single" />)
    expect(container.querySelector('table')).toBeInTheDocument()
  })
})
