use serde::Serialize;

use crate::contracts::kitchen::models::{Ingredient, RecipeOutput, RecipeStep};
use crate::models::db_ingredient::DbIngredient;
use crate::models::db_recipe::DbRecipe;
use crate::models::db_recipe_step::DbRecipeStep;

#[derive(Debug, Serialize)]
pub struct RecipeAggragate {
    pub recipe: DbRecipe,
    pub ingredients: Vec<DbIngredient>,
    pub directions: Vec<DbRecipeStep>,
}

impl From<DbIngredient> for Ingredient {
    fn from(value: DbIngredient) -> Self {
        Self {
            id: value.id.to_string(),
            description: value.description,
        }
    }
}

impl From<DbRecipeStep> for RecipeStep {
    fn from(value: DbRecipeStep) -> Self {
        Self {
            id: value.id.to_string(),
            index: value.index as i64,
            instruction: value.instruction,
        }
    }
}

impl From<RecipeAggragate> for RecipeOutput {
    fn from(value: RecipeAggragate) -> Self {
        Self {
            id: value.recipe.id.to_string(),
            name: value.recipe.name,
            description: value.recipe.description,
            cook_time: value.recipe.cook_time as i64,
            prep_time: value.recipe.prep_time as i64,
            created_at: value.recipe.created_at.and_utc(),
            ingredients: value
                .ingredients
                .into_iter()
                .map(|ingredient| Ingredient::from(ingredient))
                .collect(),
            directions: value
                .directions
                .into_iter()
                .map(|step| RecipeStep::from(step))
                .collect(),
        }
    }
}
