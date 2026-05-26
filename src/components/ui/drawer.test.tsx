import { render, screen } from '@testing-library/react'
import * as UI from './index'
import { describe, it, expect } from 'vitest'
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from './drawer'

describe('Drawer', () => {
  it('renders trigger', () => {
    render(
      <Drawer>
        <DrawerTrigger asChild>
          <button>Open</button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Title</DrawerTitle>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <button>Close</button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
    expect(screen.getByText('Open')).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.Drawer).toBeDefined()
    expect(UI.DrawerTrigger).toBeDefined()
    expect(UI.DrawerContent).toBeDefined()
    expect(UI.DrawerHeader).toBeDefined()
    expect(UI.DrawerFooter).toBeDefined()
    expect(UI.DrawerTitle).toBeDefined()
    expect(UI.DrawerDescription).toBeDefined()
    expect(UI.DrawerClose).toBeDefined()
    expect(UI.DrawerOverlay).toBeDefined()
    expect(UI.DrawerPortal).toBeDefined()
  })
})
