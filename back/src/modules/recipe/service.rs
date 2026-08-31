use uuid::Uuid;

use crate::{
    app_error::AppError,
    models::{db_ingredient::DbIngredient, db_recipe::DbRecipe},
    modules::recipe::{
        dto::create::{CreateIngredientDto, CreateRecipeDto},
        repository::RecipeRepository,
    },
};

pub struct RecipeService {
    recipe_repository: RecipeRepository,
}

impl RecipeService {
    pub fn new(repository: RecipeRepository) -> Self {
        Self {
            recipe_repository: repository,
        }
    }

    pub async fn get_ingredients_by_recipes(
        &self,
        recipe_ids: Vec<Uuid>,
    ) -> Result<Vec<DbIngredient>, AppError> {
        let ingredients = self
            .recipe_repository
            .get_ingredients_by_recipes(recipe_ids)
            .await;

        ingredients
    }
    pub async fn get_recipes(&self) -> Vec<DbRecipe> {
        let recipes = self.recipe_repository.get_recipes().await;

        recipes
    }

    pub async fn create_recipe(
        &self,
        dtos: (CreateRecipeDto, Vec<CreateIngredientDto>),
    ) -> Result<(DbRecipe, Vec<DbIngredient>), AppError> {
        let (CreateRecipeDto { name, description }, ingredients) = dtos;

        let recipe = self
            .recipe_repository
            .create_recipe(name, description, ingredients)
            .await;

        recipe
    }
}
