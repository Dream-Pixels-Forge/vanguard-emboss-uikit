import { render, screen } from '@testing-library/react'
import * as UI from './index'
import { describe, it, expect } from 'vitest'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from './navigation-menu'

describe('NavigationMenu', () => {
  it('renders trigger text', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="/products/1">Product 1</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )
    expect(screen.getByText('Products')).toBeInTheDocument()
  })

  it('exports from index', () => {
    expect(UI.NavigationMenu).toBeDefined()
    expect(UI.NavigationMenuList).toBeDefined()
    expect(UI.NavigationMenuItem).toBeDefined()
    expect(UI.NavigationMenuLink).toBeDefined()
    expect(UI.NavigationMenuTrigger).toBeDefined()
    expect(UI.NavigationMenuContent).toBeDefined()
    expect(UI.NavigationMenuViewport).toBeDefined()
  })
})
