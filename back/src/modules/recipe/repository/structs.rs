use crate::modules::recipe::dto::create::{CreateIngredientDto, CreateRecipeDto};

pub struct CreateDbRecipe {
    pub name: String,
    pub description: Option<String>,
    pub prep_time: i32,
    pub cook_time: i32,
    pub ingredients: Vec<CreateIngredientDto>,
}

impl CreateDbRecipe {
    pub fn new(recipe: CreateRecipeDto, ingredients: Vec<CreateIngredientDto>) -> Self {
        let CreateRecipeDto {
            name,
            description,
            prep_time,
            cook_time,
        } = recipe;
        Self {
            name,
            description,
            prep_time,
            cook_time,
            ingredients,
        }
    }
}
