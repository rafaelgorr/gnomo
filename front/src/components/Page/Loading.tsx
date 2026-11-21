import { Spinner } from '@gnomo/uikit'
import type React from 'react'

type LoadingProps = {
  render?: React.ReactElement
}

export function Loading(props: LoadingProps) {
  const { render = <Spinner /> } = props
  return render
}
