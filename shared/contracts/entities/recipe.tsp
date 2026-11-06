model RecipeStep {
  id: string;
  index: int32;
  instruction: string;
}

model Ingredient {
  id: string;
  description: string;
}

model Recipe {
  id: string;
  name: string;
  description?: string;
  prep_time: int32;
  cook_time: int32;
  ingredients: Ingredient[];
  directions: RecipeStep[];
  created_at: utcDateTime;
}
