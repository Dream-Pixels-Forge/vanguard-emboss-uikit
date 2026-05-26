import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { cn } from '../../lib/utils'
import { getEmbossBackground, getEmbossShadow } from '../../lib/tailwind-utils'
import { ArrowLeft, ArrowRight } from 'lucide-react'

type CarouselContextValue = {
  emblaRef: ReturnType<typeof useEmblaCarousel>[0]
  emblaApi: ReturnType<typeof useEmblaCarousel>[1]
  canScrollPrev: boolean
  canScrollNext: boolean
  scrollPrev: () => void
  scrollNext: () => void
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) throw new Error('useCarousel must be used within a <Carousel />')
  return context
}

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  opts?: Parameters<typeof useEmblaCarousel>[0]
  plugins?: Parameters<typeof useEmblaCarousel>[1]
}

export function Carousel({ opts, plugins, className, children, ...props }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(opts, plugins)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const onSelect = React.useCallback((api: NonNullable<typeof emblaApi>) => {
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  React.useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    onSelect(emblaApi)
    return () => { emblaApi.off('select', onSelect); emblaApi.off('reInit', onSelect) }
  }, [emblaApi, onSelect])

  const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <CarouselContext.Provider value={{ emblaRef, emblaApi, canScrollPrev, canScrollNext, scrollPrev, scrollNext }}>
      <div className={cn('relative', className)} role="region" aria-roledescription="carousel" {...props}>
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

export type CarouselContentProps = React.HTMLAttributes<HTMLDivElement>

export const CarouselContent = React.forwardRef<HTMLDivElement, CarouselContentProps>(
  function CarouselContent({ className, ...props }, ref) {
    const { emblaRef } = useCarousel()
    return (
      <div ref={emblaRef} className="overflow-hidden">
        <div ref={ref} className={cn('flex -ml-4', className)} {...props} />
      </div>
    )
  }
)

export type CarouselItemProps = React.HTMLAttributes<HTMLDivElement>

export function CarouselItem({ className, ...props }: CarouselItemProps) {
  return (
    <div
      className={cn('min-w-0 shrink-0 grow-0 basis-full pl-4', className)}
      role="group"
      aria-roledescription="slide"
      {...props}
    />
  )
}

export type CarouselPreviousProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export function CarouselPrevious({ className, ...props }: CarouselPreviousProps) {
  const { canScrollPrev, scrollPrev } = useCarousel()
  return (
    <button
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      className={cn(
        getEmbossBackground(),
        getEmbossShadow('out', 'small'),
        'absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2',
        'flex h-8 w-8 items-center justify-center rounded-full',
        'transition-all hover:scale-110 active:scale-95',
        'disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </button>
  )
}

export type CarouselNextProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export function CarouselNext({ className, ...props }: CarouselNextProps) {
  const { canScrollNext, scrollNext } = useCarousel()
  return (
    <button
      disabled={!canScrollNext}
      onClick={scrollNext}
      className={cn(
        getEmbossBackground(),
        getEmbossShadow('out', 'small'),
        'absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2',
        'flex h-8 w-8 items-center justify-center rounded-full',
        'transition-all hover:scale-110 active:scale-95',
        'disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </button>
  )
}
