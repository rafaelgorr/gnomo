import {
  Button,
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
  useIsMobile,
} from '@gnomo/uikit'
import React, { useState } from 'react'

import { GnomeLoading } from '@/components/GnomeLoading'
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

  return (
    <Drawer
      {...drawerProps}
      swipeDirection="down"
      open={open}
      onOpenChange={setOpen}
      showSwipeHandle={isMobile}
    >
      <DrawerTrigger render={children} />

      <DrawerContent className="h-dvh">
        {creating || updating ? (
          <div className="w-full h-full flex items-center justify-center">
            <GnomeLoading gnome="chef" />
          </div>
        ) : (
          <>
            <div className="p-4 overflow-auto">
              <RecipeForm id="recipe-form" recipe={recipe} setOpen={setOpen} />
            </div>
            <DrawerFooter>
              <Button type="submit" form="recipe-form">
                Save
              </Button>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  )
}
