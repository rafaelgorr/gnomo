use crate::{
    models::{db_ingredient::DbIngredient, db_recipe::DbRecipe, db_recipe_step::DbRecipeStep},
    modules::recipe::dto::dtos::{IngredientDto, RecipeDto, StepDto},
};

pub struct GetDbRecipe {
    pub recipe: DbRecipe,
    pub ingredients: Vec<DbIngredient>,
    pub directions: Vec<DbRecipeStep>,
}

pub struct RepoDbRecipeParams {
    pub name: String,
    pub description: Option<String>,
    pub prep_time: i32,
    pub cook_time: i32,
    pub ingredients: Vec<IngredientDto>,
    pub directions: Vec<StepDto>,
}

impl RepoDbRecipeParams {
    pub fn new(
        recipe: RecipeDto,
        ingredients: Vec<IngredientDto>,
        directions: Vec<StepDto>,
    ) -> Self {
        let RecipeDto {
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
            directions,
        }
    }
}
