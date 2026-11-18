import { cn } from '@gnomo/uikit'
import type React from 'react'
import type { MergeExclusive } from 'type-fest'

import { GnomeLoading, type GnomeLoadingProps } from '../GnomeLoading'
import { Content } from './Content'
import { Title } from './Title'

type LoadingProps = {
  loading: boolean
  loadingGnome: GnomeLoadingProps['gnome']
}

type BaseProps = React.ComponentProps<'div'>

type PageProps = MergeExclusive<BaseProps & LoadingProps, BaseProps & { loading?: undefined }>

export function Page(props: PageProps) {
  const { children, className, loading, loadingGnome, ...divProps } = props

  return (
    <div {...divProps} className={cn('flex flex-col h-screen max-h-full relative', className)}>
      {loading ? <GnomeLoading gnome={loadingGnome} /> : children}
    </div>
  )
}

Page.Title = Title
Page.Content = Content
