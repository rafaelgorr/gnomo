import {
  Button,
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
  Spinner,
  useIsMobile,
} from '@gnomo/uikit'
import { useParams } from '@tanstack/react-router'
import { EditIcon, PlusIcon } from 'lucide-react'
import React, { useState } from 'react'

import { useConnector } from './connector'
import { RecipeForm } from './RecipeForm'

type RecipeDrawerFormProps = React.ComponentProps<typeof Drawer>

// const drawerTriggerHandle = DrawerPrimitive.createHandle<{ recipe: Recipe }>()

export function RecipeDrawerForm(props: RecipeDrawerFormProps) {
  const { children, ...drawerProps } = props

  const recipeId = useParams({
    strict: false,
    select: (params) => params.recipeId,
  })

  const isMobile = useIsMobile()
  const { selectors } = useConnector(recipeId)

  const { creating, updating, recipe } = selectors

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
      <DrawerTrigger
        render={
          children ? (
            <>{children}</>
          ) : (
            <Button variant="outline" size="icon-lg">
              {recipe ? <EditIcon /> : <PlusIcon />}
            </Button>
          )
        }
      />
      <DrawerContent className="h-[98vh] flex max-h-[98vh]">
        <div className="flex-1 overflow-hidden">
          <RecipeForm id="recipe-form" recipe={recipe} setOpen={setOpen} className="h-full" />
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
