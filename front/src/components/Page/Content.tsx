import { cn, ScrollArea } from '@gnomo/uikit'
import type React from 'react'

interface ContentProps extends React.ComponentProps<'div'> {
  renderLoading?: React.ReactNode
}

export function Content(props: ContentProps) {
  const { children, className, renderLoading, ...divProps } = props
  return (
    <ScrollArea {...divProps} className={cn('pt-2 overflow-auto')}>
      <div className={cn(className)}>{renderLoading ?? children}</div>
    </ScrollArea>
  )
}
