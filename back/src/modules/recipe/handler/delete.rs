use axum::{
    Json,
    extract::{Path, State},
};
use uuid::Uuid;

use crate::{app_error::AppError, app_state::AppState};

pub async fn delete_recipe(
    State(state): State<AppState>,
    Path(recipe_id): Path<Uuid>,
) -> Result<Json<()>, AppError> {
    state.recipe_service.delete_recipe(recipe_id).await?;

    Ok(Json(()))
}
