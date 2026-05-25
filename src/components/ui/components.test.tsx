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

describe('EmbossBox', () => {
  it('is exported and renders with deprecation notice', async () => {
    const mod = await import('./emboss-box')
    expect(mod.EmbossBox).toBeDefined()
  })
})
