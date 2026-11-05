use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::models::db_ingredient::DbIngredient;
use crate::models::db_recipe::DbRecipe;
use crate::models::db_recipe_step::DbRecipeStep;

#[derive(Debug, Deserialize, Serialize)]
pub struct IngredientDto {
    pub id: Uuid,
    pub description: String,
}

impl From<DbIngredient> for IngredientDto {
    fn from(ingredient: DbIngredient) -> Self {
        Self {
            id: ingredient.id,
            description: ingredient.description,
        }
    }
}

#[derive(Debug, Deserialize, Serialize)]
pub struct StepDto {
    pub id: Uuid,
    pub index: i32,
    pub instruction: String,
}

impl From<DbRecipeStep> for StepDto {
    fn from(step: DbRecipeStep) -> Self {
        Self {
            id: step.id,
            index: step.index,
            instruction: step.instruction,
        }
    }
}

#[derive(Debug, Deserialize, Serialize)]
pub struct RecipeDto {
    pub id: Uuid,
    pub name: String,
    pub description: Option<String>,
    pub created_at: chrono::NaiveDateTime,
    pub ingredients: Vec<IngredientDto>,
    pub directions: Vec<StepDto>,
}

#[derive(Debug, Serialize)]
pub struct RecipeAggragate {
    pub recipe: DbRecipe,
    pub ingredients: Vec<DbIngredient>,
    pub directions: Vec<DbRecipeStep>,
}

impl From<RecipeAggragate> for RecipeDto {
    fn from(values: RecipeAggragate) -> Self {
        Self {
            id: values.recipe.id,
            name: values.recipe.name,
            description: values.recipe.description,
            created_at: values.recipe.created_at,
            ingredients: values
                .ingredients
                .into_iter()
                .map(|ingredient| IngredientDto::from(ingredient))
                .collect(),
            directions: values
                .directions
                .into_iter()
                .map(|step| StepDto::from(step))
                .collect(),
        }
    }
}

#[derive(Debug, Deserialize, Serialize)]
pub struct GetRecipe {
    pub recipes: Vec<RecipeDto>,
}
