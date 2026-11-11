import "../../../entities/recipe.tsp";

model RecipeOutput is Recipe;

model GetRecipesResponse {
  recipes: RecipeOutput[];
}

model GetRecipeResponse {
  recipe: RecipeOutput;
}
