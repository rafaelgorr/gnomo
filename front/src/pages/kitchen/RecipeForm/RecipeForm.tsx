import {
  Button,
  ButtonGroup,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  Spinner,
  Textarea,
} from '@gnomo/uikit'
import { zodResolver } from '@hookform/resolvers/zod'
import { TimerIcon } from 'lucide-react'
import type React from 'react'
import { useEffect } from 'react'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'

import type { Recipe } from '@/domain'
import { useAppDispatch } from '@/store/hooks'

import { useConnector } from './connector'
import { type RecipeSchema, recipeSchema } from './schema'

type ExtendedProps = Omit<React.ComponentProps<'form'>, 'onSubmit'>

interface RecipeFormProps extends ExtendedProps {
  recipe?: Recipe
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

export function RecipeForm(props: RecipeFormProps) {
  const { recipe, id = 'recipe-form', setOpen, ...formProps } = props

  const dispatch = useAppDispatch()
  const { actions, selectors } = useConnector()

  const { creating, updating } = selectors

  const form = useForm({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      // id: u,
      name: '',
      prepTime: '0',
      cookTime: '0',
      // description: '',
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
          ingredients: [],
          directions: [],
        })
      : actions.createRecipe({
          recipe: { name, description, cookTime, prepTime },
          ingredients: [],
          directions: [],
        })
    void dispatch(action)
      .unwrap()
      .then(() => setOpen?.(false))
  }

  if (creating || updating) {
    return <Spinner />
  }

  return (
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
        <Field orientation="horizontal">
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
        </Field>
      </FieldGroup>
    </form>
  )
}
