import { render, screen } from '@testing-library/react'
import * as UI from './index'
import { describe, it, expect } from 'vitest'
import { TiltCard } from './tilt-card'

describe('TiltCard', () => {
  it('renders children', () => {
    render(<TiltCard><p>Tilt content</p></TiltCard>)
    expect(screen.getByText('Tilt content')).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.TiltCard).toBeDefined()
  })
})
