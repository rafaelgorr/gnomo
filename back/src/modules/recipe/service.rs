use uuid::Uuid;

use crate::{
    app_error::AppError,
    models::{db_ingredient::DbIngredient, db_recipe::DbRecipe, db_recipe_step::DbRecipeStep},
    modules::recipe::repository::repository::RecipeRepository,
};

use super::{
    dto::dtos::{IngredientDto, RecipeDto, StepDto},
    repository::structs::{GetDbRecipe, RepoDbRecipeParams},
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

    pub async fn get_recipes(&self) -> Result<Vec<GetDbRecipe>, AppError> {
        let recipes = self.recipe_repository.get_recipes().await?;

        Ok(recipes)
    }

    pub async fn get_recipe_by_id(
        &self,
        id: Uuid,
    ) -> Result<(DbRecipe, Vec<DbIngredient>, Vec<DbRecipeStep>), AppError> {
        match self.recipe_repository.get_recipe_by_id(id).await {
            Ok(result) => Ok(result),
            Err(db_error) => Err(db_error),
        }
    }

    pub async fn create_recipe(
        &self,
        dtos: (RecipeDto, Vec<IngredientDto>, Vec<StepDto>),
    ) -> Result<(DbRecipe, Vec<DbIngredient>, Vec<DbRecipeStep>), AppError> {
        let (recipe_dto, ingredients, directions) = dtos;

        let recipe = self
            .recipe_repository
            .create_recipe(RepoDbRecipeParams::new(recipe_dto, ingredients, directions))
            .await;

        recipe
    }

    pub async fn update_recipe(
        &self,
        id: Uuid,
        dtos: (RecipeDto, Vec<IngredientDto>, Vec<StepDto>),
    ) -> Result<(DbRecipe, Vec<DbIngredient>, Vec<DbRecipeStep>), AppError> {
        let (recipe_dto, ingredients, directions) = dtos;

        let recipe = self
            .recipe_repository
            .update_recipe(
                id,
                RepoDbRecipeParams::new(recipe_dto, ingredients, directions),
            )
            .await;

        recipe
    }

    pub async fn delete_recipe(&self, id: Uuid) -> Result<(), AppError> {
        self.recipe_repository.delete_recipe(id).await
    }
}
