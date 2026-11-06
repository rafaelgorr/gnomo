import "../../../entities/recipe.tsp";

model CreateRecipeInput is OmitProperties<Recipe, "id" | "ingredients" | "directions">;
model CreateIngredientInput is OmitProperties<Ingredient, "id">;
model CreateRecipeStepInput is OmitProperties<RecipeStep, "id">;

model CreateRecipeRequest {
  recipe: CreateRecipeInput;
  ingredients: CreateIngredientInput[];
  directions: CreateRecipeStepInput[];
}

model CreateRecipeResponse is RecipeOutput;
