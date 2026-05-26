import type { Meta, StoryObj } from '@storybook/react'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from './carousel'
import { Card, CardContent } from './card'

const meta: Meta<typeof Carousel> = {
  title: 'vanguard/Carousel',
  component: Carousel,
}
export default meta

type Story = StoryObj<typeof Carousel>

const slides = Array.from({ length: 5 }, (_, i) => i + 1)

export const Default: Story = {
  render: () => (
    <div className="mx-auto max-w-xs">
      <Carousel>
        <CarouselContent>
          {slides.map((i) => (
            <CarouselItem key={i}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{i}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
}
