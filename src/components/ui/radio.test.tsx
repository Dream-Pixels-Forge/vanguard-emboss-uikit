import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Radio, RadioGroup } from './radio'

describe('Radio', () => {
  it('renders radio', () => {
    render(
      <RadioGroup>
        <Radio value="a" aria-label="Option A" />
      </RadioGroup>
    )
    expect(screen.getByRole('radio')).toBeInTheDocument()
  })

  it('sets aria-invalid when error is true', () => {
    render(
      <RadioGroup>
        <Radio value="a" error aria-label="Radio" />
      </RadioGroup>
    )
    expect(screen.getByRole('radio')).toHaveAttribute('aria-invalid', 'true')
  })

  it('can be selected', async () => {
    const user = userEvent.setup()
    render(
      <RadioGroup>
        <Radio value="a" aria-label="Option A" />
        <Radio value="b" aria-label="Option B" />
      </RadioGroup>
    )
    await user.click(screen.getByLabelText('Option B'))
    expect(screen.getByLabelText('Option B')).toBeChecked()
  })
})
