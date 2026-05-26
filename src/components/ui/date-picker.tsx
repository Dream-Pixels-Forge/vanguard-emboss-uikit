import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '../../lib/utils'
import { getEmbossBackground, getEmbossShadow } from '../../lib/tailwind-utils'
import { Popover, PopoverTrigger, PopoverContent } from './popover'
import { Calendar } from './calendar'

export type DatePickerProps = {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function DatePicker({ date, onDateChange, placeholder = 'Pick a date', disabled, className }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          disabled={disabled}
          className={cn(
            getEmbossBackground(),
            getEmbossShadow('in', 'small'),
            'flex h-10 w-full items-center justify-between rounded-lg px-3 py-2 text-sm',
            'border border-transparent',
            'focus:outline-none focus:ring-2 focus:ring-emboss-accent-blue',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-all hover:scale-[1.02] active:scale-[0.98]',
            !date && 'text-muted-foreground',
            className
          )}
        >
          {date ? format(date, 'PPP') : <span>{placeholder}</span>}
          <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
        />
      </PopoverContent>
    </Popover>
  )
}
