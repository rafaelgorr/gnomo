use serde::{Deserialize, Serialize};
use validator::Validate;

// Custom validation rule: ensure BigDecimal is greater than zero
// fn validate_positive(val: &BigDecimal) -> Result<(), ValidationError> {
//     if val > &BigDecimal::from(0) {
//         Ok(())
//     } else {
//         Err(ValidationError::new("must_be_positive"))
//     }
// }

#[derive(Serialize, Deserialize, Validate)]
pub struct CreateIngredientDto {
    #[validate(length(
        min = 1,
        max = 150,
        message = "Ingredient description must be 150 characters"
    ))]
    pub description: String,
}

#[derive(Serialize, Deserialize, Validate)]
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
