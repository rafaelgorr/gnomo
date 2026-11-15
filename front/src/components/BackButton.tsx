import { Button, cn } from '@gnomo/uikit'
import { ChevronLeftIcon } from 'lucide-react'
import type React from 'react'

type BackButtonProps = React.ComponentProps<typeof Button>

export function BackButton(props: BackButtonProps) {
  const { children, className, ...buttonProps } = props
  return (
    <Button size="icon" variant="ghost" className={cn('z-10', className)} {...buttonProps}>
      {children ?? <ChevronLeftIcon />}
    </Button>
  )
}
