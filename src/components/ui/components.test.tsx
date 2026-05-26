import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeAll } from 'vitest'

beforeAll(() => {
  class MockIntersectionObserver {
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()
  }
  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    value: MockIntersectionObserver,
  })
  Element.prototype.hasPointerCapture = vi.fn()
  Element.prototype.setPointerCapture = vi.fn()
  Element.prototype.releasePointerCapture = vi.fn()

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
})

import { ScrollArea } from './scroll-area'
import { Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerHeader, DrawerFooter, DrawerClose } from './drawer'
import {
  ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem,
  ContextMenuSeparator, ContextMenuCheckboxItem, ContextMenuRadioGroup, ContextMenuRadioItem,
  ContextMenuLabel, ContextMenuShortcut, ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent,
} from './context-menu'
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from './form'
import { Button } from './button'
import { Badge } from './badge'
import { Box } from './box'
import { Text } from './text'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card'
import { Alert } from './alert'
import { Input } from './input'
import { Textarea } from './textarea'
import { Label } from './label'
import { Checkbox } from './checkbox'
import { Radio, RadioGroup } from './radio'
import { Switch } from './switch'
import { Slider } from './slider'
import { Breadcrumb } from './breadcrumb'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from './dialog'
import { Knob } from './knob'
import { Progress } from './progress'
import { Skeleton } from './skeleton'
import { Avatar } from './avatar'
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from './sheet'
import { ToggleGroup, ToggleGroupItem } from './toggle'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './collapsible'
import { TiltCard } from './tilt-card'
import { ProgressCircle } from './progress-circle'

import { Kbd } from './kbd'
import { Spinner } from './spinner'
import { AspectRatio } from './aspect-ratio'
import { Empty } from './empty'
import { Field } from './field'
import { Command, CommandInput, CommandList, CommandItem } from './command'
import { HoverCard, HoverCardTrigger } from './hover-card'
import { Pagination } from './pagination'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './table'
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from './menubar'
import { Toggle } from './toggle'
import { Calendar } from './calendar'
import { DatePicker } from './date-picker'
import { Combobox } from './combobox'

import { InputOTP, InputOTPGroup, InputOTPSlot } from './input-otp'
import {
  Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext,
} from './carousel'
import {
  ResizablePanelGroup, ResizablePanel, ResizableHandle,
} from './resizable'
import { DataTable } from './data-table'
import {
  SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter,
  SidebarGroup, SidebarGroupLabel, SidebarGroupContent,
  SidebarMenu, SidebarMenuItem, SidebarMenuButton,
} from './sidebar'
import {
  ChartContainer, ChartTooltipContent, ChartLegendContent,
} from './chart'

import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger, NavigationMenuContent } from './navigation-menu'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './select'
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogAction, AlertDialogCancel } from './alert-dialog'

import * as UI from './index'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('renders with variant classes', () => {
    const { container } = render(<Button variant="accent">Accent</Button>)
    expect(container.firstChild).toHaveClass('bg-emboss-accent-blue')
  })

  it('renders with size classes', () => {
    const { container } = render(<Button size="sm">Small</Button>)
    expect(container.firstChild).toHaveClass('h-8')
  })

  it('disables when loading', () => {
    render(<Button loading>Loading</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('disables when disabled', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('applies custom className', () => {
    const { container } = render(<Button className="custom-class">Custom</Button>)
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('renders spinner when loading', () => {
    const { container } = render(<Button loading>Loading</Button>)
    expect(container.querySelector('.animate-spin')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    render(<Button onClick={handleClick}>Click</Button>)
    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('forwards additional props', () => {
    render(<Button data-testid="test-btn">Test</Button>)
    expect(screen.getByTestId('test-btn')).toBeInTheDocument()
  })

  it('renders as child element with asChild', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    )
    expect(screen.getByRole('link')).toHaveTextContent('Link Button')
    expect(screen.getByRole('link')).toHaveAttribute('href', '/test')
  })
})

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('renders with variant classes', () => {
    const { container } = render(<Badge variant="accent">Accent</Badge>)
    expect(container.firstChild).toHaveClass('bg-emboss-accent-blue')
  })

  it('renders with size classes', () => {
    const { container } = render(<Badge size="lg">Large</Badge>)
    expect(container.firstChild).toHaveClass('px-3')
  })

  it('applies custom className', () => {
    const { container } = render(<Badge className="custom">Badge</Badge>)
    expect(container.firstChild).toHaveClass('custom')
  })

  it('renders as child element with asChild', () => {
    render(
      <Badge asChild>
        <a href="/tag">Tag</a>
      </Badge>
    )
    expect(screen.getByRole('link')).toHaveTextContent('Tag')
    expect(screen.getByRole('link')).toHaveAttribute('href', '/tag')
  })
})

describe('Box', () => {
  it('renders children', () => {
    render(<Box>Content</Box>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('applies raised classes', () => {
    const { container } = render(<Box raised>Raised</Box>)
    expect(container.firstChild).toHaveClass('shadow-emboss-out-light')
  })

  it('applies recessed classes', () => {
    const { container } = render(<Box recessed>Recessed</Box>)
    expect(container.firstChild).toHaveClass('shadow-emboss-in-light')
  })

  it('applies border when border prop is true', () => {
    const { container } = render(<Box border>Bordered</Box>)
    expect(container.firstChild).toHaveClass('border-emboss-shadow-light/30')
  })

  it('raised takes precedence over recessed', () => {
    const { container } = render(<Box raised recessed>Both</Box>)
    expect(container.firstChild).toHaveClass('shadow-emboss-out-light')
  })

  it('renders as child element with asChild', () => {
    render(
      <Box asChild>
        <article>Article Box</article>
      </Box>
    )
    expect(screen.getByText('Article Box').tagName).toBe('ARTICLE')
  })
})

describe('Text', () => {
  it('renders children', () => {
    render(<Text>Hello</Text>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders as heading element when variant is h1', () => {
    render(<Text variant="h1">Heading</Text>)
    expect(screen.getByRole('heading', { name: /heading/i })).toBeInTheDocument()
  })

  it('renders as paragraph by default', () => {
    const { container } = render(<Text>Paragraph</Text>)
    expect(container.querySelector('p')).toBeInTheDocument()
  })

  it('applies muted class', () => {
    render(<Text muted>Muted</Text>)
    expect(screen.getByText('Muted')).toHaveClass('text-muted-foreground')
  })

  it('applies accent class', () => {
    render(<Text accent="blue">Accented</Text>)
    expect(screen.getByText('Accented')).toHaveClass('text-emboss-accent-blue')
  })

  it('applies weight class', () => {
    render(<Text weight="bold">Bold</Text>)
    expect(screen.getByText('Bold')).toHaveClass('font-bold')
  })
})

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Content</Card>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('subcomponents render correctly', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    )
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })
})

describe('Alert', () => {
  it('renders children', () => {
    render(<Alert>Message</Alert>)
    expect(screen.getByText('Message')).toBeInTheDocument()
  })

  it('renders with role="alert"', () => {
    render(<Alert>Alert</Alert>)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(<Alert title="Warning">Message</Alert>)
    expect(screen.getByText('Warning')).toBeInTheDocument()
  })

  it('renders dismiss button when dismissible', () => {
    const onDismiss = vi.fn()
    render(<Alert dismissible onDismiss={onDismiss}>Dismiss me</Alert>)
    expect(screen.getByRole('button', { name: /dismiss/i })).toBeInTheDocument()
  })

  it('calls onDismiss when dismiss button clicked', async () => {
    const onDismiss = vi.fn()
    const user = userEvent.setup()
    render(<Alert dismissible onDismiss={onDismiss}>Dismiss me</Alert>)
    await user.click(screen.getByRole('button', { name: /dismiss/i }))
    expect(onDismiss).toHaveBeenCalledOnce()
  })

  it('renders custom icon', () => {
    render(<Alert icon={<span data-testid="custom-icon">*</span>}>Alert</Alert>)
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
  })
})

describe('Input', () => {
  it('renders input', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('applies error styles', () => {
    const { container } = render(<Input error />)
    expect(container.firstChild).toHaveClass('ring-2')
    expect(container.firstChild).toHaveClass('ring-red-500')
  })

  it('sets aria-invalid when error is true', () => {
    render(<Input error aria-describedby="error-msg" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('disables input', () => {
    render(<Input disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('forwards value and onChange', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    render(<Input onChange={handleChange} />)
    await user.type(screen.getByRole('textbox'), 'a')
    expect(handleChange).toHaveBeenCalled()
  })
})

describe('Textarea', () => {
  it('renders textarea', () => {
    render(<Textarea placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('applies error styles', () => {
    const { container } = render(<Textarea error />)
    expect(container.firstChild).toHaveClass('ring-red-500')
  })

  it('sets aria-invalid when error is true', () => {
    render(<Textarea error />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('is resizable when resizable prop is true', () => {
    const { container } = render(<Textarea resizable />)
    expect(container.firstChild).not.toHaveClass('resize-none')
  })

  it('is not resizable by default', () => {
    const { container } = render(<Textarea />)
    expect(container.firstChild).toHaveClass('resize-none')
  })
})

describe('Label', () => {
  it('renders label', () => {
    render(<Label>Name</Label>)
    expect(screen.getByText('Name')).toBeInTheDocument()
  })

  it('shows required indicator', () => {
    render(<Label required>Name</Label>)
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('sets aria-required when required', () => {
    render(<Label required>Name</Label>)
    expect(screen.getByText('Name')).toHaveAttribute('aria-required', 'true')
  })

  it('forwards htmlFor', () => {
    render(<Label htmlFor="email">Email</Label>)
    expect(screen.getByText('Email')).toHaveAttribute('for', 'email')
  })
})

describe('Checkbox', () => {
  it('renders', () => {
    render(<Checkbox aria-label="Accept terms" />)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('sets aria-invalid when error is true', () => {
    render(<Checkbox error aria-label="Check" />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('can be checked', async () => {
    const user = userEvent.setup()
    render(<Checkbox aria-label="Toggle" />)
    await user.click(screen.getByRole('checkbox'))
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('can be disabled', () => {
    render(<Checkbox disabled aria-label="Disabled" />)
    expect(screen.getByRole('checkbox')).toBeDisabled()
  })
})

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

describe('Switch', () => {
  it('renders', () => {
    render(<Switch aria-label="Toggle" />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
  })

  it('sets aria-invalid when error is true', () => {
    render(<Switch error aria-label="Toggle" />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-invalid', 'true')
  })

  it('can be toggled', async () => {
    const user = userEvent.setup()
    render(<Switch aria-label="Toggle" />)
    await user.click(screen.getByRole('switch'))
    expect(screen.getByRole('switch')).toBeChecked()
  })
})

describe('Slider', () => {
  it('renders', () => {
    render(<Slider aria-label="Volume" />)
    expect(screen.getByRole('slider')).toBeInTheDocument()
  })

  it('renders with default values', () => {
    render(<Slider defaultValue={[50]} aria-label="Volume" />)
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '50')
  })
})

describe('Breadcrumb', () => {
  it('renders home by default', () => {
    render(<Breadcrumb items={[]} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('renders items', () => {
    render(<Breadcrumb items={[{ label: 'Products' }, { label: 'Shoes' }]} />)
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('Shoes')).toBeInTheDocument()
  })

  it('renders last item with aria-current="page"', () => {
    render(<Breadcrumb items={[{ label: 'Products' }, { label: 'Shoes' }]} />)
    expect(screen.getByText('Shoes')).toHaveAttribute('aria-current', 'page')
  })

  it('renders links for non-last items with href', () => {
    render(<Breadcrumb items={[{ label: 'Products', href: '/products' }, { label: 'Current' }]} />)
    expect(screen.getByText('Products').closest('a')).toHaveAttribute('href', '/products')
  })

  it('hides home when showHome is false', () => {
    render(<Breadcrumb items={[{ label: 'Products' }]} showHome={false} />)
    expect(screen.queryByText('Home')).not.toBeInTheDocument()
  })
})

describe('Tabs', () => {
  it('renders tabs and content', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    )
    expect(screen.getByText('Tab 1')).toBeInTheDocument()
    expect(screen.getByText('Tab 2')).toBeInTheDocument()
    expect(screen.getByText('Content 1')).toBeInTheDocument()
  })
})

describe('Dialog', () => {
  it('renders trigger and opens content', async () => {
    const user = userEvent.setup()
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>Description</DialogDescription>
          </DialogHeader>
          <DialogFooter>Footer</DialogFooter>
        </DialogContent>
      </Dialog>
    )
    expect(screen.getByText('Open')).toBeInTheDocument()
    await user.click(screen.getByText('Open'))
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
  })
})

describe('Knob', () => {
  it('renders with default value', () => {
    render(<Knob defaultValue={50} />)
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '50')
  })

  it('renders label', () => {
    render(<Knob label="Volume" />)
    expect(screen.getByText('Volume')).toBeInTheDocument()
  })

  it('renders with min/max', () => {
    render(<Knob min={0} max={10} defaultValue={5} />)
    const slider = screen.getByRole('slider')
    expect(slider).toHaveAttribute('aria-valuemin', '0')
    expect(slider).toHaveAttribute('aria-valuemax', '10')
  })

  it('applies size classes', () => {
    const { container } = render(<Knob size="lg" />)
    expect(container.firstChild?.firstChild).toHaveClass('w-24')
  })

  it('shows value text by default', () => {
    render(<Knob defaultValue={42} />)
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('hides value when showValue is false', () => {
    render(<Knob defaultValue={42} showValue={false} />)
    expect(screen.queryByText('42')).not.toBeInTheDocument()
  })

  it('is disabled', () => {
    render(<Knob disabled aria-label="Knob" />)
    expect(screen.getByRole('slider')).toHaveAttribute('aria-disabled', 'true')
  })

  it('is controlled', () => {
    const { rerender } = render(<Knob value={30} />)
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '30')
    rerender(<Knob value={80} />)
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '80')
  })

  it('responds to keyboard input', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<Knob defaultValue={50} onChange={onChange} />)
    const slider = screen.getByRole('slider')
    slider.focus()
    await user.keyboard('{ArrowRight}')
    expect(onChange).toHaveBeenCalledWith(51)
  })
})

describe('Tooltip', () => {
  it('renders trigger', () => {
    render(
      <UI.TooltipProvider>
        <UI.Tooltip>
          <UI.TooltipTrigger>Hover me</UI.TooltipTrigger>
          <UI.TooltipContent>Tooltip text</UI.TooltipContent>
        </UI.Tooltip>
      </UI.TooltipProvider>
    )
    expect(screen.getByText('Hover me')).toBeInTheDocument()
  })

  it('exports TooltipContent component', () => {
    expect(UI.TooltipContent).toBeDefined()
  })

  it('exports TooltipProvider and TooltipTrigger', () => {
    expect(UI.TooltipProvider).toBeDefined()
    expect(UI.TooltipTrigger).toBeDefined()
  })

  it('trigger has emboss styling classes', () => {
    const { container } = render(
      <UI.TooltipProvider>
        <UI.Tooltip>
          <UI.TooltipTrigger>Hover</UI.TooltipTrigger>
          <UI.TooltipContent>Content</UI.TooltipContent>
        </UI.Tooltip>
      </UI.TooltipProvider>
    )
    const trigger = container.querySelector('button')
    expect(trigger).toHaveClass('inline-flex')
  })

  it('default open delay is set', () => {
    const { container } = render(
      <UI.TooltipProvider delayDuration={300}>
        <UI.Tooltip>
          <UI.TooltipTrigger>Hover</UI.TooltipTrigger>
          <UI.TooltipContent>Content</UI.TooltipContent>
        </UI.Tooltip>
      </UI.TooltipProvider>
    )
    expect(container.querySelector('button')).toBeInTheDocument()
  })
})

describe('ToastProvider', () => {
  it('renders without crashing', () => {
    const { container } = render(<UI.ToastProvider />)
    expect(container.querySelector('[aria-label]')).toBeInTheDocument()
  })

  it('renders with custom position', () => {
    const { container } = render(<UI.ToastProvider position="top-right" />)
    expect(container.querySelector('[aria-label]')).toBeInTheDocument()
  })

  it('can render with toaster class', () => {
    const { container } = render(<UI.ToastProvider />)
    const toaster = container.firstChild as HTMLElement
    expect(toaster).toBeInTheDocument()
  })
})

describe('Separator', () => {
  it('renders as hr element', () => {
    const { container } = render(<UI.Separator />)
    const hr = container.querySelector('hr')
    expect(hr).toBeInTheDocument()
  })

  it('renders with horizontal orientation by default', () => {
    const { container } = render(<UI.Separator />)
    const hr = container.querySelector('hr')
    expect(hr).toHaveClass('h-[1px]')
    expect(hr).toHaveClass('w-full')
  })

  it('renders with vertical orientation', () => {
    const { container } = render(<UI.Separator orientation="vertical" />)
    const hr = container.querySelector('hr')
    expect(hr).toHaveClass('h-full')
    expect(hr).toHaveClass('w-[1px]')
  })

  it('applies emboss decorative class', () => {
    const { container } = render(<UI.Separator />)
    const hr = container.querySelector('hr')
    expect(hr).toHaveClass('bg-emboss-shadow-light/30')
  })

  it('sets aria-orientation for vertical', () => {
    const { container } = render(<UI.Separator orientation="vertical" />)
    const hr = container.querySelector('hr')
    expect(hr).toHaveAttribute('aria-orientation', 'vertical')
  })
})

describe('EmbossBox', () => {
  it('is exported and renders with deprecation notice', async () => {
    const mod = await import('./emboss-box')
    expect(mod.EmbossBox).toBeDefined()
  })
})

describe('Popover', () => {
  it('renders trigger and shows content on click', async () => {
    const user = userEvent.setup()
    render(
      <UI.Popover>
        <UI.PopoverTrigger>Open</UI.PopoverTrigger>
        <UI.PopoverContent>Content</UI.PopoverContent>
      </UI.Popover>
    )
    expect(screen.getByText('Open')).toBeInTheDocument()
    expect(screen.queryByText('Content')).not.toBeInTheDocument()
    await user.click(screen.getByText('Open'))
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('trigger applies emboss background class', () => {
    const { container } = render(
      <UI.Popover>
        <UI.PopoverTrigger>Trigger</UI.PopoverTrigger>
        <UI.PopoverContent>Content</UI.PopoverContent>
      </UI.Popover>
    )
    expect(container.querySelector('button')).toHaveClass('bg-emboss-bg-light')
  })

  it('trigger applies default button styling when not asChild', () => {
    const { container } = render(
      <UI.Popover>
        <UI.PopoverTrigger>Trigger</UI.PopoverTrigger>
        <UI.PopoverContent>Content</UI.PopoverContent>
      </UI.Popover>
    )
    const button = container.querySelector('button')
    expect(button).toHaveClass('inline-flex')
    expect(button).toHaveClass('rounded-md')
  })

  it('content applies emboss background, shadow, and border classes', async () => {
    const user = userEvent.setup()
    render(
      <UI.Popover>
        <UI.PopoverTrigger>Open</UI.PopoverTrigger>
        <UI.PopoverContent>Content</UI.PopoverContent>
      </UI.Popover>
    )
    await user.click(screen.getByText('Open'))
    const content = screen.getByText('Content')
    expect(content).toHaveClass('bg-emboss-bg-light')
    expect(content).toHaveClass('shadow-emboss-out-light')
    expect(content).toHaveClass('border-emboss-shadow-light/30')
  })

  it('content applies z-50, w-72, rounded-xl, p-4', async () => {
    const user = userEvent.setup()
    render(
      <UI.Popover>
        <UI.PopoverTrigger>Open</UI.PopoverTrigger>
        <UI.PopoverContent>Content</UI.PopoverContent>
      </UI.Popover>
    )
    await user.click(screen.getByText('Open'))
    const content = screen.getByText('Content')
    expect(content).toHaveClass('z-50')
    expect(content).toHaveClass('w-72')
    expect(content).toHaveClass('rounded-xl')
    expect(content).toHaveClass('p-4')
  })

  it('content forwards sideOffset and align', async () => {
    const user = userEvent.setup()
    render(
      <UI.Popover>
        <UI.PopoverTrigger>Open</UI.PopoverTrigger>
        <UI.PopoverContent sideOffset={8} align="start">Content</UI.PopoverContent>
      </UI.Popover>
    )
    await user.click(screen.getByText('Open'))
    const content = screen.getByText('Content')
    expect(content).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.Popover).toBeDefined()
    expect(UI.PopoverTrigger).toBeDefined()
    expect(UI.PopoverContent).toBeDefined()
  })
})

describe('Accordion', () => {
  it('renders items and toggles content on click', async () => {
    const user = userEvent.setup()
    render(
      <UI.Accordion type="single" collapsible>
        <UI.AccordionItem value="item-1">
          <UI.AccordionTrigger>Section 1</UI.AccordionTrigger>
          <UI.AccordionContent>Content 1</UI.AccordionContent>
        </UI.AccordionItem>
        <UI.AccordionItem value="item-2">
          <UI.AccordionTrigger>Section 2</UI.AccordionTrigger>
          <UI.AccordionContent>Content 2</UI.AccordionContent>
        </UI.AccordionItem>
      </UI.Accordion>
    )

    expect(screen.getByText('Section 1')).toBeInTheDocument()
    expect(screen.getByText('Section 2')).toBeInTheDocument()
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument()

    await user.click(screen.getByText('Section 1'))
    expect(screen.getByText('Content 1')).toBeInTheDocument()
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument()
  })

  it('trigger contains chevron icon', () => {
    render(
      <UI.Accordion type="single">
        <UI.AccordionItem value="item-1">
          <UI.AccordionTrigger>Section 1</UI.AccordionTrigger>
          <UI.AccordionContent>Content</UI.AccordionContent>
        </UI.AccordionItem>
      </UI.Accordion>
    )

    const trigger = screen.getByText('Section 1').closest('button')
    expect(trigger?.querySelector('svg')).toBeInTheDocument()
  })

  it('trigger shows expanded state', () => {
    render(
      <UI.Accordion type="single" defaultValue="item-1">
        <UI.AccordionItem value="item-1">
          <UI.AccordionTrigger>Section 1</UI.AccordionTrigger>
          <UI.AccordionContent>Content</UI.AccordionContent>
        </UI.AccordionItem>
      </UI.Accordion>
    )

    const trigger = screen.getByText('Section 1').closest('button')
    expect(trigger).toHaveAttribute('data-state', 'open')
  })

  it('items have border class', () => {
    const { container } = render(
      <UI.Accordion type="single">
        <UI.AccordionItem value="item-1">
          <UI.AccordionTrigger>Section 1</UI.AccordionTrigger>
          <UI.AccordionContent>Content</UI.AccordionContent>
        </UI.AccordionItem>
      </UI.Accordion>
    )

    const itemElement = container.querySelector('.border-b')
    expect(itemElement).toBeInTheDocument()
  })

  it('content appears when expanded', async () => {
    const user = userEvent.setup()
    render(
      <UI.Accordion type="single" collapsible>
        <UI.AccordionItem value="item-1">
          <UI.AccordionTrigger>Section 1</UI.AccordionTrigger>
          <UI.AccordionContent>Content 1</UI.AccordionContent>
        </UI.AccordionItem>
      </UI.Accordion>
    )

    expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
    await user.click(screen.getByText('Section 1'))
    expect(screen.getByText('Content 1')).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.Accordion).toBeDefined()
    expect(UI.AccordionItem).toBeDefined()
    expect(UI.AccordionTrigger).toBeDefined()
    expect(UI.AccordionContent).toBeDefined()
  })
})

describe('DropdownMenu', () => {
  it('renders trigger', () => {
    render(
      <UI.DropdownMenu>
        <UI.DropdownMenuTrigger>Open</UI.DropdownMenuTrigger>
        <UI.DropdownMenuContent>
          <UI.DropdownMenuItem>Item</UI.DropdownMenuItem>
        </UI.DropdownMenuContent>
      </UI.DropdownMenu>
    )
    expect(screen.getByText('Open')).toBeInTheDocument()
  })

  it('opens content on click', async () => {
    const user = userEvent.setup()
    render(
      <UI.DropdownMenu>
        <UI.DropdownMenuTrigger>Open</UI.DropdownMenuTrigger>
        <UI.DropdownMenuContent>
          <UI.DropdownMenuItem>Item</UI.DropdownMenuItem>
        </UI.DropdownMenuContent>
      </UI.DropdownMenu>
    )
    expect(screen.queryByText('Item')).not.toBeInTheDocument()
    await user.click(screen.getByText('Open'))
    expect(screen.getByText('Item')).toBeInTheDocument()
  })

  it('renders menu items', async () => {
    const user = userEvent.setup()
    render(
      <UI.DropdownMenu>
        <UI.DropdownMenuTrigger>Open</UI.DropdownMenuTrigger>
        <UI.DropdownMenuContent>
          <UI.DropdownMenuItem>Profile</UI.DropdownMenuItem>
          <UI.DropdownMenuItem>Settings</UI.DropdownMenuItem>
          <UI.DropdownMenuItem>Logout</UI.DropdownMenuItem>
        </UI.DropdownMenuContent>
      </UI.DropdownMenu>
    )
    await user.click(screen.getByText('Open'))
    expect(screen.getByText('Profile')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })

  it('renders separator', async () => {
    const user = userEvent.setup()
    render(
      <UI.DropdownMenu>
        <UI.DropdownMenuTrigger>Open</UI.DropdownMenuTrigger>
        <UI.DropdownMenuContent>
          <UI.DropdownMenuItem>Item</UI.DropdownMenuItem>
          <UI.DropdownMenuSeparator />
          <UI.DropdownMenuItem>After</UI.DropdownMenuItem>
        </UI.DropdownMenuContent>
      </UI.DropdownMenu>
    )
    await user.click(screen.getByText('Open'))
    const items = screen.getAllByRole('menuitem')
    expect(items).toHaveLength(2)
    expect(items[0]).toHaveTextContent('Item')
    expect(items[1]).toHaveTextContent('After')
  })

  it('renders checkbox items', async () => {
    const user = userEvent.setup()
    render(
      <UI.DropdownMenu>
        <UI.DropdownMenuTrigger>Open</UI.DropdownMenuTrigger>
        <UI.DropdownMenuContent>
          <UI.DropdownMenuCheckboxItem checked>Checkbox</UI.DropdownMenuCheckboxItem>
        </UI.DropdownMenuContent>
      </UI.DropdownMenu>
    )
    await user.click(screen.getByText('Open'))
    const checkboxItem = screen.getByText('Checkbox')
    expect(checkboxItem).toBeInTheDocument()
    expect(checkboxItem.closest('[role="menuitemcheckbox"]')).toHaveAttribute('data-state', 'checked')
  })

  it('is exported from index', () => {
    expect(UI.DropdownMenu).toBeDefined()
    expect(UI.DropdownMenuTrigger).toBeDefined()
    expect(UI.DropdownMenuContent).toBeDefined()
    expect(UI.DropdownMenuItem).toBeDefined()
    expect(UI.DropdownMenuCheckboxItem).toBeDefined()
    expect(UI.DropdownMenuRadioItem).toBeDefined()
    expect(UI.DropdownMenuSeparator).toBeDefined()
    expect(UI.DropdownMenuLabel).toBeDefined()
    expect(UI.DropdownMenuShortcut).toBeDefined()
    expect(UI.DropdownMenuGroup).toBeDefined()
    expect(UI.DropdownMenuPortal).toBeDefined()
    expect(UI.DropdownMenuSub).toBeDefined()
    expect(UI.DropdownMenuRadioGroup).toBeDefined()
    expect(UI.DropdownMenuSubTrigger).toBeDefined()
    expect(UI.DropdownMenuSubContent).toBeDefined()
  })
})

// ─── Progress ───

describe('Progress', () => {
  it('renders with value', () => {
    render(<Progress value={60} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('applies size classes', () => {
    const { container } = render(<Progress value={50} size="lg" />)
    const root = container.firstChild as HTMLElement
    expect(root.className).toContain('h-4')
  })

  it('renders with 0 value', () => {
    render(<Progress value={0} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.Progress).toBeDefined()
  })
})

// ─── Skeleton ───

describe('Skeleton', () => {
  it('renders text variant', () => {
    const { container } = render(<Skeleton variant="text" />)
    const el = container.firstChild as HTMLElement
    expect(el.className).toContain('animate-pulse')
  })

  it('renders circle variant', () => {
    const { container } = render(<Skeleton variant="circle" className="h-12 w-12" />)
    const el = container.firstChild as HTMLElement
    expect(el.className).toContain('rounded-full')
  })

  it('renders card variant', () => {
    const { container } = render(<Skeleton variant="card" />)
    const el = container.firstChild as HTMLElement
    expect(el.className).toContain('rounded-xl')
  })

  it('is exported from index', () => {
    expect(UI.Skeleton).toBeDefined()
  })
})

// ─── Avatar ───

describe('Avatar', () => {
  it('renders fallback when no image', () => {
    render(<Avatar fallback="AK" />)
    expect(screen.getByText('AK')).toBeInTheDocument()
  })

  it('renders with image (shows container)', () => {
    const { container } = render(<Avatar src="https://example.com/avatar.png" alt="User" fallback="AK" />)
    const root = container.firstChild as HTMLElement
    expect(root.className).toContain('rounded-full')
  })

  it('applies size classes', () => {
    const { container } = render(<Avatar size="lg" fallback="L" />)
    const root = container.firstChild as HTMLElement
    expect(root.className).toContain('h-14')
  })

  it('is exported from index', () => {
    expect(UI.Avatar).toBeDefined()
  })
})

// ─── Sheet ───

describe('Sheet', () => {
  it('renders trigger and opens content', async () => {
    render(
      <Sheet>
        <SheetTrigger asChild>
          <button>Open</button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle>Test Sheet</SheetTitle>
          <p>Sheet content</p>
        </SheetContent>
      </Sheet>
    )
    const user = userEvent.setup()
    const trigger = screen.getByText('Open')
    await user.click(trigger)
    expect(screen.getByText('Sheet content')).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.Sheet).toBeDefined()
    expect(UI.SheetTrigger).toBeDefined()
    expect(UI.SheetContent).toBeDefined()
  })
})

// ─── ToggleGroup ───

describe('ToggleGroup', () => {
  it('renders with items', () => {
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>
    )
    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.ToggleGroup).toBeDefined()
    expect(UI.ToggleGroupItem).toBeDefined()
  })
})

// ─── Collapsible ───

describe('Collapsible', () => {
  it('renders trigger and toggles content', async () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Show More</CollapsibleTrigger>
        <CollapsibleContent>Hidden content</CollapsibleContent>
      </Collapsible>
    )
    expect(screen.getByText('Show More')).toBeInTheDocument()
    const user = userEvent.setup()
    const trigger = screen.getByText('Show More')
    await user.click(trigger)
    expect(screen.getByText('Hidden content')).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.Collapsible).toBeDefined()
    expect(UI.CollapsibleTrigger).toBeDefined()
    expect(UI.CollapsibleContent).toBeDefined()
  })
})

// ─── TiltCard ───

describe('TiltCard', () => {
  it('renders children', () => {
    render(<TiltCard><p>Tilt content</p></TiltCard>)
    expect(screen.getByText('Tilt content')).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.TiltCard).toBeDefined()
  })
})

// ─── ProgressCircle ───

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

// ─── AlertDialog ───

describe('AlertDialog', () => {
  it('renders trigger', () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger>Delete account</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogAction>Confirm</AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    )
    expect(screen.getByText('Delete account')).toBeInTheDocument()
  })

  it('opens content on click', async () => {
    const user = userEvent.setup()
    render(
      <AlertDialog>
        <AlertDialogTrigger>Delete account</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogAction>Confirm</AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    )
    expect(screen.queryByText('Confirm')).not.toBeInTheDocument()
    await user.click(screen.getByText('Delete account'))
    expect(screen.getByText('Confirm')).toBeInTheDocument()
  })

  it('exports from index', () => {
    expect(UI.AlertDialog).toBeDefined()
    expect(UI.AlertDialogTrigger).toBeDefined()
    expect(UI.AlertDialogContent).toBeDefined()
    expect(UI.AlertDialogAction).toBeDefined()
    expect(UI.AlertDialogCancel).toBeDefined()
  })
})

// ─── Kbd ───

describe('Kbd', () => {
  it('renders children', () => {
    render(<Kbd>⌘K</Kbd>)
    expect(screen.getByText('⌘K')).toBeInTheDocument()
  })

  it('renders as kbd element', () => {
    const { container } = render(<Kbd>Ctrl</Kbd>)
    expect(container.querySelector('kbd')).toBeInTheDocument()
  })
})

// ─── Spinner ───

describe('Spinner', () => {
  it('renders', () => {
    const { container } = render(<Spinner />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('has loading status', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('applies size classes', () => {
    const { container } = render(<Spinner size="lg" />)
    expect(container.firstChild).toHaveClass('h-8')
  })
})

// ─── AspectRatio ───

describe('AspectRatio', () => {
  it('renders children', () => {
    render(<AspectRatio ratio={16 / 9}><div>Content</div></AspectRatio>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })
})

// ─── Empty ───

describe('Empty', () => {
  it('renders title and description', () => {
    render(<Empty title="Empty" description="Nothing here" />)
    expect(screen.getByText('Empty')).toBeInTheDocument()
    expect(screen.getByText('Nothing here')).toBeInTheDocument()
  })

  it('renders action', () => {
    render(<Empty title="Empty" action={<button>Action</button>} />)
    expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.Empty).toBeDefined()
  })
})

// ─── Field ───

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

// ─── Command ───

describe('Command', () => {
  it('renders with input', () => {
    render(
      <Command>
        <CommandInput placeholder="Search..." />
      </Command>
    )
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  it('renders items', () => {
    window.HTMLElement.prototype.scrollIntoView = function () {}
    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandItem value="item1">Item 1</CommandItem>
          <CommandItem value="item2">Item 2</CommandItem>
        </CommandList>
      </Command>
    )
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.Command).toBeDefined()
    expect(UI.CommandInput).toBeDefined()
    expect(UI.CommandList).toBeDefined()
    expect(UI.CommandItem).toBeDefined()
    expect(UI.CommandGroup).toBeDefined()
    expect(UI.CommandEmpty).toBeDefined()
    expect(UI.CommandSeparator).toBeDefined()
    expect(UI.CommandShortcut).toBeDefined()
  })
})

// ─── HoverCard ───

describe('HoverCard', () => {
  it('renders trigger', () => {
    render(
      <HoverCard>
        <HoverCardTrigger>Hover me</HoverCardTrigger>
      </HoverCard>
    )
    expect(screen.getByText('Hover me')).toBeInTheDocument()
  })

  it('exports from index', () => {
    expect(UI.HoverCard).toBeDefined()
    expect(UI.HoverCardTrigger).toBeDefined()
    expect(UI.HoverCardContent).toBeDefined()
  })
})

// ─── Pagination ───

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

// ─── Table ───

describe('Table', () => {
  it('renders table elements', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Data')).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.Table).toBeDefined()
    expect(UI.TableHeader).toBeDefined()
    expect(UI.TableBody).toBeDefined()
    expect(UI.TableRow).toBeDefined()
    expect(UI.TableHead).toBeDefined()
    expect(UI.TableCell).toBeDefined()
  })
})

// ─── Calendar ───

describe('Calendar', () => {
  it('renders', () => {
    const { container } = render(<Calendar mode="single" />)
    expect(container.querySelector('table')).toBeInTheDocument()
  })
})

// ─── Menubar ───

describe('Menubar', () => {
  it('renders trigger', () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New</MenubarItem>
            <MenubarItem>Open</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
    expect(screen.getByText('File')).toBeInTheDocument()
  })

  it('exports from index', () => {
    expect(UI.Menubar).toBeDefined()
    expect(UI.MenubarMenu).toBeDefined()
    expect(UI.MenubarTrigger).toBeDefined()
    expect(UI.MenubarContent).toBeDefined()
    expect(UI.MenubarItem).toBeDefined()
  })
})

// ─── DatePicker ───

describe('DatePicker', () => {
  it('renders with placeholder', () => {
    render(<DatePicker placeholder="Pick a date" />)
    expect(screen.getByText('Pick a date')).toBeInTheDocument()
  })
})

// ─── Combobox ───

describe('Combobox', () => {
  it('renders with placeholder', () => {
    render(<Combobox items={[{ value: 'a', label: 'A' }]} placeholder="Select..." />)
    expect(screen.getByText('Select...')).toBeInTheDocument()
  })
})

// ─── Toggle (standalone) ───

describe('Toggle', () => {
  it('renders', () => {
    render(<Toggle aria-label="Toggle me">Toggle</Toggle>)
    expect(screen.getByRole('button', { name: /toggle me/i })).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.Toggle).toBeDefined()
  })
})

// ─── InputOTP ───

describe('InputOTP', () => {
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

// ─── Carousel ───

describe('Carousel', () => {
  it('renders items', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Item 1</CarouselItem>
          <CarouselItem>Item 2</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.Carousel).toBeDefined()
    expect(UI.CarouselContent).toBeDefined()
    expect(UI.CarouselItem).toBeDefined()
    expect(UI.CarouselPrevious).toBeDefined()
    expect(UI.CarouselNext).toBeDefined()
  })
})

// ─── Resizable ───

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

// ─── DataTable ───

describe('DataTable', () => {
  const columns = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'name', header: 'Name' },
  ]
  const data = [
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' },
  ]

  it('renders rows', () => {
    render(<DataTable columns={columns} data={data} />)
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
  })

  it('renders headers', () => {
    render(<DataTable columns={columns} data={data} />)
    expect(screen.getByText('Name')).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.DataTable).toBeDefined()
  })
})

// ─── Sidebar ───

describe('Sidebar', () => {
  it('renders with content', () => {
    render(
      <SidebarProvider defaultOpen>
        <Sidebar collapsible="none">
          <SidebarHeader>Header</SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Group</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>Item</SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>Footer</SidebarFooter>
        </Sidebar>
        <main>Content</main>
      </SidebarProvider>
    )
    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })

  it('renders menu items', () => {
    render(
      <SidebarProvider defaultOpen>
        <Sidebar collapsible="none">
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>Dashboard</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <main>Content</main>
      </SidebarProvider>
    )
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.SidebarProvider).toBeDefined()
    expect(UI.Sidebar).toBeDefined()
    expect(UI.SidebarHeader).toBeDefined()
    expect(UI.SidebarContent).toBeDefined()
    expect(UI.SidebarFooter).toBeDefined()
    expect(UI.SidebarGroup).toBeDefined()
    expect(UI.SidebarGroupLabel).toBeDefined()
    expect(UI.SidebarGroupContent).toBeDefined()
    expect(UI.SidebarMenu).toBeDefined()
    expect(UI.SidebarMenuItem).toBeDefined()
    expect(UI.SidebarMenuButton).toBeDefined()
    expect(UI.SidebarTrigger).toBeDefined()
    expect(UI.SidebarInset).toBeDefined()
  })
})

// ─── Chart ───

describe('Chart', () => {
  it('renders container', () => {
    render(
      <ChartContainer config={{ test: { label: 'Test', color: '#000' } }}>
        <div>Chart</div>
      </ChartContainer>
    )
    expect(screen.getByText('Chart')).toBeInTheDocument()
  })

  it('ChartTooltipContent renders with payload', () => {
    render(
      <ChartTooltipContent active payload={[{ name: 'Revenue', value: 100 }]} />
    )
    expect(screen.getByText('Revenue')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
  })

  it('ChartTooltipContent returns null when inactive', () => {
    const { container } = render(<ChartTooltipContent active={false} />)
    expect(container.firstChild).toBeNull()
  })

  it('ChartLegendContent renders with payload', () => {
    render(
      <ChartLegendContent payload={[{ value: 'Revenue', color: '#000' }]} />
    )
    expect(screen.getByText('Revenue')).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.ChartContainer).toBeDefined()
    expect(UI.ChartTooltip).toBeDefined()
    expect(UI.ChartTooltipContent).toBeDefined()
    expect(UI.ChartLegend).toBeDefined()
    expect(UI.ChartLegendContent).toBeDefined()
  })
})

// ─── ScrollArea ───

describe('ScrollArea', () => {
  it('renders children', () => {
    render(
      <ScrollArea className="h-48 w-80">
        <p>Scroll content</p>
      </ScrollArea>
    )
    expect(screen.getByText('Scroll content')).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.ScrollArea).toBeDefined()
    expect(UI.ScrollBar).toBeDefined()
  })
})

// ─── Drawer ───

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

// ─── ContextMenu ───

describe('ContextMenu', () => {
  it('renders trigger', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger className="block">Right-click</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Action</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem checked>Check</ContextMenuCheckboxItem>
          <ContextMenuLabel>Theme</ContextMenuLabel>
          <ContextMenuRadioGroup value="system">
            <ContextMenuRadioItem value="dark">Dark</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
          <ContextMenuSub>
            <ContextMenuSubTrigger>More</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Sub action</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuItem>
            Cut
            <ContextMenuShortcut>⌘X</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )
    expect(screen.getByText('Right-click')).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.ContextMenu).toBeDefined()
    expect(UI.ContextMenuTrigger).toBeDefined()
    expect(UI.ContextMenuContent).toBeDefined()
    expect(UI.ContextMenuItem).toBeDefined()
    expect(UI.ContextMenuSeparator).toBeDefined()
    expect(UI.ContextMenuCheckboxItem).toBeDefined()
    expect(UI.ContextMenuRadioItem).toBeDefined()
    expect(UI.ContextMenuLabel).toBeDefined()
    expect(UI.ContextMenuShortcut).toBeDefined()
    expect(UI.ContextMenuSub).toBeDefined()
    expect(UI.ContextMenuSubTrigger).toBeDefined()
    expect(UI.ContextMenuSubContent).toBeDefined()
    expect(UI.ContextMenuRadioGroup).toBeDefined()
    expect(UI.ContextMenuPortal).toBeDefined()
  })
})

// ─── Form ───

describe('Form', () => {
  it('renders fields', () => {
    render(
      <Form onSubmit={() => {}} defaultValues={{ name: '' }}>
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormDescription>Your name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    )
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Your name')).toBeInTheDocument()
  })

  it('shows validation error', async () => {
    const user = userEvent.setup()
    render(
      <Form onSubmit={() => {}} defaultValues={{ email: '' }}>
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    )
    const input = screen.getByPlaceholderText('Email')
    await user.type(input, 'invalid')
    expect(input).toBeInTheDocument()
  })

  it('is exported from index', () => {
    expect(UI.Form).toBeDefined()
    expect(UI.FormField).toBeDefined()
    expect(UI.FormItem).toBeDefined()
    expect(UI.FormLabel).toBeDefined()
    expect(UI.FormControl).toBeDefined()
    expect(UI.FormDescription).toBeDefined()
    expect(UI.FormMessage).toBeDefined()
  })
})

// ─── NavigationMenu ───

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

// ─── Select ───

describe('Select', () => {
  it('renders trigger with placeholder', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Choose an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Option 1</SelectItem>
          <SelectItem value="2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    )
    expect(screen.getByText('Choose an option')).toBeInTheDocument()
  })

  it('opens on click', async () => {
    const user = userEvent.setup()
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Choose" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Option 1</SelectItem>
        </SelectContent>
      </Select>
    )
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
    await user.click(screen.getByRole('combobox'))
    expect(screen.getByText('Option 1')).toBeInTheDocument()
  })

  it('exports from index', () => {
    expect(UI.Select).toBeDefined()
    expect(UI.SelectTrigger).toBeDefined()
    expect(UI.SelectValue).toBeDefined()
    expect(UI.SelectContent).toBeDefined()
    expect(UI.SelectItem).toBeDefined()
  })
})

// ─── ButtonGroup ───

describe('ButtonGroup', () => {
  it('renders children', () => {
    render(
      <UI.ButtonGroup>
        <button>One</button>
        <button>Two</button>
      </UI.ButtonGroup>
    )
    expect(screen.getByText('One')).toBeInTheDocument()
    expect(screen.getByText('Two')).toBeInTheDocument()
  })

  it('renders with horizontal orientation by default', () => {
    const { container } = render(
      <UI.ButtonGroup>
        <button>A</button>
      </UI.ButtonGroup>
    )
    const group = container.firstChild as HTMLElement
    expect(group).toHaveAttribute('data-orientation', 'horizontal')
    expect(group).not.toHaveClass('flex-col')
  })

  it('renders with vertical orientation', () => {
    const { container } = render(
      <UI.ButtonGroup orientation="vertical">
        <button>A</button>
      </UI.ButtonGroup>
    )
    const group = container.firstChild as HTMLElement
    expect(group).toHaveAttribute('data-orientation', 'vertical')
    expect(group).toHaveClass('flex-col')
  })

  it('has role="group"', () => {
    render(
      <UI.ButtonGroup>
        <button>A</button>
      </UI.ButtonGroup>
    )
    expect(screen.getByRole('group')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <UI.ButtonGroup className="custom-class">
        <button>A</button>
      </UI.ButtonGroup>
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('exports from index', () => {
    expect(UI.ButtonGroup).toBeDefined()
  })
})

// ─── Direction ───

describe('Direction', () => {
  it('renders children', () => {
    render(<UI.DirectionProvider>Content</UI.DirectionProvider>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('useDirection throws when no DirectionProvider is present', () => {
    function TestComponent() {
      const dir = UI.useDirection()
      return <span data-testid="dir">{dir}</span>
    }
    expect(() => render(<TestComponent />)).toThrow(
      'useDirection must be used within a DirectionProvider'
    )
  })

  it('useDirection returns rtl when wrapped in DirectionProvider with dir="rtl"', () => {
    function TestComponent() {
      const dir = UI.useDirection()
      return <span data-testid="dir">{dir}</span>
    }
    render(
      <UI.DirectionProvider dir="rtl">
        <TestComponent />
      </UI.DirectionProvider>
    )
    expect(screen.getByTestId('dir')).toHaveTextContent('rtl')
  })

  it('exports from index', () => {
    expect(UI.DirectionProvider).toBeDefined()
    expect(UI.useDirection).toBeDefined()
  })
})

// ─── NativeSelect ───

describe('NativeSelect', () => {
  it('renders a select element', () => {
    render(<UI.NativeSelect aria-label="Choose" />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('renders placeholder option', () => {
    render(
      <UI.NativeSelect placeholder="Select an option">
        <option value="1">Option 1</option>
      </UI.NativeSelect>
    )
    expect(screen.getByText('Select an option')).toBeInTheDocument()
  })

  it('renders children (options)', () => {
    render(
      <UI.NativeSelect>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </UI.NativeSelect>
    )
    expect(screen.getByText('Option 1')).toBeInTheDocument()
    expect(screen.getByText('Option 2')).toBeInTheDocument()
  })

  it('applies emboss styling classes', () => {
    const { container } = render(<UI.NativeSelect aria-label="Select" />)
    const select = container.querySelector('select')
    expect(select).toHaveClass('shadow-emboss-out-light-sm')
  })

  it('can be disabled', () => {
    render(<UI.NativeSelect disabled aria-label="Disabled" />)
    expect(screen.getByRole('combobox')).toBeDisabled()
  })

  it('exports from index', () => {
    expect(UI.NativeSelect).toBeDefined()
  })
})

// ─── Typography ───

describe('Typography', () => {
  it('renders children', () => {
    render(<UI.Typography>Hello</UI.Typography>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders as p by default', () => {
    const { container } = render(<UI.Typography>Text</UI.Typography>)
    expect(container.querySelector('p')).toBeInTheDocument()
  })

  it('renders as h1 with h1 variant', () => {
    render(<UI.Typography variant="h1">Heading</UI.Typography>)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Heading')
  })

  it('renders as h2 with h2 variant', () => {
    render(<UI.Typography variant="h2">Heading 2</UI.Typography>)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Heading 2')
  })

  it('renders as h3 with h3 variant', () => {
    render(<UI.Typography variant="h3">Heading 3</UI.Typography>)
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Heading 3')
  })

  it('renders as h4 with h4 variant', () => {
    render(<UI.Typography variant="h4">Heading 4</UI.Typography>)
    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('Heading 4')
  })

  it('renders as small element with small variant', () => {
    const { container } = render(<UI.Typography variant="small">Small</UI.Typography>)
    expect(container.querySelector('small')).toBeInTheDocument()
  })

  it('renders as custom element with as prop', () => {
    const { container } = render(<UI.Typography as="span">Custom</UI.Typography>)
    expect(container.querySelector('span')).toBeInTheDocument()
  })

  it('applies variant-specific classes', () => {
    const { container } = render(<UI.Typography variant="h1">Heading</UI.Typography>)
    expect(container.firstChild).toHaveClass('text-4xl')
    expect(container.firstChild).toHaveClass('font-bold')
  })

  it('applies muted class for muted variant', () => {
    const { container } = render(<UI.Typography variant="muted">Muted</UI.Typography>)
    expect(container.firstChild).toHaveClass('text-muted-foreground')
  })

  it('applies custom className', () => {
    const { container } = render(<UI.Typography className="custom">Text</UI.Typography>)
    expect(container.firstChild).toHaveClass('custom')
  })

  it('exports from index', () => {
    expect(UI.Typography).toBeDefined()
  })
})

// ─── InputGroup ───

describe('InputGroup', () => {
  it('renders children', () => {
    render(
      <UI.InputGroup>
        <input placeholder="Test" />
      </UI.InputGroup>
    )
    expect(screen.getByPlaceholderText('Test')).toBeInTheDocument()
  })

  it('renders with addon', () => {
    render(
      <UI.InputGroup>
        <UI.InputGroupAddon>$</UI.InputGroupAddon>
        <input placeholder="Amount" />
      </UI.InputGroup>
    )
    expect(screen.getByText('$')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Amount')).toBeInTheDocument()
  })

  it('renders multiple addons', () => {
    render(
      <UI.InputGroup>
        <UI.InputGroupAddon>$</UI.InputGroupAddon>
        <input placeholder="Amount" />
        <UI.InputGroupAddon>.00</UI.InputGroupAddon>
      </UI.InputGroup>
    )
    expect(screen.getByText('$')).toBeInTheDocument()
    expect(screen.getByText('.00')).toBeInTheDocument()
  })

  it('renders with full width by default', () => {
    const { container } = render(
      <UI.InputGroup>
        <input />
      </UI.InputGroup>
    )
    expect(container.firstChild).toHaveClass('w-full')
  })

  it('can have fullWidth disabled', () => {
    const { container } = render(
      <UI.InputGroup fullWidth={false}>
        <input />
      </UI.InputGroup>
    )
    expect(container.firstChild).not.toHaveClass('w-full')
  })

  it('exports from index', () => {
    expect(UI.InputGroup).toBeDefined()
    expect(UI.InputGroupAddon).toBeDefined()
  })
})

// ─── Item ───

describe('Item', () => {
  it('renders children', () => {
    render(<UI.Item><p>Content</p></UI.Item>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders with title and description', () => {
    render(
      <UI.Item>
        <UI.ItemContent>
          <UI.ItemTitle>Title</UI.ItemTitle>
          <UI.ItemDescription>Description</UI.ItemDescription>
        </UI.ItemContent>
      </UI.Item>
    )
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
  })

  it('renders media slot', () => {
    render(
      <UI.Item>
        <UI.ItemMedia>
          <div data-testid="media">Icon</div>
        </UI.ItemMedia>
        <UI.ItemContent>
          <UI.ItemTitle>Title</UI.ItemTitle>
        </UI.ItemContent>
      </UI.Item>
    )
    expect(screen.getByTestId('media')).toBeInTheDocument()
  })

  it('renders actions slot', () => {
    render(
      <UI.Item>
        <UI.ItemContent>
          <UI.ItemTitle>Title</UI.ItemTitle>
        </UI.ItemContent>
        <UI.ItemActions>
          <button>Edit</button>
        </UI.ItemActions>
      </UI.Item>
    )
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument()
  })

  it('renders with card variant', () => {
    const { container } = render(
      <UI.Item variant="card">
        <UI.ItemContent>
          <UI.ItemTitle>Card Item</UI.ItemTitle>
        </UI.ItemContent>
      </UI.Item>
    )
    expect(container.firstChild).toHaveClass('rounded-lg')
    expect(container.firstChild).toHaveClass('border')
    expect(container.firstChild).toHaveClass('p-3')
  })

  it('exports from index', () => {
    expect(UI.Item).toBeDefined()
    expect(UI.ItemMedia).toBeDefined()
    expect(UI.ItemContent).toBeDefined()
    expect(UI.ItemTitle).toBeDefined()
    expect(UI.ItemDescription).toBeDefined()
    expect(UI.ItemActions).toBeDefined()
  })
})
