import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AspectRatio } from './aspect-ratio'

describe('AspectRatio', () => {
  it('renders children', () => {
    render(<AspectRatio ratio={16 / 9}><div>Content</div></AspectRatio>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })
})
