import { useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '../../lib/utils'
import { getEmbossBackground, getEmbossShadow } from '../../lib/tailwind-utils'
import { Popover, PopoverTrigger, PopoverContent } from './popover'
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from './command'

export type ComboboxItem = {
  value: string
  label: string
}

export type ComboboxProps = {
  items: ComboboxItem[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  disabled?: boolean
  className?: string
}

export function Combobox({
  items,
  value,
  onValueChange,
  placeholder = 'Select...',
  searchPlaceholder = 'Search...',
  emptyText = 'No results found.',
  disabled,
  className,
}: ComboboxProps) {
  const [open, setOpen] = useState(false)

  const selectedLabel = items.find((item) => item.value === value)?.label

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          disabled={disabled}
          role="combobox"
          aria-expanded={open}
          className={cn(
            getEmbossBackground(),
            getEmbossShadow('in', 'small'),
            'flex h-10 w-full items-center justify-between rounded-lg px-3 py-2 text-sm',
            'border border-transparent',
            'focus:outline-none focus:ring-2 focus:ring-emboss-accent-blue',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-all hover:scale-[1.02] active:scale-[0.98]',
            !value && 'text-muted-foreground',
            className
          )}
        >
          {selectedLabel ?? placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    onValueChange?.(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === item.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
