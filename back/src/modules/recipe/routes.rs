use axum::{
    Router,
    routing::{get, post},
};

use crate::app_state::AppState;

use super::handler::handler::{create_recipe, get_recipes};

pub fn router() -> Router<AppState> {
    let router: Router<AppState> = Router::new()
        .route("/recipes", get(get_recipes))
        .route("/recipe", post(create_recipe));

    router
}
