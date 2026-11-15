use axum::{
    Json,
    extract::{Path, State},
};
use uuid::Uuid;

use crate::{
    app_error::AppError,
    app_state::AppState,
    contracts::kitchen::models::{GetRecipeResponse, GetRecipesResponse, RecipeOutput},
    modules::recipe::dto::response::RecipeAggragate,
};

pub async fn get_recipes(
    State(state): State<AppState>,
) -> Result<Json<GetRecipesResponse>, AppError> {
    let recipes = state.recipe_service.get_recipes().await?;

    let response = recipes
        .into_iter()
        .map(|get_db_recipe| {
            RecipeOutput::from(RecipeAggragate {
                recipe: get_db_recipe.recipe,
                ingredients: get_db_recipe.ingredients,
                directions: get_db_recipe.directions,
            })
        })
        .collect();

    Ok(Json(GetRecipesResponse { recipes: response }))
}

pub async fn get_recipe(
    State(state): State<AppState>,
    Path(recipe_id): Path<Uuid>,
) -> Result<Json<GetRecipeResponse>, AppError> {
    let (recipe, ingredients, directions) =
        match state.recipe_service.get_recipe_by_id(recipe_id).await {
            Ok(recipe) => recipe,
            Err(error) => return Err(error),
        };

    let recipe_response = RecipeOutput::from(RecipeAggragate {
        recipe,
        ingredients,
        directions,
    });

    Ok(Json(GetRecipeResponse {
        recipe: recipe_response,
    }))
}
