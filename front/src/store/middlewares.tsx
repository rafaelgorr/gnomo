import { toast } from '@gnomo/uikit'
import type { Action, Middleware, PayloadAction, ThunkDispatch } from '@reduxjs/toolkit'
import type { AxiosError } from 'axios'

import GnomeMessedUp from '@/assets/gnome_icon_messed_up.svg?react'

import type { StoreState } from '.'

const pendingLogParameters: Record<string, Parameters<typeof console.log>> = {}

export const printMiddleware: Middleware =
  () => (next: ThunkDispatch<unknown, unknown, Action>) => (actn) => {
    const action = actn as PayloadAction<unknown, string, { arg: Record<string, unknown> | string }>
    if (action.type.includes('/pending')) {
      // remove async action type: "/pending", "/fulfilled", "/rejected"
      const actionType = action.type.split('/').slice(0, -1).join('/')
      pendingLogParameters[actionType] = [
        `%c ${action.type.substring(0, action.type.lastIndexOf('/'))} %c`,
        `color: white; font-weight: bolder; background: blue`,
        'font-weight: bolder; font-style: italic;',
        action.meta.arg || '',
      ]
    }

    if (action.type.includes('/fulfilled')) {
      // remove async action type: "/pending", "/fulfilled", "/rejected"
      const actionType = action.type.split('/').slice(0, -1).join('/')
      if (pendingLogParameters[actionType]) {
        console.log(...(pendingLogParameters[actionType] as unknown[]))
        console.log(
          `%c ${action.type.substring(0, action.type.lastIndexOf('/'))} %c`,
          `color: white; font-weight: bolder; background: green`,
          'font-weight: bolder; font-style: italic;',
          action.payload &&
            typeof action.payload === 'object' &&
            Object.keys(action.payload).length !== 0
            ? action.payload
            : '',
        )
        delete pendingLogParameters[actionType]
      }
    }
    return next(action)
  }

export const errorMiddleware: Middleware =
  () => (next: ThunkDispatch<unknown, unknown, Action>) => (actn) => {
    const action = actn as PayloadAction<unknown, string, { arg: Record<string, unknown> | string }>

    if (action.type.includes('/rejected')) {
      console.log(
        `%c ${action.type.substring(0, action.type.lastIndexOf('/'))} %c`,
        `color: white; font-weight: bolder; background: red`,
        'font-weight: bolder; font-style: italic;',
        action.payload &&
          typeof action.payload === 'object' &&
          Object.keys(action.payload).length !== 0
          ? action.payload
          : '',
      )
    }
    return next(action)
  }

export const errorToastMiddleware: Middleware =
  () => (next: ThunkDispatch<StoreState, unknown, Action>) => (actn) => {
    const action = actn as PayloadAction<AxiosError<{ error: string } | string>>

    if (action.type.includes('/rejected')) {
      const responseData = action.payload.response?.data
      const error = typeof responseData === 'object' ? responseData.error : responseData

      toast.add({
        type: 'error',
        title: (
          <div className="flex gap-2 items-center justify-center">
            <div className="flex-1">
              <p className="flex-1">Problemas no servidor</p>
              <p className="text-accenttext-sm text-muted-foreground">
                {error ?? 'Erro no servidor do gnomo'}
              </p>
            </div>

            <GnomeMessedUp className="size-10" />
          </div>
        ),
        priority: 'high',
        // positionerProps: {
        //   className: 'absolute top-0',
        // },
      })
    }
    return next(action)
  }
