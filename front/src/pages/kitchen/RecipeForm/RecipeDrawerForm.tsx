import {
  Button,
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
  Spinner,
  useIsMobile,
} from '@gnomo/uikit'
import React, { useState } from 'react'

import type { Recipe } from '@/domain'

import { useConnector } from './connector'
import { RecipeForm } from './RecipeForm'

type ExtendedProps = React.ComponentProps<typeof Drawer>

interface RecipeDrawerFormProps extends ExtendedProps {
  children: React.ReactElement
  recipe?: Recipe
}

// const drawerTriggerHandle = DrawerPrimitive.createHandle<{ recipe: Recipe }>()

export function RecipeDrawerForm(props: RecipeDrawerFormProps) {
  const { children, recipe, ...drawerProps } = props

  const isMobile = useIsMobile()
  const { selectors } = useConnector()

  const { creating, updating } = selectors

  const [open, setOpen] = useState(false)

  const loading = creating || updating

  return (
    <Drawer
      {...drawerProps}
      swipeDirection="down"
      open={open}
      onOpenChange={setOpen}
      showSwipeHandle={isMobile}
    >
      <DrawerTrigger render={children} />
      <DrawerContent className="h-dvh max-h-[98vh]">
        <div className="p-4 overflow-auto">
          <RecipeForm id="recipe-form" recipe={recipe} setOpen={setOpen} />
        </div>
        <DrawerFooter>
          <Button type="submit" form="recipe-form" disabled={loading}>
            Salvar
            {loading ? <Spinner data-icon="inline-end" /> : null}
          </Button>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
