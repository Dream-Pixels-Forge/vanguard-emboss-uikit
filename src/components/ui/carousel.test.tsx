import { render, screen } from '@testing-library/react'
import * as UI from './index'
import { describe, it, expect } from 'vitest'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './carousel'

describe('Carousel', () => {
  it('renders items', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Item 1</CarouselItem>
          <CarouselItem>Item 2</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.Carousel).toBeDefined()
    expect(UI.CarouselContent).toBeDefined()
    expect(UI.CarouselItem).toBeDefined()
    expect(UI.CarouselPrevious).toBeDefined()
    expect(UI.CarouselNext).toBeDefined()
  })
})
