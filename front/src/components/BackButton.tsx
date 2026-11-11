import { Button } from '@gnomo/uikit'
import { ChevronLeftIcon } from 'lucide-react'
import type React from 'react'

type BackButtonProps = React.ComponentProps<typeof Button>

export function BackButton(props: BackButtonProps) {
  const { children, ...buttonProps } = props
  return (
    <Button size="icon" variant="ghost" {...buttonProps}>
      {children ?? <ChevronLeftIcon />}
    </Button>
  )
}
