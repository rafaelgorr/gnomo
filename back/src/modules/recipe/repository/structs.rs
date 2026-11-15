use crate::{
    models::{db_ingredient::DbIngredient, db_recipe::DbRecipe, db_recipe_step::DbRecipeStep},
    modules::recipe::dto::create::{CreateIngredientDto, CreateRecipeDto, CreateStepDto},
};

pub struct GetDbRecipe {
    pub recipe: DbRecipe,
    pub ingredients: Vec<DbIngredient>,
    pub directions: Vec<DbRecipeStep>,
}

pub struct CreateDbRecipe {
    pub name: String,
    pub description: Option<String>,
    pub prep_time: i32,
    pub cook_time: i32,
    pub ingredients: Vec<CreateIngredientDto>,
    pub directions: Vec<CreateStepDto>,
}

impl CreateDbRecipe {
    pub fn new(
        recipe: CreateRecipeDto,
        ingredients: Vec<CreateIngredientDto>,
        directions: Vec<CreateStepDto>,
    ) -> Self {
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
            directions,
        }
    }
}
