import { render, screen } from '@testing-library/react'
import * as UI from './index'
import { describe, it, expect } from 'vitest'
import { Empty } from './empty'

describe('Empty', () => {
  it('renders title and description', () => {
    render(<Empty title="Empty" description="Nothing here" />)
    expect(screen.getByText('Empty')).toBeInTheDocument()
    expect(screen.getByText('Nothing here')).toBeInTheDocument()
  })

  it('renders action', () => {
    render(<Empty title="Empty" action={<button>Action</button>} />)
    expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.Empty).toBeDefined()
  })
})
