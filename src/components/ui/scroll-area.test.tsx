import { render, screen } from '@testing-library/react'
import * as UI from './index'
import { describe, it, expect } from 'vitest'
import { ScrollArea } from './scroll-area'

describe('ScrollArea', () => {
  it('renders children', () => {
    render(
      <ScrollArea className="h-48 w-80">
        <p>Scroll content</p>
      </ScrollArea>
    )
    expect(screen.getByText('Scroll content')).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.ScrollArea).toBeDefined()
    expect(UI.ScrollBar).toBeDefined()
  })
})
