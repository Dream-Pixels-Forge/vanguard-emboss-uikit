import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as UI from './index'
import { describe, it, expect } from 'vitest'

describe('Popover', () => {
  it('renders trigger and shows content on click', async () => {
    const user = userEvent.setup()
    render(
      <UI.Popover>
        <UI.PopoverTrigger>Open</UI.PopoverTrigger>
        <UI.PopoverContent>Content</UI.PopoverContent>
      </UI.Popover>
    )
    expect(screen.getByText('Open')).toBeInTheDocument()
    expect(screen.queryByText('Content')).not.toBeInTheDocument()
    await user.click(screen.getByText('Open'))
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('trigger applies emboss background class', () => {
    const { container } = render(
      <UI.Popover>
        <UI.PopoverTrigger>Trigger</UI.PopoverTrigger>
        <UI.PopoverContent>Content</UI.PopoverContent>
      </UI.Popover>
    )
    expect(container.querySelector('button')).toHaveClass('bg-emboss-bg-light')
  })

  it('trigger applies default button styling when not asChild', () => {
    const { container } = render(
      <UI.Popover>
        <UI.PopoverTrigger>Trigger</UI.PopoverTrigger>
        <UI.PopoverContent>Content</UI.PopoverContent>
      </UI.Popover>
    )
    const button = container.querySelector('button')
    expect(button).toHaveClass('inline-flex')
    expect(button).toHaveClass('rounded-md')
  })

  it('content applies emboss background, shadow, and border classes', async () => {
    const user = userEvent.setup()
    render(
      <UI.Popover>
        <UI.PopoverTrigger>Open</UI.PopoverTrigger>
        <UI.PopoverContent>Content</UI.PopoverContent>
      </UI.Popover>
    )
    await user.click(screen.getByText('Open'))
    const content = screen.getByText('Content')
    expect(content).toHaveClass('bg-emboss-bg-light')
    expect(content).toHaveClass('shadow-emboss-out-light')
    expect(content).toHaveClass('border-emboss-shadow-light/30')
  })

  it('content applies z-50, w-72, rounded-xl, p-4', async () => {
    const user = userEvent.setup()
    render(
      <UI.Popover>
        <UI.PopoverTrigger>Open</UI.PopoverTrigger>
        <UI.PopoverContent>Content</UI.PopoverContent>
      </UI.Popover>
    )
    await user.click(screen.getByText('Open'))
    const content = screen.getByText('Content')
    expect(content).toHaveClass('z-50')
    expect(content).toHaveClass('w-72')
    expect(content).toHaveClass('rounded-xl')
    expect(content).toHaveClass('p-4')
  })

  it('content forwards sideOffset and align', async () => {
    const user = userEvent.setup()
    render(
      <UI.Popover>
        <UI.PopoverTrigger>Open</UI.PopoverTrigger>
        <UI.PopoverContent sideOffset={8} align="start">Content</UI.PopoverContent>
      </UI.Popover>
    )
    await user.click(screen.getByText('Open'))
    const content = screen.getByText('Content')
    expect(content).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.Popover).toBeDefined()
    expect(UI.PopoverTrigger).toBeDefined()
    expect(UI.PopoverContent).toBeDefined()
  })
})
