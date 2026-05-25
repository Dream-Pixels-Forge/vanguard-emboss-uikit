import React from 'react'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[]
  separator?: React.ReactNode
  showHome?: boolean
  homeHref?: string
  className?: string
}

export function Breadcrumb({
  items,
  separator = <ChevronRight className="h-4 w-4" />,
  showHome = true,
  homeHref = '/',
  className,
  ...props
}: BreadcrumbProps) {
  const allItems = showHome 
    ? [{ label: 'Home', href: homeHref, icon: <Home className="h-4 w-4" /> }, ...items]
    : items

  return (
    <nav
      className={cn('flex items-center space-x-1', className)}
      aria-label="Breadcrumb"
      {...props}
    >
      {allItems.map((item, index) => {
        const isLast = index === allItems.length - 1
        
        return (
          <div key={index} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-muted-foreground" aria-hidden="true">
                {separator}
              </span>
            )}
            
            {item.href && !isLast ? (
              <a
                href={item.href}
                className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {item.icon && <span className="mr-1.5">{item.icon}</span>}
                {item.label}
              </a>
            ) : (
              <span
                className="inline-flex items-center text-sm font-semibold text-foreground"
                aria-current={isLast ? 'page' : undefined}
              >
                {item.icon && <span className="mr-1.5">{item.icon}</span>}
                {item.label}
              </span>
            )}
          </div>
        )
      })}
    </nav>
  )
}
