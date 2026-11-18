use validator::Validate;

#[derive(Validate)]
pub struct IngredientDto {
    #[validate(length(
        min = 1,
        max = 150,
        message = "Ingredient description must be 150 characters"
    ))]
    pub description: String,
}

#[derive(Validate)]
pub struct StepDto {
    #[validate(length(
        min = 1,
        max = 500,
        message = "Direction step instruction must be 500 characters"
    ))]
    pub instruction: String,
}

#[derive(Validate)]
pub struct RecipeDto {
    #[validate(length(min = 1, max = 25, message = "Recipe name must be 25 characters"))]
    pub name: String,

    #[validate(length(
        min = 1,
        max = 500,
        message = "Recipe description must be 500 characters"
    ))]
    pub description: Option<String>,

    #[validate(range(min = 1, max = 999, message = "Recipe prep time should be positive"))]
    pub prep_time: i32,

    #[validate(range(min = 1, max = 999, message = "Recipe cook time should be positive"))]
    pub cook_time: i32,
}
