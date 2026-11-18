import {
  Button,
  Field,
  FieldError,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@gnomo/uikit'
import { PlusIcon, TrashIcon } from 'lucide-react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'

import type { RecipeSchema } from './schema'

export function IngredientsArrayForm() {
  const form = useFormContext<RecipeSchema>()

  const { fields, append, remove } = useFieldArray({ control: form.control, name: 'ingredients' })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 justify-between">
        <p className="text-lg font-bold">Ingredientes</p>
        <Button variant="outline" size="icon-sm" onClick={() => append({ description: '' })}>
          <PlusIcon />
        </Button>
      </div>
      <div className="flex flex-col gap-1">
        {fields.map((field, index) => (
          <Controller
            key={field.id}
            name={`ingredients.${index}.description`}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    placeholder="Novo ingrediente..."
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      // size="icon-lg"
                      variant="ghost"
                      size="icon-sm"
                      tabIndex={-1}
                      onClick={() => remove(index)}
                    >
                      <TrashIcon />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        ))}
      </div>
    </div>
  )
}
