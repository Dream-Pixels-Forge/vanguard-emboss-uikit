import { render, screen } from '@testing-library/react'
import * as UI from './index'
import { describe, it, expect } from 'vitest'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './resizable'

describe('Resizable', () => {
  it('renders panels', () => {
    render(
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize={50}>Left</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>Right</ResizablePanel>
      </ResizablePanelGroup>
    )
    expect(screen.getByText('Left')).toBeInTheDocument()
    expect(screen.getByText('Right')).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.ResizablePanelGroup).toBeDefined()
    expect(UI.ResizablePanel).toBeDefined()
    expect(UI.ResizableHandle).toBeDefined()
  })
})
