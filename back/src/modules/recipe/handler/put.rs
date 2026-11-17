use axum::{
    Json,
    extract::{Path, State},
};
use uuid::Uuid;
use validator::Validate;

use crate::{
    app_error::AppError,
    app_state::AppState,
    contracts::kitchen::models::{RecipeOutput, UpdateRecipeRequest, UpdateRecipeResponse},
    modules::recipe::dto::{response::RecipeAggragate, update::UpdateRecipeRequestDto},
};

pub async fn update_recipe(
    State(state): State<AppState>,
    Path(recipe_id): Path<Uuid>,
    Json(request): Json<UpdateRecipeRequest>,
) -> Result<Json<UpdateRecipeResponse>, AppError> {
    let update_recipe_dto = UpdateRecipeRequestDto::from(request);

    if let Err(error) = update_recipe_dto.validate() {
        return Err(AppError::ValidationError(error.to_string()));
    }

    let UpdateRecipeRequestDto {
        recipe,
        ingredients,
        directions,
    } = update_recipe_dto;

    let (recipe, ingredients, directions) = state
        .recipe_service
        .update_recipe(recipe_id, (recipe, ingredients, directions))
        .await?;

    let recipe = RecipeOutput::from(RecipeAggragate {
        recipe,
        ingredients,
        directions,
    });

    Ok(Json(UpdateRecipeResponse { recipe }))
}
