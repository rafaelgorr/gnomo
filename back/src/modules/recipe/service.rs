use uuid::Uuid;

use crate::{
    app_error::AppError,
    models::{db_ingredient::DbIngredient, db_recipe::DbRecipe, db_recipe_step::DbRecipeStep},
    modules::recipe::{
        dto::create::{CreateIngredientDto, CreateRecipeDto},
        repository::repository::RecipeRepository,
    },
};

use super::{dto::create::CreateStepDto, repository::structs::CreateDbRecipe};

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
        recipe_ids: &Vec<Uuid>,
    ) -> Result<Vec<DbIngredient>, AppError> {
        let ingredients = self
            .recipe_repository
            .get_ingredients_by_recipes(recipe_ids)
            .await;

        ingredients
    }

    pub async fn get_directions_by_recipes(
        &self,
        recipe_ids: &Vec<Uuid>,
    ) -> Result<Vec<DbRecipeStep>, AppError> {
        let directions = self
            .recipe_repository
            .get_directions_by_recipes(recipe_ids)
            .await;

        directions
    }

    pub async fn get_recipes(&self) -> Vec<DbRecipe> {
        let recipes = self.recipe_repository.get_recipes().await;

        recipes
    }

    pub async fn get_recipe_by_id(
        &self,
        id: Uuid,
    ) -> Result<(DbRecipe, Vec<DbIngredient>, Vec<DbRecipeStep>), AppError> {
        match self.recipe_repository.get_recipe_by_id(id).await {
            Ok(result) => Ok(result),
            Err(db_error) => Err(AppError::Database(db_error)),
        }
    }

    pub async fn create_recipe(
        &self,
        dtos: (
            CreateRecipeDto,
            Vec<CreateIngredientDto>,
            Vec<CreateStepDto>,
        ),
    ) -> Result<(DbRecipe, Vec<DbIngredient>, Vec<DbRecipeStep>), AppError> {
        let (recipe_dto, ingredients, directions) = dtos;

        let recipe = self
            .recipe_repository
            .create_recipe(CreateDbRecipe::new(recipe_dto, ingredients, directions))
            .await;

        recipe
    }
}
