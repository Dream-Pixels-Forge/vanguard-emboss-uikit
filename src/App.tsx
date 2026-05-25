import { ThemeProvider, useTheme } from './providers/theme-provider'
import { EmbossBox } from './components/ui/emboss-box'
import { Box } from './components/ui/box'
import { Text } from './components/ui/text'
import { Button } from './components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { cn } from './lib/utils'
import { getEmbossShadow, getEmbossBackground } from './lib/tailwind-utils'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <button
      onClick={toggleTheme}
      className={cn(
        getEmbossBackground(),
        getEmbossShadow('out', 'small'),
        'px-4 py-2 rounded-lg font-medium transition-all duration-200',
        'hover:scale-105 active:scale-95'
      )}
    >
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  )
}

function AppContent() {
  return (
    <div className="min-h-screen bg-emboss-bg-light dark:bg-emboss-bg-dark p-8 transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <Text variant="h1" className="mb-2">Vanguard Emboss UI Kit</Text>
            <Text variant="p" muted>Premium Neumorphic Design System</Text>
          </div>
          <ThemeToggle />
        </div>
        
        {/* Component Showcase */}
        <div className="space-y-8">
          
          {/* Text Components */}
          <Card>
            <CardHeader>
              <CardTitle>Typography</CardTitle>
              <CardDescription>Text components with emboss principles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Text variant="h1">Heading 1</Text>
                <Text variant="h2">Heading 2</Text>
                <Text variant="h3">Heading 3</Text>
                <Text variant="p">Paragraph text with normal weight</Text>
                <Text variant="p" weight="bold">Paragraph text with bold weight</Text>
                <Text variant="p" muted>Muted text for secondary content</Text>
                <Text variant="p" accent="blue">Accent text in blue</Text>
                <Text variant="p" accent="orange">Accent text in orange</Text>
                <Text variant="p" accent="green">Accent text in green</Text>
              </div>
            </CardContent>
          </Card>
          
          {/* Button Components */}
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>Interactive elements with emboss effects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button variant="default">Default</Button>
                <Button variant="accent">Accent</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Card Components */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Raised Card</CardTitle>
                <CardDescription>With default raised styling</CardDescription>
              </CardHeader>
              <CardContent>
                <Text variant="p">This card appears extruded from the surface with proper shadow simulation.</Text>
              </CardContent>
              <CardFooter>
                <Button variant="accent" size="sm">Action</Button>
              </CardFooter>
            </Card>
            
            <Card raised={false}>
              <CardHeader>
                <CardTitle>Flat Card</CardTitle>
                <CardDescription>Without raised effect</CardDescription>
              </CardHeader>
              <CardContent>
                <Text variant="p">This card sits flush with the surface, useful for content containers.</Text>
              </CardContent>
            </Card>
          </div>
          
          {/* Badge Components */}
          <Card>
            <CardHeader>
              <CardTitle>Badges</CardTitle>
              <CardDescription>Status indicators with emboss effects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Badge>Default</Badge>
                <Badge variant="accent">Accent</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
              <div className="flex flex-wrap gap-3">
                <Badge size="sm">Small</Badge>
                <Badge size="md">Medium</Badge>
                <Badge size="lg">Large</Badge>
              </div>
            </CardContent>
          </Card>
          
          {/* Box Components */}
          <Card>
            <CardHeader>
              <CardTitle>Box Components</CardTitle>
              <CardDescription>Foundation components with emboss styling</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Box raised className="p-4">
                  <Text variant="p" className="text-center">Raised Box</Text>
                </Box>
                <Box recessed className="p-4">
                  <Text variant="p" className="text-center">Recessed Box</Text>
                </Box>
                <Box border className="p-4">
                  <Text variant="p" className="text-center">Bordered Box</Text>
                </Box>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <EmbossBox raised={true}>
                  <Text variant="h4" className="mb-2">Raised Emboss Box</Text>
                  <Text variant="p" muted>Legacy component for backward compatibility</Text>
                </EmbossBox>
                
                <EmbossBox raised={false}>
                  <Text variant="h4" className="mb-2">Recessed Emboss Box</Text>
                  <Text variant="p" muted>Legacy component for backward compatibility</Text>
                </EmbossBox>
              </div>
            </CardContent>
          </Card>
          
          {/* Design Principles */}
          <Card>
            <CardHeader>
              <CardTitle>Design Principles</CardTitle>
              <CardDescription>Strict rules for emboss illusion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Badge variant="accent" className="mr-3 flex-shrink-0">1</Badge>
                  <div>
                    <Text variant="p" weight="semibold" className="mb-1">Background Rule</Text>
                    <Text variant="p" muted>
                      Component background must exactly match parent container background.
                      Light: #eceef1 (HSL: 210, 20%, 94%), Dark: #282e38 (HSL: 215, 15%, 18%)
                    </Text>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Badge variant="accent" className="mr-3 flex-shrink-0">2</Badge>
                  <div>
                    <Text variant="p" weight="semibold" className="mb-1">45° Light Source</Text>
                    <Text variant="p" muted>
                      All depth from top-left virtual light. Raised: top-left light, bottom-right dark.
                      Recessed: top-left inner dark, bottom-right inner light.
                    </Text>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Badge variant="accent" className="mr-3 flex-shrink-0">3</Badge>
                  <div>
                    <Text variant="p" weight="semibold" className="mb-1">No High-Contrast Borders</Text>
                    <Text variant="p" muted>
                      Use soft gradients or matched shadows only. Never use default dark borders.
                    </Text>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App