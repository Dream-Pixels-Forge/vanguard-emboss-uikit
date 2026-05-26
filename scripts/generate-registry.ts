import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const COMPONENTS_DIR = resolve(__dirname, '../src/components/ui')
const REGISTRY_DIR = resolve(__dirname, '../registry')
const REGISTRY_UI_DIR = resolve(REGISTRY_DIR, 'ui')

interface ComponentMeta {
  name: string
  dependencies?: string[]
  registryDependencies?: string[]
  internalDeps?: string[]  // internal utils/tailwind-utils deps that ship with the lib
}

const components: ComponentMeta[] = [
  { name: 'button' },
  { name: 'badge' },
  { name: 'box' },
  { name: 'text' },
  { name: 'card' },
  { name: 'alert', dependencies: ['lucide-react'] },
  { name: 'input' },
  { name: 'textarea' },
  { name: 'label' },
  { name: 'checkbox', dependencies: ['@radix-ui/react-checkbox', 'lucide-react'] },
  { name: 'radio', dependencies: ['@radix-ui/react-radio-group', 'lucide-react'] },
  { name: 'switch', dependencies: ['@radix-ui/react-switch'] },
  { name: 'slider', dependencies: ['@radix-ui/react-slider'] },
  { name: 'select', dependencies: ['@radix-ui/react-select', 'lucide-react'] },
  { name: 'tabs', dependencies: ['@radix-ui/react-tabs'] },
  { name: 'dialog', dependencies: ['@radix-ui/react-dialog', 'lucide-react'] },
  { name: 'breadcrumb', dependencies: ['lucide-react'] },
  { name: 'navigation-menu', dependencies: ['@radix-ui/react-navigation-menu', 'lucide-react'] },
  { name: 'emboss-box' },
  { name: 'progress', dependencies: ['@radix-ui/react-progress'] },
  { name: 'skeleton' },
  { name: 'avatar', dependencies: ['@radix-ui/react-avatar'] },
  { name: 'sheet', dependencies: ['@radix-ui/react-dialog', 'lucide-react'], registryDependencies: ['button'] },
  { name: 'toggle', dependencies: ['@radix-ui/react-toggle-group'] },
  { name: 'collapsible', dependencies: ['@radix-ui/react-collapsible', 'lucide-react'] },
  { name: 'tilt-card' },
  { name: 'progress-circle' },
]

mkdirSync(REGISTRY_UI_DIR, { recursive: true })

const indexItems: Record<string, { name: string; type: string }[]> = {}

for (const meta of components) {
  const filePath = resolve(COMPONENTS_DIR, `${meta.name}.tsx`)
  const content = readFileSync(filePath, 'utf-8')
  const base64 = Buffer.from(content).toString('base64')

  const registryJson = {
    name: meta.name,
    type: 'registry:ui',
    dependencies: [
      ...(meta.dependencies || []),
    ],
    registryDependencies: meta.registryDependencies || [],
    files: [
      {
        path: `components/ui/${meta.name}.tsx`,
        type: 'registry:ui',
        content: base64,
      },
    ],
  }

  writeFileSync(
    resolve(REGISTRY_UI_DIR, `${meta.name}.json`),
    JSON.stringify(registryJson, null, 2),
    'utf-8'
  )

  // Group by category for the index
  let category = 'other'
  if (['button', 'badge'].includes(meta.name)) category = 'general'
  else if (['box', 'card', 'text', 'emboss-box'].includes(meta.name)) category = 'layout'
  else if (['input', 'textarea', 'label', 'checkbox', 'radio', 'switch', 'slider', 'select'].includes(meta.name)) category = 'forms'
  else if (['tabs', 'dialog', 'breadcrumb', 'navigation-menu', 'alert', 'sheet'].includes(meta.name)) category = 'navigation'
  else if (['progress', 'skeleton', 'progress-circle'].includes(meta.name)) category = 'feedback'
  else if (['avatar', 'toggle', 'collapsible', 'tilt-card'].includes(meta.name)) category = 'general'
  
  if (!indexItems[category]) indexItems[category] = []
  indexItems[category].push({ name: meta.name, type: 'registry:ui' })
}

const indexJson = {
  name: 'vanguard-emboss-uikit',
  description: 'Premium neumorphic React component library',
  homepage: 'https://github.com/Dream-Pixels-Forge/vanguard-emboss-uikit',
  items: indexItems,
}

writeFileSync(
  resolve(REGISTRY_DIR, 'index.json'),
  JSON.stringify(indexJson, null, 2),
  'utf-8'
)

console.log(`✅ Generated registry for ${components.length} components`)
console.log(`   Index: registry/index.json`)
console.log(`   UI:    registry/ui/*.json`)
