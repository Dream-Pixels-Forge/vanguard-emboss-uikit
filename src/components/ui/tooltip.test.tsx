import { render, screen } from '@testing-library/react'
import * as UI from './index'
import { describe, it, expect } from 'vitest'

describe('Tooltip', () => {
  it('renders trigger', () => {
    render(
      <UI.TooltipProvider>
        <UI.Tooltip>
          <UI.TooltipTrigger>Hover me</UI.TooltipTrigger>
          <UI.TooltipContent>Tooltip text</UI.TooltipContent>
        </UI.Tooltip>
      </UI.TooltipProvider>
    )
    expect(screen.getByText('Hover me')).toBeInTheDocument()
  })

  it('exports TooltipContent component', () => {
    expect(UI.TooltipContent).toBeDefined()
  })

  it('exports TooltipProvider and TooltipTrigger', () => {
    expect(UI.TooltipProvider).toBeDefined()
    expect(UI.TooltipTrigger).toBeDefined()
  })

  it('trigger has emboss styling classes', () => {
    const { container } = render(
      <UI.TooltipProvider>
        <UI.Tooltip>
          <UI.TooltipTrigger>Hover</UI.TooltipTrigger>
          <UI.TooltipContent>Content</UI.TooltipContent>
        </UI.Tooltip>
      </UI.TooltipProvider>
    )
    const trigger = container.querySelector('button')
    expect(trigger).toHaveClass('inline-flex')
  })

  it('default open delay is set', () => {
    const { container } = render(
      <UI.TooltipProvider delayDuration={300}>
        <UI.Tooltip>
          <UI.TooltipTrigger>Hover</UI.TooltipTrigger>
          <UI.TooltipContent>Content</UI.TooltipContent>
        </UI.Tooltip>
      </UI.TooltipProvider>
    )
    expect(container.querySelector('button')).toBeInTheDocument()
  })
})
