use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::models::db_ingredient::DbIngredient;
use crate::models::db_recipe::DbRecipe;

#[derive(Debug, Deserialize, Serialize)]
pub struct IngredientDto {
    pub id: Uuid,
    pub name: String,
    pub quantity: bigdecimal::BigDecimal,
}

impl From<DbIngredient> for IngredientDto {
    fn from(recipe: DbIngredient) -> Self {
        Self {
            id: recipe.id,
            name: recipe.name,
            quantity: recipe.quantity,
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
}

#[derive(Debug, Serialize)]
pub struct RecipeAggragate {
    pub recipe: DbRecipe,
    pub ingredients: Vec<DbIngredient>,
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
                .map(|ingredient: DbIngredient| IngredientDto::from(ingredient))
                .collect(),
        }
    }
}
