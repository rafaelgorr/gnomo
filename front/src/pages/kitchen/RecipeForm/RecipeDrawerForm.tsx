import {
  Button,
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@gnomo/uikit'
import React, { useState } from 'react'

import type { Recipe } from '@/domain'

import { RecipeForm } from './RecipeForm'

type ExtendedProps = React.ComponentProps<typeof Drawer>

interface RecipeDrawerFormProps extends ExtendedProps {
  children: React.ReactElement
  recipe?: Recipe
}

// const drawerTriggerHandle = DrawerPrimitive.createHandle<{ recipe: Recipe }>()

export function RecipeDrawerForm(props: RecipeDrawerFormProps) {
  const { children, recipe, ...drawerProps } = props
  const [open, setOpen] = useState(false)
  return (
    <Drawer {...drawerProps} swipeDirection="down" open={open} onOpenChange={setOpen}>
      <DrawerTrigger render={children} />
      <DrawerContent className="h-dvh">
        <DrawerHeader>
          <DrawerTitle>Adicionar uma receita nova</DrawerTitle>
        </DrawerHeader>
        <div className="p-4">
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
      </DrawerContent>
    </Drawer>
  )
}
