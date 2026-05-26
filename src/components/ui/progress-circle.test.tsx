import { render, screen } from '@testing-library/react'
import * as UI from './index'
import { describe, it, expect } from 'vitest'
import { ProgressCircle } from './progress-circle'

describe('ProgressCircle', () => {
  it('renders with value', () => {
    render(<ProgressCircle value={75} label="Test" />)
    expect(screen.getByText('75')).toBeInTheDocument()
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('renders with default value', () => {
    render(<ProgressCircle defaultValue={50} />)
    expect(screen.getByText('50')).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.ProgressCircle).toBeDefined()
  })
})
