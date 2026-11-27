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

export function IngredientsForm() {
  const form = useFormContext<RecipeSchema>()

  const { fields, append, remove } = useFieldArray({ control: form.control, name: 'ingredients' })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-end gap-1">
          {fields.map((field, index) => (
            <Controller
              key={field.id}
              name={`ingredients.${index}.description`}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <InputGroup className="h-12">
                    <InputGroupInput
                      {...field}
                      placeholder="Novo ingrediente..."
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        variant="ghost"
                        size="icon-sm"
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
        <Button
          className="self-end"
          variant="outline"
          size="icon"
          onClick={() => append({ description: '' })}
        >
          <PlusIcon />
        </Button>
      </div>
    </div>
  )
}
