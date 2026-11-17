use axum::{Json, extract::State};
use validator::Validate;

use crate::{
    app_error::AppError,
    app_state::AppState,
    contracts::kitchen::models::{CreateRecipeRequest, CreateRecipeResponse, RecipeOutput},
    modules::recipe::dto::{create::CreateRecipeRequestDto, response::RecipeAggragate},
};

pub async fn create_recipe(
    State(state): State<AppState>,
    Json(request): Json<CreateRecipeRequest>,
) -> Result<Json<CreateRecipeResponse>, AppError> {
    let create_recipe_dto = CreateRecipeRequestDto::from(request);

    if let Err(error) = create_recipe_dto.validate() {
        return Err(AppError::ValidationError(error.to_string()));
    }

    let CreateRecipeRequestDto {
        recipe,
        ingredients,
        directions,
    } = create_recipe_dto;

    let (recipe, ingredients, directions) = state
        .recipe_service
        .create_recipe((recipe, ingredients, directions))
        .await?;

    let recipe = RecipeOutput::from(RecipeAggragate {
        recipe,
        ingredients,
        directions,
    });

    Ok(Json(CreateRecipeResponse { recipe }))
}
