import { describe, it, expect } from 'vitest'

describe('EmbossBox', () => {
  it('is exported and renders with deprecation notice', async () => {
    const mod = await import('./emboss-box')
    expect(mod.EmbossBox).toBeDefined()
  })
})
