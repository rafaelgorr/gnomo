use axum::{
    Router,
    routing::{get, post},
};

use crate::app_state::AppState;

use super::handler::{
    get::{get_recipe, get_recipes},
    post::create_recipe,
};

pub fn router() -> Router<AppState> {
    let api_routes: Router<AppState> = Router::new()
        .route("/kitchen/recipes", get(get_recipes))
        .route("/kitchen/recipes/{id}", get(get_recipe))
        .route("/kitchen/recipe", post(create_recipe));

    Router::new().nest("/api", api_routes)
}
