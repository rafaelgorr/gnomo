import { Button, ButtonGroup, Field, FieldError, FieldLabel, Input, Textarea } from '@gnomo/uikit'
import { TimerIcon } from 'lucide-react'
import { Controller, useFormContext } from 'react-hook-form'

import type { RecipeSchema } from './schema'

export function RecipeDataForm() {
  const form = useFormContext<RecipeSchema>()

  return (
    <div className="flex flex-col gap-2">
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
    </div>
  )
}
