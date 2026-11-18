import * as z from 'zod'

export type ZodShape<T extends object> = {
  [K in keyof T]-?: undefined extends T[K]
    ? z.ZodOptional<z.ZodType<Exclude<T[K], undefined>>>
    : z.ZodType<T[K]>
}
