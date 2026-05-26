#!/usr/bin/env node
/**
 * Splits the monolithic components.test.tsx into per-component test files.
 *
 * Run: pnpm tsx scripts/split-tests.ts
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { resolve } from 'path'
import { execSync } from 'child_process'

const MONOLITH = resolve('src/components/ui/components.test.tsx')
const OUT_DIR = resolve('src/components/ui')
const SETUP_FILE = resolve('src/test-setup.ts')

// Read the monolithic file
const content = readFileSync(MONOLITH, 'utf-8')
const lines = content.split('\n')

// Extract the beforeAll global mocks (lines 5-32)
const beforeAllLines = lines.slice(4, 32).join('\n')

// Component name to file name mapping
const nameToFile: Record<string, string> = {}
// Collect all describe blocks
const describes: Array<{ name: string; startLine: number; endLine: number; lines: string[] }> = []

// Track nested describe blocks with brace counting
let braceCount = 0
let currentDescribe: { name: string; startLine: number; startContentLine: number } | null = null
let started = false

// Regex to match describe('Name', ...)
const describeRegex = /^\s*describe\('([^']+)',\s*\(\)\s*=>\s*\{$/
const endBraceRegex = /^\s*\}\s*\)?\s*$/

lines.forEach((line, i) => {
  const match = line.match(describeRegex)
  if (match) {
    currentDescribe = {
      name: match[1],
      startLine: i,
      startContentLine: i + 1, // content starts after the describe line
    }
    braceCount = 0
    started = true
  }

  if (currentDescribe && started) {
    // Count braces
    for (const ch of line) {
      if (ch === '{') braceCount++
      if (ch === '}') braceCount--
    }

    // Check if this is the end - when we return to 0 and are past the describe line
    if (braceCount <= 0 && i > currentDescribe.startLine) {
      const name = currentDescribe.name
      const blockLines = lines.slice(currentDescribe.startContentLine, i)
      // Filter out the empty trailing line if it's just whitespace
      const trimmed = blockLines.filter(l => l.trim()).length > 0 ? blockLines : blockLines.slice(0, -1)
      describes.push({
        name,
        startLine: currentDescribe.startLine,
        endLine: i,
        lines: trimmed,
      })
      currentDescribe = null
      started = false
    }
  }
})

console.log(`Found ${describes.length} describe blocks`)

// Generate the setup file with beforeAll mocks
const setupContent = `import { vi, beforeAll } from 'vitest'

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
`

writeFileSync(SETUP_FILE, setupContent)
console.log(`Created setup file: ${SETUP_FILE}`)

// Component name to file name mapping (kebab-case)
function componentNameToFile(name: string): string {
  // Handle special cases
  const special: Record<string, string> = {
    'ToastProvider': 'toast',
    'EmbossBox': 'emboss-box',
    'AspectRatio': 'aspect-ratio',
    'ToggleGroup': 'toggle',
    'InputOTP': 'input-otp',
    'ProgressCircle': 'progress-circle',
    'AlertDialog': 'alert-dialog',
    'ScrollArea': 'scroll-area',
    'HoverCard': 'hover-card',
    'TiltCard': 'tilt-card',
    'DropdownMenu': 'dropdown-menu',
    'ContextMenu': 'context-menu',
    'NavigationMenu': 'navigation-menu',
    'NativeSelect': 'native-select',
    'DatePicker': 'date-picker',
    'DataTable': 'data-table',
    'ButtonGroup': 'button-group',
    'InputGroup': 'input-group',
    'Sidebar': 'sidebar',
    'Direction': 'direction',
    'Carousel': 'carousel',
    'Resizable': 'resizable',
    'Menubar': 'menubar',
    'Collapsible': 'collapsible',
    'Accordion': 'accordion',
    'Pagination': 'pagination',
    'Popover': 'popover',
    'Separator': 'separator',
    'Breadcrumb': 'breadcrumb',
    'Combobox': 'combobox',
    'Sheet': 'sheet',
    'Toggle': 'toggle',
    'Table': 'table',
    'Chart': 'chart',
    'Calendar': 'calendar',
    'Form': 'form',
    'Drawer': 'drawer',
    'Item': 'item',
    'Tooltip': 'tooltip',
    'Dialog': 'dialog',
    'Tabs': 'tabs',
    'Card': 'card',
    'Alert': 'alert',
    'Text': 'text',
    'Box': 'box',
    'Badge': 'badge',
    'Input': 'input',
    'Label': 'label',
    'Checkbox': 'checkbox',
    'Radio': 'radio',
    'Switch': 'switch',
    'Slider': 'slider',
    'Select': 'select',
    'Avatar': 'avatar',
    'Skeleton': 'skeleton',
    'Button': 'button',
    'Spinner': 'spinner',
    'Empty': 'empty',
    'Field': 'field',
    'Command': 'command',
    'Textarea': 'textarea',
    'Knob': 'knob',
    'Progress': 'progress',
    'Kbd': 'kbd',
    'Typography': 'typography',
    'Menubar': 'menubar',
  }
  return special[name] ?? name.toLowerCase()
}

// Find what components a describe block references via UI.*
function findUIReferences(blockLines: string[]): Set<string> {
  const refs = new Set<string>()
  for (const line of blockLines) {
    const regex = /UI\.(\w+)/g
    let m
    while ((m = regex.exec(line)) !== null) {
      refs.add(m[1])
    }
  }
  return refs
}

// Write individual test files
const componentImportMap: Record<string, string[]> = {}
for (const desc of describes) {
  const fileName = componentNameToFile(desc.name)
  const importPath = `./${fileName}`

  // Find UI.* references
  const uiRefs = findUIReferences(desc.lines)

  // Build import statements
  let importLines = `import { render, screen } from '@testing-library/react'\n`
  importLines += `import userEvent from '@testing-library/user-event'\n`
  importLines += `import { describe, it, expect, vi } from 'vitest'\n\n`

  // Add component imports
  if (uiRefs.size > 0) {
    const sorted = [...uiRefs].sort()
    importLines += `import { ${sorted.join(', ')} } from '${importPath}'\n`
  } else {
    importLines += `import { ${desc.name} } from '${importPath}'\n`
  }

  // Guard: check if there's no content (empty describe block)
  const contentLines = desc.lines.filter(l => l.trim() !== '')
  if (contentLines.length === 0) {
    console.log(`  ⚠ Skipping empty describe block: ${desc.name}`)
    continue
  }

  const fileContent = `${importLines}

${beforeAllLines}

describe('${desc.name}', () => {
${contentLines.join('\n')}
})
`

  const filePath = resolve(OUT_DIR, `${fileName}.test.tsx`)

  // Skip if the file already exists (e.g., toast.test.tsx already exists)
  if (existsSync(filePath)) {
    console.log(`  ⏭ Skipping existing: ${fileName}.test.tsx`)
    continue
  }

  writeFileSync(filePath, fileContent)
  console.log(`  ✓ Created: ${fileName}.test.tsx (${desc.name}, ${contentLines.length} lines)`)
  componentImportMap[desc.name] = [...uiRefs]
}

console.log(`\nDone! Created test files for ${Object.keys(componentImportMap).length} components.`)
console.log(`\nNext steps:`)
console.log(`1. Update vitest.config.ts to add 'src/test-setup.ts' as a setup file`)
console.log(`2. Optionally remove src/components/ui/components.test.tsx`)
console.log(`3. Run 'pnpm test' to verify all tests pass`)
