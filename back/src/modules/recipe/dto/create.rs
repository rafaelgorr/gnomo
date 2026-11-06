use validator::{Validate, ValidationError};

use crate::contracts::kitchen::models::CreateRecipeRequest;

//Custom validation rule: ensure i32 is greater than zero
fn validate_positive(val: i32) -> Result<(), ValidationError> {
    if val > 0 {
        Ok(())
    } else {
        Err(ValidationError::new("must_be_positive"))
    }
}

#[derive(Validate)]
pub struct CreateIngredientDto {
    #[validate(length(
        min = 1,
        max = 150,
        message = "Ingredient description must be 150 characters"
    ))]
    pub description: String,
}

#[derive(Validate)]
pub struct CreateStepDto {
    #[validate(length(
        min = 1,
        max = 500,
        message = "Direction step instruction must be 500 characters"
    ))]
    pub instruction: String,

    #[validate(range(min = 0, message = "Direction step should be positive"))]
    #[validate(custom(function = "validate_positive"))]
    pub index: i32,
}

#[derive(Validate)]
pub struct CreateRecipeDto {
    #[validate(length(min = 1, max = 25, message = "Recipe name must be 25 characters"))]
    pub name: String,

    #[validate(length(
        min = 1,
        max = 500,
        message = "Recipe description must be 500 characters"
    ))]
    pub description: Option<String>,

    #[validate(range(min = 1, message = "Recipe prep time should be positive"))]
    pub prep_time: i32,

    #[validate(range(min = 1, message = "Recipe cook time should be positive"))]
    pub cook_time: i32,
}

#[derive(Validate)]
pub struct CreateRecipeRequestDto {
    pub recipe: CreateRecipeDto,
    pub ingredients: Vec<CreateIngredientDto>,
    pub directions: Vec<CreateStepDto>,
}

impl From<CreateRecipeRequest> for CreateRecipeRequestDto {
    fn from(value: CreateRecipeRequest) -> Self {
        Self {
            recipe: CreateRecipeDto {
                name: value.recipe.name,
                description: value.recipe.description,
                cook_time: value.recipe.cook_time as i32,
                prep_time: value.recipe.prep_time as i32,
            },
            ingredients: value
                .ingredients
                .iter()
                .map(|ingredient| CreateIngredientDto {
                    description: ingredient.description.clone(),
                })
                .collect(),
            directions: value
                .directions
                .iter()
                .map(|step| CreateStepDto {
                    index: step.index as i32,
                    instruction: step.instruction.clone(),
                })
                .collect(),
        }
    }
}
