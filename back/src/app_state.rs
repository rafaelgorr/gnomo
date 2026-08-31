use std::sync::Arc;

use crate::modules::recipe::service::RecipeService;

#[derive(Clone)]
pub struct AppState {
    pub recipe_service: Arc<RecipeService>,
}
