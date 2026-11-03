use std::collections::HashMap;

use axum::{Json, extract::State};
use uuid::Uuid;
use validator::Validate;

use crate::{
    app_error::AppError,
    app_state::AppState,
    models::{db_ingredient::DbIngredient, db_recipe_step::DbRecipeStep},
    modules::recipe::dto::response::{RecipeAggragate, RecipeDto},
};

use super::contract::CreateRecipeRequest;

pub async fn get_recipes(State(state): State<AppState>) -> Result<Json<Vec<RecipeDto>>, AppError> {
    let recipes = state.recipe_service.get_recipes().await;
    let recipe_ids = recipes.iter().map(|recipe| recipe.id).collect();

    let future_ingredients = state.recipe_service.get_ingredients_by_recipes(&recipe_ids);

    let ingredients = match future_ingredients.await {
        Ok(result) => result,
        Err(error) => return Err(error),
    };

    let mut ingredients_by_recipe_id: HashMap<Uuid, Vec<DbIngredient>> =
        ingredients.into_iter().fold(
            HashMap::new(),
            |mut ingredients_by_recipe_id, ingredient| {
                ingredients_by_recipe_id
                    .entry(ingredient.recipe_id)
                    .or_default()
                    .push(ingredient);

                ingredients_by_recipe_id
            },
        );

    let future_directions = state.recipe_service.get_directions_by_recipes(&recipe_ids);

    let directions = match future_directions.await {
        Ok(result) => result,
        Err(error) => return Err(error),
    };

    let mut directions_by_recipe_id: HashMap<Uuid, Vec<DbRecipeStep>> = directions
        .into_iter()
        .fold(HashMap::new(), |mut directions_by_recipe_id, ingredient| {
            directions_by_recipe_id
                .entry(ingredient.recipe_id)
                .or_default()
                .push(ingredient);

            directions_by_recipe_id
        });

    let response = recipes
        .into_iter()
        .map(|recipe| {
            let ingredients = ingredients_by_recipe_id
                .remove(&recipe.id)
                .unwrap_or_default();

            let directions = directions_by_recipe_id
                .remove(&recipe.id)
                .unwrap_or_default();

            RecipeDto::from(RecipeAggragate {
                recipe,
                ingredients,
                directions,
            })
        })
        .collect();

    Ok(Json(response))
}

pub async fn create_recipe(
    State(state): State<AppState>,
    Json(request): Json<CreateRecipeRequest>,
) -> Result<Json<RecipeDto>, AppError> {
    match request.validate() {
        Ok(_) => {
            let CreateRecipeRequest {
                recipe,
                ingredients,
                directions,
            } = request;

            let (recipe, ingredients, directions) = state
                .recipe_service
                .create_recipe((recipe, ingredients, directions))
                .await?;

            let response = RecipeDto::from(RecipeAggragate {
                recipe,
                ingredients,
                directions,
            });

            Ok(Json(response))
        }
        Err(error) => Err(AppError::ValidationError(error.to_string())),
    }
}
