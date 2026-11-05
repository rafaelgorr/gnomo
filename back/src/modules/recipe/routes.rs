use axum::{
    Router,
    routing::{get, post},
};

use crate::app_state::AppState;

use super::handler::handler::{create_recipe, get_recipes};

pub fn router() -> Router<AppState> {
    let api_routes: Router<AppState> = Router::new()
        .route("/recipes", get(get_recipes))
        .route("/recipe", post(create_recipe));

    Router::new().nest("/api", api_routes)
}
