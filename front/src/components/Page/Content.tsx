import { cn } from '@gnomo/uikit'
import type React from 'react'

type ContentProps = React.ComponentProps<'div'>

export function Content(props: ContentProps) {
  const { children, className, ...divProps } = props
  return (
    <div {...divProps} className={cn('flex-[1_1_0%] overflow-auto')}>
      <div className={className}>{children}</div>
    </div>
  )
}
