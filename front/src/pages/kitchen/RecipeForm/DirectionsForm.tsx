import {
  Button,
  Field,
  FieldError,
  FieldLabel,
  FieldSet,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from '@gnomo/uikit'
import { MoveDownIcon, MoveUpIcon, PlusIcon, TrashIcon } from 'lucide-react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'

import type { RecipeSchema } from './schema'

export function DirectionsForm() {
  const form = useFormContext<RecipeSchema>()

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: 'directions',
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 justify-center">
        <div className="flex flex-col gap-1">
          {fields.map((field, index) => (
            <Controller
              key={field.id}
              name={`directions.${index}.instruction`}
              control={form.control}
              render={({ field, fieldState }) => (
                <FieldSet>
                  <Field
                    data-invalid={fieldState.invalid}
                    orientation="horizontal"
                    className="flex items-start"
                  >
                    <FieldLabel
                      htmlFor="direction-instruction-input"
                      className="text-xl font-bold w-4 text-center"
                    >
                      {index + 1}.
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        {...field}
                        placeholder="Nova instrução..."
                        id="direction-instruction-input"
                        aria-invalid={fieldState.invalid}
                        autoComplete="off"
                      />

                      <InputGroupAddon align="block-end">
                        <div className="flex-1" />
                        <InputGroupButton
                          variant="ghost"
                          size="icon-sm"
                          tabIndex={-1}
                          onClick={() =>
                            index < fields.length - 1 ? move(index, index + 1) : undefined
                          }
                        >
                          <MoveDownIcon />
                        </InputGroupButton>
                        <InputGroupButton
                          variant="ghost"
                          size="icon-sm"
                          tabIndex={-1}
                          onClick={() => move(index, index - 1)}
                        >
                          <MoveUpIcon />
                        </InputGroupButton>
                        <InputGroupButton
                          variant="ghost"
                          size="icon-sm"
                          tabIndex={-1}
                          onClick={() => remove(index)}
                        >
                          <TrashIcon />
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
                  </Field>
                  <Field className="ml-6">
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                </FieldSet>
              )}
            />
          ))}
        </div>
        <Button
          className="w-full"
          variant="outline"
          size="icon"
          onClick={() => append({ instruction: '' })}
        >
          <PlusIcon />
        </Button>
      </div>
    </div>
  )
}
