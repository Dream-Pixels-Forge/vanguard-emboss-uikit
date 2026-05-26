import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Field } from './field'

describe('Field', () => {
  it('renders label and children', () => {
    render(<Field label="Name"><input /></Field>)
    expect(screen.getByText('Name')).toBeInTheDocument()
  })

  it('renders description', () => {
    render(<Field label="Name" description="Enter your name"><input /></Field>)
    expect(screen.getByText('Enter your name')).toBeInTheDocument()
  })

  it('renders error instead of description', () => {
    render(<Field label="Name" description="Help text" error="Error text"><input /></Field>)
    expect(screen.getByText('Error text')).toBeInTheDocument()
    expect(screen.queryByText('Help text')).not.toBeInTheDocument()
  })

  it('renders required indicator', () => {
    render(<Field label="Name" required><input data-testid="field-input" /></Field>)
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByTestId('field-input')).toBeInTheDocument()
  })
})
