import { Button, Item, ItemContent, ItemTitle, Label } from '@gnomo/uikit'
import { useParams } from '@tanstack/react-router'
import { EditIcon } from 'lucide-react'
import { useEffect } from 'react'

import { Page } from '@/components/Page'
import type { Recipe } from '@/domain'
import { useAppDispatch } from '@/store/hooks'

import { RecipeDrawerForm } from '../RecipeForm/RecipeDrawerForm'
import { useConnector } from './connector'

export function Recipe() {
  const { recipeId } = useParams({ from: '/_kitchen/kitchen/recipes/$recipeId' })

  const dispatch = useAppDispatch()
  const { actions, selectors } = useConnector(recipeId)

  useEffect(() => {
    void dispatch(actions.getRecipe({ id: recipeId }))
  }, [dispatch, actions, recipeId])

  const { recipe, fetching } = selectors

  if (!recipe) {
    return null
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
      <div className="absolute bottom-0 right-0 md:relative">
        <RecipeDrawerForm recipe={recipe}>
          <Button variant="outline" size="icon-lg">
            <EditIcon />
          </Button>
        </RecipeDrawerForm>
      </div>
    </Page>
  )
}
