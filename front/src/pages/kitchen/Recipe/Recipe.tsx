import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Item,
  ItemContent,
  ItemTitle,
  Label,
  Spinner,
  toast,
} from '@gnomo/uikit'
import { useNavigate, useParams } from '@tanstack/react-router'
import { EditIcon, TrashIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import GnomeMessedUp from '@/assets/gnome_icon_messed_up.svg?react'
import { Page } from '@/components/Page'
import type { Recipe } from '@/domain'
import { useAppDispatch } from '@/store/hooks'

import { RecipeDrawerForm } from '../RecipeForm/RecipeDrawerForm'
import { useConnector } from './connector'

export function Recipe() {
  const navigate = useNavigate({ from: '/kitchen/recipes/$recipeId' })
  const { recipeId } = useParams({ from: '/_kitchen/kitchen/recipes/$recipeId' })

  const dispatch = useAppDispatch()
  const { actions, selectors } = useConnector(recipeId)

  const [deleteOpen, setDeleteOpen] = useState(false)

  useEffect(() => {
    void dispatch(actions.getRecipe({ id: recipeId }))
  }, [dispatch, actions, recipeId])

  const { recipe, fetching, deleting } = selectors

  if (!recipe) {
    return null
  }

  const handleDeleteRecipe = () => {
    void dispatch(actions.deleteRecipe({ id: recipe.id })).then(() => {
      toast.add({
        type: 'success',
        title: (
          <div className="flex gap-2 items-center">
            <p className="">Receita removida com sucesso!</p>
            <GnomeMessedUp className="size-8 flex-1" />
          </div>
        ),
      })
      setDeleteOpen(false)
      void navigate({ to: '/kitchen/recipes' })
    })
  }

  return (
    <Page loading={fetching}>
      <Page.Title>{recipe.name}</Page.Title>
      <Page.Content className="flex flex-col gap-2">
        <p>{recipe.description}</p>
        <div className="flex">
          <div className="flex-1">
            <p className="font-bold">Tempo de preparo:</p>
            {recipe.prepTime} minutos
          </div>
          <div className="flex-1">
            <p className="font-bold">Tempo de cozimento:</p>
            {recipe.cookTime} minutos
          </div>
        </div>
        <Label htmlFor="ingredients-list" className="font-bold text-lg">
          Ingredientes
        </Label>
        <div id="ingredients-list" className="flex flex-col gap-2">
          {recipe.ingredients.map((ingredient) => (
            <Item key={ingredient.id} variant="outline">
              <ItemContent>
                <ItemTitle>{ingredient.description}</ItemTitle>
              </ItemContent>
            </Item>
          ))}
        </div>
        <Label htmlFor="directions-list" className="font-bold text-lg">
          Modo de preparo
        </Label>
        <div id="directions-list" className="flex flex-col gap-2">
          {recipe.directions.map((step) => (
            <Item key={step.id} variant="outline" className="h-20 flex items-start">
              <ItemContent>
                <ItemTitle>{step.instruction}</ItemTitle>
              </ItemContent>
            </Item>
          ))}
        </div>
      </Page.Content>
      <div className="absolute flex flex-col gap-1 bottom-0 right-0 md:relative">
        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <AlertDialogTrigger
            render={
              <Button variant="outline" size="icon-lg">
                <TrashIcon />
              </Button>
            }
          />
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogTitle>Remover receita</AlertDialogTitle>
              <AlertDialogDescription>
                Você realmente quer remover a receita "<b>{recipe.name}</b>"?
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel variant="outline">Cancelar</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                disabled={deleting}
                onClick={handleDeleteRecipe}
              >
                Sim, remova
                {deleting ? <Spinner data-icon="inline-end" /> : null}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <RecipeDrawerForm recipe={recipe}>
          <Button variant="outline" size="icon-lg">
            <EditIcon />
          </Button>
        </RecipeDrawerForm>
      </div>
    </Page>
  )
}
