import {
  Button,
  ButtonGroup,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  Textarea,
} from '@gnomo/uikit'
import { zodResolver } from '@hookform/resolvers/zod'
import { TimerIcon } from 'lucide-react'
import type React from 'react'
import { useEffect } from 'react'
import { Controller, FormProvider, type SubmitHandler, useForm } from 'react-hook-form'

import type { Recipe } from '@/domain'
import { useAppDispatch } from '@/store/hooks'

import { useConnector } from './connector'
import { DirectionsForm } from './DirectionsForm'
import { IngredientsArrayForm } from './IngredientsForm'
import { type RecipeSchema, recipeSchema } from './schema'

type ExtendedProps = Omit<React.ComponentProps<'form'>, 'onSubmit'>

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

  return (
    <FormProvider {...form}>
      <form {...formProps} id={id} onSubmit={form.handleSubmit(handleSubmit)}>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="recipe-name">Nome</FieldLabel>
                <Input
                  {...field}
                  id="recipe-name"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="recipe-description">Descrição</FieldLabel>
                <Textarea
                  {...field}
                  id="recipe-description"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <div className="grid grid-cols-2 gap-2">
            <Controller
              name="prepTime"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="recipe-prep-time">Tempo de preparo</FieldLabel>
                  <ButtonGroup>
                    <Button variant="outline" size="icon" tabIndex={-1}>
                      <TimerIcon />
                    </Button>
                    <Input
                      {...field}
                      id="recipe-prep-time"
                      aria-invalid={fieldState.invalid}
                      className="text-center"
                      autoComplete="off"
                      type="number"
                    />
                    <Button variant="outline" tabIndex={-1}>
                      min
                    </Button>
                  </ButtonGroup>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="cookTime"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="recipe-cook-time">Tempo de cozimento</FieldLabel>
                  <ButtonGroup>
                    <Button variant="outline" size="icon" tabIndex={-1}>
                      <TimerIcon />
                    </Button>
                    <Input
                      {...field}
                      id="recipe-cook-time"
                      aria-invalid={fieldState.invalid}
                      className="text-center"
                      type="number"
                      autoComplete="off"
                    />
                    <Button variant="outline" tabIndex={-1}>
                      min
                    </Button>
                  </ButtonGroup>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>

          <div className="flex flex-col gap-6">
            <IngredientsArrayForm />
            <DirectionsForm />
          </div>
        </FieldGroup>
      </form>
    </FormProvider>
  )
}
