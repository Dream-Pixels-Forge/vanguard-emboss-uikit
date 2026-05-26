# Phase 1: Add forwardRef to Interactive Components

## Components to Convert

### 1. Input (`src/components/ui/input.tsx`)
Current: `export function Input({ className, error, type, ...props }: InputProps)`
Target: `React.forwardRef<HTMLInputElement, InputProps>`
Ref pass to: `<input ref={ref} ...>`

### 2. Textarea (`src/components/ui/textarea.tsx`)
Current: `export function Textarea({ className, error, resizable = false, ...props }: TextareaProps)`
Target: `React.forwardRef<HTMLTextAreaElement, TextareaProps>`
Ref pass to: `<textarea ref={ref} ...>`

### 3. SelectTrigger (`src/components/ui/select.tsx`)
Current: `export function SelectTrigger({ className, error, children, ...props }: SelectTriggerProps)`
Target: `React.forwardRef<HTMLButtonElement, SelectTriggerProps>`
Ref pass to: `<SelectPrimitive.Trigger ref={ref} ...>`

### 4. Switch (`src/components/ui/switch.tsx`)
Current: `export function Switch({ className, error, ...props }: SwitchProps)`
Target: `React.forwardRef<HTMLButtonElement, SwitchProps>`
Ref pass to: `<SwitchPrimitive.Root ref={ref} ...>`

### 5. Checkbox (`src/components/ui/checkbox.tsx`)
Current: `export function Checkbox({ className, error, ...props }: CheckboxProps)`
Target: `React.forwardRef<HTMLButtonElement, CheckboxProps>`
Ref pass to: `<CheckboxPrimitive.Root ref={ref} ...>`

### 6. Radio (`src/components/ui/radio.tsx` - the Radio/RadioGroupItem component)
Current: `export function Radio({ className, error, ...props }: RadioProps)`
Target: `React.forwardRef<HTMLButtonElement, RadioProps>`
Ref pass to: `<RadioGroupPrimitive.Item ref={ref} ...>`

### 7. Slider (`src/components/ui/slider.tsx`)
Current: `export function Slider({ className, error, ...props }: SliderProps)`
Target: `React.forwardRef<HTMLSpanElement, SliderProps>`
Ref pass to: `<SliderPrimitive.Root ref={ref} ...>`

## Pattern Example (from Button.tsx)
```tsx
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ className, error, type, ...props }, ref) {
    return <input ref={ref} type={type} ... />
  }
)
```

## Rules
- Preserve ALL existing props, class names, and behavior
- Add `displayName` after the component (e.g., `Input.displayName = 'Input'`)
- Make sure named exports still work (tests may import { Input })
- Run build + tests after changes
