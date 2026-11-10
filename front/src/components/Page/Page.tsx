import { cn } from '@gnomo/uikit'
import type React from 'react'

import { Content } from './Content'
import { Title } from './Title'

type PageProps = React.ComponentProps<'div'> & {
  backgroundPath?: string
}

export function Page(props: PageProps) {
  const { children, className, backgroundPath, ...divProps } = props

  return (
    <div
      {...divProps}
      className={cn('flex flex-col h-screen max-h-full pt-10 relative', className)}
    >
      {backgroundPath ? (
        <img
          src={backgroundPath}
          className="absolute opacity-25 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
        />
      ) : null}
      {children}
    </div>
  )
}

Page.Title = Title
Page.Content = Content
