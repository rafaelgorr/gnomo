import "@typespec/http";
import "./get.tsp";
import "./post.tsp";

using Http;

namespace Kitchen;

@route("/recipes")
interface Recipes {
  @get
  list(): GetRecipesResponse;

  // @get
  // @route("/{id}")
  // get(@path id: int32): RecipeResponse;

  @post
  create(@body request: CreateRecipeRequest): CreateRecipeResponse;

  // @put
  // @route("/{id}")
  // update(@path id: int32, @body request: UpdateRecipeRequest): RecipeResponse;

  // @delete
  // @route("/{id}")
  // delete(@path id: int32): void;
}
