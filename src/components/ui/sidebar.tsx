import React from 'react'
import { cn } from '../../lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { getEmbossBackground, getEmbossBorder } from '../../lib/tailwind-utils'
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'
import { Separator } from './separator'
import { Sheet, SheetContent, SheetTitle } from './sheet'
import { Panel } from 'react-resizable-panels'
import { PanelLeftOpen, PanelLeftClose } from 'lucide-react'

const SIDEBAR_COOKIE_NAME = 'sidebar:state'
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = '16rem'
const SIDEBAR_WIDTH_MOBILE = '18rem'
const SIDEBAR_WIDTH_ICON = '3rem'
const SIDEBAR_KEYBOARD_SHORTCUT = 'b'

type SidebarContextValue = {
  state: 'expanded' | 'collapsed'
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) throw new Error('useSidebar must be used within a SidebarProvider')
  return context
}

export interface SidebarProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange,
  className,
  children,
  ...props
}: SidebarProviderProps) {
  const [openMobile, setOpenMobile] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)')
    setIsMobile(mql.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpenRef = React.useRef(onOpenChange)
  setOpenRef.current = onOpenChange

  const setOpen = React.useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      const openState = typeof value === 'function' ? value(open) : value
      _setOpen(openState)
      setOpenRef.current?.(openState)
    },
    [open]
  )

  // Write cookie in a useEffect to avoid Strict Mode double-invocation
  React.useEffect(() => {
    try {
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${open}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    } catch { /* cookie write may fail silently */ }
  }, [open])

  const toggleSidebar = React.useCallback(() => {
    setOpen((prev: boolean) => !prev)
  }, [setOpen])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === SIDEBAR_KEYBOARD_SHORTCUT && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toggleSidebar()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [toggleSidebar])

  const state = open ? 'expanded' : 'collapsed'

  return (
    <SidebarContext.Provider value={{ state, open, setOpen, openMobile, setOpenMobile, isMobile, toggleSidebar }}>
      <div
        className={cn('flex min-h-screen w-full', className)}
        data-sidebar-state={state}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: 'left' | 'right'
  collapsible?: 'offcanvas' | 'icon' | 'none'
}

export function Sidebar({
  side = 'left',
  collapsible = 'icon',
  className,
  children,
  ...props
}: SidebarProps) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent side={side} className={cn('w-[--sidebar-width] p-0', getEmbossBackground())} style={{ '--sidebar-width': SIDEBAR_WIDTH_MOBILE } as React.CSSProperties}>
          <SheetTitle className="sr-only">Sidebar</SheetTitle>
          <div className="flex h-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  if (collapsible === 'none') {
    return (
      <div
        className={cn('flex h-full min-h-screen flex-col', getEmbossBackground(), getEmbossBorder(), 'border-r', className)}
        {...props}
      >
        {children}
      </div>
    )
  }

  return (
    <Panel
      defaultSize={20}
      minSize={collapsible === 'icon' ? 4 : 15}
      maxSize={30}
      className={cn(
        'relative flex flex-col',
        getEmbossBackground(),
        getEmbossBorder(),
        'border-r',
        state === 'collapsed' && 'min-w-[--sidebar-width-icon]',
        className
      )}
      style={{ '--sidebar-width': SIDEBAR_WIDTH, '--sidebar-width-icon': SIDEBAR_WIDTH_ICON } as React.CSSProperties}
      {...props}
    >
      {children}
    </Panel>
  )
}

export interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarHeader({ className, ...props }: SidebarHeaderProps) {
  return <div className={cn('flex flex-col gap-2 p-4', className)} {...props} />
}

export interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarContent({ className, ...props }: SidebarContentProps) {
  return <div className={cn('flex-1 overflow-y-auto px-4 py-2', className)} {...props} />
}

export interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarFooter({ className, ...props }: SidebarFooterProps) {
  return <div className={cn('flex flex-col gap-2 p-4', className)} {...props} />
}

export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarGroup({ className, ...props }: SidebarGroupProps) {
  return <div className={cn('flex flex-col gap-1', className)} {...props} />
}

export interface SidebarGroupLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarGroupLabel({ className, ...props }: SidebarGroupLabelProps) {
  return (
    <div
      className={cn(
        'px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider',
        className
      )}
      {...props}
    />
  )
}

export interface SidebarGroupContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarGroupContent({ className, ...props }: SidebarGroupContentProps) {
  return <div className={cn('flex flex-col gap-0.5', className)} {...props} />
}

export interface SidebarMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarMenu({ className, ...props }: SidebarMenuProps) {
  return <div className={cn('flex flex-col gap-0.5', className)} {...props} />
}

export interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarMenuItem({ className, ...props }: SidebarMenuItemProps) {
  return <div className={cn('group/menu-item relative', className)} {...props} />
}

export interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  tooltip?: string
  isActive?: boolean
}

export function SidebarMenuButton({
  asChild = false,
  isActive = false,
  tooltip,
  className,
  children,
  ...props
}: SidebarMenuButtonProps) {
  const { state } = useSidebar()
  const Comp = asChild ? Slot : 'button'

  const button = (
    <Comp
      className={cn(
        getEmbossBackground(),
        isActive ? 'shadow-emboss-in-light-sm dark:shadow-emboss-in-dark-sm' : 'shadow-emboss-out-light-sm dark:shadow-emboss-out-dark-sm',
        'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium',
        'transition-all hover:scale-[1.02] active:scale-[0.98]',
        'disabled:pointer-events-none disabled:opacity-50',
        !isActive && 'hover:shadow-emboss-in-light-sm hover:dark:shadow-emboss-in-dark-sm',
        className
      )}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </Comp>
  )

  if (tooltip && state === 'collapsed') {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="right" align="center">
          {tooltip}
        </TooltipContent>
      </Tooltip>
    )
  }

  return button
}

export interface SidebarSeparatorProps extends React.HTMLAttributes<HTMLHRElement> {}

export function SidebarSeparator({ className, ...props }: SidebarSeparatorProps) {
  return <Separator className={cn('my-2', className)} {...props} />
}

export interface SidebarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function SidebarTrigger({ className, ...props }: SidebarTriggerProps) {
  const { toggleSidebar, open } = useSidebar()
  return (
    <button
      onClick={toggleSidebar}
      className={cn(
        getEmbossBackground(),
        'shadow-emboss-out-light-sm dark:shadow-emboss-out-dark-sm',
        'flex h-8 w-8 items-center justify-center rounded-lg',
        'transition-all hover:scale-110 active:scale-95',
        className
      )}
      {...props}
    >
      {open ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}
      <span className="sr-only">Toggle Sidebar</span>
    </button>
  )
}

export interface SidebarInsetProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarInset({ className, ...props }: SidebarInsetProps) {
  return (
    <Panel className={cn('flex flex-col overflow-hidden', className)} {...props} />
  )
}

export interface SidebarRailProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarRail({ className, ...props }: SidebarRailProps) {
  const { toggleSidebar } = useSidebar()
  return (
    <div
      onClick={toggleSidebar}
      className={cn(
        'absolute inset-y-0 right-0 z-20 hidden w-1 cursor-ew-resize',
        className
      )}
      {...props}
    />
  )
}
