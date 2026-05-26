import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as UI from './index'
import { describe, it, expect } from 'vitest'

describe('Accordion', () => {
  it('renders items and toggles content on click', async () => {
    const user = userEvent.setup()
    render(
      <UI.Accordion type="single" collapsible>
        <UI.AccordionItem value="item-1">
          <UI.AccordionTrigger>Section 1</UI.AccordionTrigger>
          <UI.AccordionContent>Content 1</UI.AccordionContent>
        </UI.AccordionItem>
        <UI.AccordionItem value="item-2">
          <UI.AccordionTrigger>Section 2</UI.AccordionTrigger>
          <UI.AccordionContent>Content 2</UI.AccordionContent>
        </UI.AccordionItem>
      </UI.Accordion>
    )

    expect(screen.getByText('Section 1')).toBeInTheDocument()
    expect(screen.getByText('Section 2')).toBeInTheDocument()
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument()

    await user.click(screen.getByText('Section 1'))
    expect(screen.getByText('Content 1')).toBeInTheDocument()
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument()
  })

  it('trigger contains chevron icon', () => {
    render(
      <UI.Accordion type="single">
        <UI.AccordionItem value="item-1">
          <UI.AccordionTrigger>Section 1</UI.AccordionTrigger>
          <UI.AccordionContent>Content</UI.AccordionContent>
        </UI.AccordionItem>
      </UI.Accordion>
    )

    const trigger = screen.getByText('Section 1').closest('button')
    expect(trigger?.querySelector('svg')).toBeInTheDocument()
  })

  it('trigger shows expanded state', () => {
    render(
      <UI.Accordion type="single" defaultValue="item-1">
        <UI.AccordionItem value="item-1">
          <UI.AccordionTrigger>Section 1</UI.AccordionTrigger>
          <UI.AccordionContent>Content</UI.AccordionContent>
        </UI.AccordionItem>
      </UI.Accordion>
    )

    const trigger = screen.getByText('Section 1').closest('button')
    expect(trigger).toHaveAttribute('data-state', 'open')
  })

  it('items have border class', () => {
    const { container } = render(
      <UI.Accordion type="single">
        <UI.AccordionItem value="item-1">
          <UI.AccordionTrigger>Section 1</UI.AccordionTrigger>
          <UI.AccordionContent>Content</UI.AccordionContent>
        </UI.AccordionItem>
      </UI.Accordion>
    )

    const itemElement = container.querySelector('.border-b')
    expect(itemElement).toBeInTheDocument()
  })

  it('content appears when expanded', async () => {
    const user = userEvent.setup()
    render(
      <UI.Accordion type="single" collapsible>
        <UI.AccordionItem value="item-1">
          <UI.AccordionTrigger>Section 1</UI.AccordionTrigger>
          <UI.AccordionContent>Content 1</UI.AccordionContent>
        </UI.AccordionItem>
      </UI.Accordion>
    )

    expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
    await user.click(screen.getByText('Section 1'))
    expect(screen.getByText('Content 1')).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.Accordion).toBeDefined()
    expect(UI.AccordionItem).toBeDefined()
    expect(UI.AccordionTrigger).toBeDefined()
    expect(UI.AccordionContent).toBeDefined()
  })
})
