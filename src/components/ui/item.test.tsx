import { render, screen } from '@testing-library/react'
import * as UI from './index'
import { describe, it, expect } from 'vitest'

describe('Item', () => {
  it('renders children', () => {
    render(<UI.Item><p>Content</p></UI.Item>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders with title and description', () => {
    render(
      <UI.Item>
        <UI.ItemContent>
          <UI.ItemTitle>Title</UI.ItemTitle>
          <UI.ItemDescription>Description</UI.ItemDescription>
        </UI.ItemContent>
      </UI.Item>
    )
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
  })

  it('renders media slot', () => {
    render(
      <UI.Item>
        <UI.ItemMedia>
          <div data-testid="media">Icon</div>
        </UI.ItemMedia>
        <UI.ItemContent>
          <UI.ItemTitle>Title</UI.ItemTitle>
        </UI.ItemContent>
      </UI.Item>
    )
    expect(screen.getByTestId('media')).toBeInTheDocument()
  })

  it('renders actions slot', () => {
    render(
      <UI.Item>
        <UI.ItemContent>
          <UI.ItemTitle>Title</UI.ItemTitle>
        </UI.ItemContent>
        <UI.ItemActions>
          <button>Edit</button>
        </UI.ItemActions>
      </UI.Item>
    )
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument()
  })

  it('renders with card variant', () => {
    const { container } = render(
      <UI.Item variant="card">
        <UI.ItemContent>
          <UI.ItemTitle>Card Item</UI.ItemTitle>
        </UI.ItemContent>
      </UI.Item>
    )
    expect(container.firstChild).toHaveClass('rounded-lg')
    expect(container.firstChild).toHaveClass('border')
    expect(container.firstChild).toHaveClass('p-3')
  })

  it('exports from index', () => {
    expect(UI.Item).toBeDefined()
    expect(UI.ItemMedia).toBeDefined()
    expect(UI.ItemContent).toBeDefined()
    expect(UI.ItemTitle).toBeDefined()
    expect(UI.ItemDescription).toBeDefined()
    expect(UI.ItemActions).toBeDefined()
  })
})
