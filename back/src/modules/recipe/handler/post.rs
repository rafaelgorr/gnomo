use axum::{Json, extract::State};
use validator::Validate;

use crate::{
    app_error::AppError,
    app_state::AppState,
    contracts::kitchen::models::{CreateRecipeRequest, RecipeOutput},
    modules::recipe::dto::{create::CreateRecipeRequestDto, response::RecipeAggragate},
};

pub async fn create_recipe(
    State(state): State<AppState>,
    Json(request): Json<CreateRecipeRequest>,
) -> Result<Json<RecipeOutput>, AppError> {
    let create_recipe_dto = CreateRecipeRequestDto::from(request);

    match create_recipe_dto.validate() {
        Ok(_) => {
            let CreateRecipeRequestDto {
                recipe,
                ingredients,
                directions,
            } = create_recipe_dto;

            let (recipe, ingredients, directions) = state
                .recipe_service
                .create_recipe((recipe, ingredients, directions))
                .await?;

            let response = RecipeOutput::from(RecipeAggragate {
                recipe,
                ingredients,
                directions,
            });

            Ok(Json(response))
        }
        Err(error) => Err(AppError::ValidationError(error.to_string())),
    }
}
