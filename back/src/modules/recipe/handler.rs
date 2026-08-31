use std::collections::HashMap;

use axum::{Json, extract::State};
use serde::{Deserialize, Serialize};
use uuid::Uuid;
use validator::Validate;

use crate::{
    app_error::AppError,
    app_state::AppState,
    models::db_ingredient::DbIngredient,
    modules::recipe::dto::{
        create::{CreateIngredientDto, CreateRecipeDto},
        response::{RecipeAggragate, RecipeDto},
    },
};

pub async fn get_recipes(State(state): State<AppState>) -> Result<Json<Vec<RecipeDto>>, AppError> {
    let recipes = state.recipe_service.get_recipes().await;
    let recipe_ids = recipes.iter().map(|recipe| recipe.id).collect();

    let future_ingredients = state.recipe_service.get_ingredients_by_recipes(recipe_ids);

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

    let response = recipes
        .into_iter()
        .map(|recipe| {
            let ingredients = ingredients_by_recipe_id
                .remove(&recipe.id)
                .unwrap_or_default();

            RecipeDto::from(RecipeAggragate {
                recipe,
                ingredients,
            })
        })
        .collect();

    Ok(Json(response))
}

#[derive(Serialize, Deserialize, Validate)]
pub struct CreateRecipeRequest {
    pub recipe: CreateRecipeDto,
    pub ingredients: Vec<CreateIngredientDto>,
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
            } = request;

            let (recipe, ingredients) = state
                .recipe_service
                .create_recipe((recipe, ingredients))
                .await?;

            let response = RecipeDto::from(RecipeAggragate {
                recipe,
                ingredients,
            });

            Ok(Json(response))
        }
        Err(error) => Err(AppError::ValidationError(error.to_string())),
    }
}
