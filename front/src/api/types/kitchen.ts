import type { paths } from '../generated/contracts/kitchen'

export type GetRecipesResponse =
  paths['/api/kitchen/recipes']['get']['responses']['200']['content']['application/json']
