import { render, screen } from '@testing-library/react'
import * as UI from './index'
import { describe, it, expect } from 'vitest'
import { ChartContainer, ChartLegendContent, ChartTooltipContent } from './chart'

describe('Chart', () => {
  it('renders container', () => {
    render(
      <ChartContainer config={{ test: { label: 'Test', color: '#000' } }}>
        <div>Chart</div>
      </ChartContainer>
    )
    expect(screen.getByText('Chart')).toBeInTheDocument()
  })

  it('ChartTooltipContent renders with payload', () => {
    render(
      <ChartTooltipContent active payload={[{ name: 'Revenue', value: 100 }]} />
    )
    expect(screen.getByText('Revenue')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
  })

  it('ChartTooltipContent returns null when inactive', () => {
    const { container } = render(<ChartTooltipContent active={false} />)
    expect(container.firstChild).toBeNull()
  })

  it('ChartLegendContent renders with payload', () => {
    render(
      <ChartLegendContent payload={[{ value: 'Revenue', color: '#000' }]} />
    )
    expect(screen.getByText('Revenue')).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.ChartContainer).toBeDefined()
    expect(UI.ChartTooltip).toBeDefined()
    expect(UI.ChartTooltipContent).toBeDefined()
    expect(UI.ChartLegend).toBeDefined()
    expect(UI.ChartLegendContent).toBeDefined()
  })
})
