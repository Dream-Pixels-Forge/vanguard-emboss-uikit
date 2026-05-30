import { render, cleanup } from '@testing-library/react'
import * as UI from './index'
import { describe, it, expect, afterEach } from 'vitest'
import { InputOTP, InputOTPGroup, InputOTPSlot } from './input-otp'

describe('InputOTP', () => {
  afterEach(() => cleanup())

  it('renders without error', () => {
    expect(() =>
      render(
        <InputOTP maxLength={4}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      )
    ).not.toThrow()
  })

  it('is exported from index', () => {
    expect(UI.InputOTP).toBeDefined()
    expect(UI.InputOTPGroup).toBeDefined()
    expect(UI.InputOTPSlot).toBeDefined()
    expect(UI.InputOTPSeparator).toBeDefined()
  })
})
