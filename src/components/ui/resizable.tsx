import React from 'react'
import { Group, Panel, Separator } from 'react-resizable-panels'
import { cn } from '../../lib/utils'
import { GripVertical } from 'lucide-react'

export interface ResizablePanelGroupProps extends React.ComponentProps<typeof Group> {}

export function ResizablePanelGroup({ className, orientation = 'horizontal', ...props }: ResizablePanelGroupProps) {
  return (
    <Group
      orientation={orientation}
      className={cn(
        'flex h-full w-full',
        orientation === 'vertical' ? 'flex-col' : 'flex-row',
        className
      )}
      {...props}
    />
  )
}

export interface ResizablePanelProps extends React.ComponentProps<typeof Panel> {}

export function ResizablePanel({ ...props }: ResizablePanelProps) {
  return <Panel {...props} />
}

export interface ResizableHandleProps extends React.ComponentProps<typeof Separator> {
  withHandle?: boolean
}

export function ResizableHandle({ className, withHandle, ...props }: ResizableHandleProps) {
  return (
    <Separator
      className={cn(
        'relative flex w-px items-center justify-center',
        'bg-emboss-shadow-light/30 dark:bg-emboss-shadow-dark/30',
        'after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2',
        'data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full',
        'data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1',
        'data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2',
        'data-[panel-group-direction=vertical]:after:translate-x-0',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm bg-emboss-bg-light dark:bg-emboss-bg-dark">
          <GripVertical className="h-2.5 w-2.5" />
        </div>
      )}
    </Separator>
  )
}
