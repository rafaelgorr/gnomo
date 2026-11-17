import "../../../entities/recipe.tsp";

model UpdateRecipeInput is OmitProperties<
  Recipe,
  "id" | "ingredients" | "directions" | "created_at"
>;
model UpdateIngredientInput is OmitProperties<Ingredient, "id">;
model UpdateRecipeStepInput is OmitProperties<RecipeStep, "id">;

model UpdateRecipeRequest {
  recipe: UpdateRecipeInput;
  ingredients: UpdateIngredientInput[];
  directions: UpdateRecipeStepInput[];
}

model UpdateRecipeResponse {
  recipe: RecipeOutput;
}
