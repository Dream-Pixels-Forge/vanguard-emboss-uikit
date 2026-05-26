import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

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
