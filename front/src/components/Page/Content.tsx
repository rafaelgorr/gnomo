import { cn } from '@gnomo/uikit'
import type React from 'react'

interface ContentProps extends React.ComponentProps<'div'> {
  renderLoading?: React.ReactNode
}

export function Content(props: ContentProps) {
  const { children, className, renderLoading, ...divProps } = props
  return (
    <div {...divProps} className={cn('flex-[1_1_0%] pt-2 overflow-auto')}>
      <div className={className}>{renderLoading ?? children}</div>
    </div>
  )
}
