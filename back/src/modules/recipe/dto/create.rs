use validator::Validate;

use crate::contracts::kitchen::models::CreateRecipeRequest;

use super::dtos::{IngredientDto, RecipeDto, StepDto};

#[derive(Validate)]
pub struct CreateRecipeRequestDto {
    pub recipe: RecipeDto,
    pub ingredients: Vec<IngredientDto>,
    pub directions: Vec<StepDto>,
}

impl From<CreateRecipeRequest> for CreateRecipeRequestDto {
    fn from(value: CreateRecipeRequest) -> Self {
        Self {
            recipe: RecipeDto {
                name: value.recipe.name,
                description: value.recipe.description,
                cook_time: value.recipe.cook_time as i32,
                prep_time: value.recipe.prep_time as i32,
            },
            ingredients: value
                .ingredients
                .iter()
                .map(|ingredient| IngredientDto {
                    description: ingredient.description.clone(),
                })
                .collect(),
            directions: value
                .directions
                .iter()
                .map(|step| StepDto {
                    index: step.index as i32,
                    instruction: step.instruction.clone(),
                })
                .collect(),
        }
    }
}
