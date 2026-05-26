import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Pagination } from './pagination'

describe('Pagination', () => {
  it('renders page buttons', () => {
    render(<Pagination total={5} current={1} onPageChange={() => {}} />)
    expect(screen.getByLabelText('Page 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Page 2')).toBeInTheDocument()
  })

  it('highlights current page', () => {
    render(<Pagination total={5} current={3} onPageChange={() => {}} />)
    expect(screen.getByLabelText('Page 3')).toHaveAttribute('aria-current', 'page')
  })
})
