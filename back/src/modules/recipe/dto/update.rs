use validator::Validate;

use crate::contracts::kitchen::models::UpdateRecipeRequest;

use super::dtos::{IngredientDto, RecipeDto, StepDto};

#[derive(Validate)]
pub struct UpdateRecipeRequestDto {
    #[validate(nested)]
    pub recipe: RecipeDto,
    #[validate(nested)]
    pub ingredients: Vec<IngredientDto>,
    #[validate(nested)]
    pub directions: Vec<StepDto>,
}

impl From<UpdateRecipeRequest> for UpdateRecipeRequestDto {
    fn from(value: UpdateRecipeRequest) -> Self {
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
