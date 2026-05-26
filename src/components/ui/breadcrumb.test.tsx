import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Breadcrumb } from './breadcrumb'

describe('Breadcrumb', () => {
  it('renders home by default', () => {
    render(<Breadcrumb items={[]} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('renders items', () => {
    render(<Breadcrumb items={[{ label: 'Products' }, { label: 'Shoes' }]} />)
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('Shoes')).toBeInTheDocument()
  })

  it('renders last item with aria-current="page"', () => {
    render(<Breadcrumb items={[{ label: 'Products' }, { label: 'Shoes' }]} />)
    expect(screen.getByText('Shoes')).toHaveAttribute('aria-current', 'page')
  })

  it('renders links for non-last items with href', () => {
    render(<Breadcrumb items={[{ label: 'Products', href: '/products' }, { label: 'Current' }]} />)
    expect(screen.getByText('Products').closest('a')).toHaveAttribute('href', '/products')
  })

  it('hides home when showHome is false', () => {
    render(<Breadcrumb items={[{ label: 'Products' }]} showHome={false} />)
    expect(screen.queryByText('Home')).not.toBeInTheDocument()
  })
})
