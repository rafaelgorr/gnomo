use serde::{Deserialize, Serialize};
use validator::Validate;

use crate::modules::recipe::dto::create::{CreateIngredientDto, CreateRecipeDto, CreateStepDto};

#[derive(Serialize, Deserialize, Validate)]
pub struct CreateRecipeRequest {
    pub recipe: CreateRecipeDto,
    pub ingredients: Vec<CreateIngredientDto>,
    pub directions: Vec<CreateStepDto>,
}
