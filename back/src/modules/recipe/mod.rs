use std::sync::Arc;

use sqlx::{Pool, Postgres};

use crate::modules::recipe::{repository::repository::RecipeRepository, service::RecipeService};

pub mod dto;
pub mod handler;
pub mod repository;
pub mod routes;
pub mod service;

pub fn get_recipe_module(db_pool: Pool<Postgres>) -> Arc<RecipeService> {
    let recipe_repository = RecipeRepository::new(db_pool);
    let recipe_service = Arc::new(RecipeService::new(recipe_repository));

    recipe_service
}
