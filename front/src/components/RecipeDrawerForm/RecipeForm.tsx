import { cn, Tabs, TabsContent, TabsList, TabsTrigger } from '@gnomo/uikit'
import { zodResolver } from '@hookform/resolvers/zod'
import { omit } from 'lodash-es'
import type React from 'react'
import { useEffect } from 'react'
import { FormProvider, type SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { match } from 'ts-pattern'

import type { Recipe } from '@/domain'
import { useAppDispatch } from '@/store/hooks'

import { useConnector } from './connector'
import { DirectionsForm } from './DirectionsForm'
import { IngredientsForm } from './IngredientsForm'
import { RecipeDataForm } from './RecipeDataForm'
import { type RecipeSchema, recipeSchema } from './schema'

type ExtendedProps = Omit<React.ComponentProps<'form'>, 'onSubmit'>

type RecipeTabItem = {
  type: 'recipe-data' | 'ingredients' | 'directions'
  trigger: string
  content: React.ReactNode
}

const TAB_ITEMS: RecipeTabItem[] = [
  {
    type: 'recipe-data',
    trigger: 'Informações',
    content: <RecipeDataForm />,
  },
  {
    type: 'ingredients',
    trigger: 'Ingredientes',
    content: <IngredientsForm />,
  },
  {
    type: 'directions',
    trigger: 'Modo de preparo',
    content: <DirectionsForm />,
  },
]

interface RecipeFormProps extends ExtendedProps {
  recipe?: Recipe
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

export function RecipeForm(props: RecipeFormProps) {
  const { recipe, id = 'recipe-form', setOpen, ...formProps } = props

  const dispatch = useAppDispatch()
  const { actions } = useConnector()

  const form = useForm({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: '',
      description: '',
      prepTime: '0',
      cookTime: '0',
      ingredients: [{ description: '' }],
      directions: [{ instruction: '' }],
    },
  })

  useEffect(() => {
    form.reset(recipe ?? undefined)
  }, [recipe, form])

  const handleSubmit: SubmitHandler<RecipeSchema> = (values) => {
    const { name, description, cookTime, prepTime } = values
    const action = recipe
      ? actions.updateRecipe({
          id: recipe.id,
          recipe: { name, description, cookTime, prepTime },
          ingredients: values.ingredients.filter((ingredient) => !!ingredient.description),
          directions: values.directions.filter((step) => !!step.instruction),
        })
      : actions.createRecipe({
          recipe: { name, description, cookTime, prepTime },
          ingredients: values.ingredients.filter((ingredient) => !!ingredient.description),
          directions: values.directions.filter((step) => !!step.instruction),
        })

    void dispatch(action)
      .unwrap()
      .then(() => {
        form.reset()
        setOpen?.(false)
      })
  }

  const ingredients = useWatch({ control: form.control, name: 'ingredients' })
  const directions = useWatch({ control: form.control, name: 'directions' })

  const recipeDataErrors = !!Object.values(
    omit(form.formState.errors, ['ingredients', 'directions']),
  ).filter(Boolean).length
  const hasIngredientsErrors = !!form.formState.errors.ingredients?.length
  const hasDirectionsErrors = !!form.formState.errors.directions?.length

  return (
    <FormProvider {...form}>
      <form {...formProps} id={id} onSubmit={form.handleSubmit(handleSubmit)}>
        <Tabs defaultValue={['recipe-data']} className="h-full">
          <TabsList variant="line" className="w-full flex justify-center">
            {TAB_ITEMS.map((item) => {
              const { counter, hasError } = match(item.type)
                .returnType<{ counter?: number; hasError: boolean }>()
                .with('ingredients', () => ({
                  counter: ingredients.length,
                  hasError: hasIngredientsErrors,
                }))
                .with('directions', () => ({
                  counter: directions.length,
                  hasError: hasDirectionsErrors,
                }))
                .otherwise(() => ({ hasError: recipeDataErrors }))
              return (
                <TabsTrigger
                  key={item.type}
                  value={item.type}
                  className={cn('flex gap-2 items-center', hasError ? 'text-destructive' : '')}
                >
                  <p className="text-xs font-bold">
                    {item.trigger}
                    {counter !== undefined ? ` (${counter})` : ''}
                  </p>
                </TabsTrigger>
              )
            })}
          </TabsList>

          {TAB_ITEMS.map((item) => (
            <TabsContent
              key={item.type}
              value={item.type}
              className="my-4 px-4 h-full overflow-auto"
            >
              {item.content}
            </TabsContent>
          ))}
        </Tabs>
      </form>
    </FormProvider>
  )
}
