use bigdecimal::BigDecimal;
use serde::{Deserialize, Serialize};
use validator::{Validate, ValidationError};

// Custom validation rule: ensure BigDecimal is greater than zero
fn validate_positive(val: &BigDecimal) -> Result<(), ValidationError> {
    if val > &BigDecimal::from(0) {
        Ok(())
    } else {
        Err(ValidationError::new("must_be_positive"))
    }
}

#[derive(Serialize, Deserialize, Validate)]
pub struct CreateIngredientDto {
    #[validate(length(min = 1, max = 50, message = "Ingredient name must be 50 characters"))]
    pub name: String,

    #[validate(custom(function = "validate_positive"))]
    pub quantity: bigdecimal::BigDecimal,
}

#[derive(Serialize, Deserialize, Validate)]
pub struct CreateRecipeDto {
    #[validate(length(min = 1, max = 25, message = "Recipe name must be 25 characters"))]
    pub name: String,

    #[validate(length(
        min = 1,
        max = 50,
        message = "Recipe description must be 50 characters"
    ))]
    pub description: String,
}
