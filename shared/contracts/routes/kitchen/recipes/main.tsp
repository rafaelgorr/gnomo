import "@typespec/http";
import "./get.tsp";
import "./post.tsp";
import "./put.tsp";

using Http;

namespace Kitchen;

@route("/api/kitchen/recipes")
interface Recipes {
  @get
  list(): GetRecipesResponse;

  @get
  @route("/{id}")
  get(@path id: string): GetRecipeResponse;

  @post
  create(@body request: CreateRecipeRequest): CreateRecipeResponse;

  @put
  @route("/{id}")
  update(@path id: string, @body request: UpdateRecipeRequest): UpdateRecipeResponse;

  @delete
  @route("/{id}")
  delete(@path id: string): void;
}
