use std::collections::HashMap;

use uuid::Uuid;

use crate::models::{
    db_ingredient::DbIngredient, db_recipe::DbRecipe, db_recipe_step::DbRecipeStep,
};

use super::structs::GetDbRecipe;

pub struct GetRecipesAggragate {
    pub recipes: Vec<DbRecipe>,
    pub ingredients: Vec<DbIngredient>,
    pub directions: Vec<DbRecipeStep>,
}

impl From<GetRecipesAggragate> for Vec<GetDbRecipe> {
    fn from(value: GetRecipesAggragate) -> Self {
        let mut ingredients_by_recipe_id: HashMap<Uuid, Vec<DbIngredient>> = value
            .ingredients
            .into_iter()
            .fold(HashMap::new(), |mut hm, ingredient| {
                match hm.get_mut(&ingredient.recipe_id) {
                    Some(ingredients) => ingredients.push(ingredient),
                    None => {
                        hm.insert(ingredient.recipe_id, vec![ingredient]);
                    }
                };
                hm
            });

        let mut directions_by_recipe_id: HashMap<Uuid, Vec<DbRecipeStep>> = value
            .directions
            .into_iter()
            .fold(HashMap::new(), |mut hm, step| {
                match hm.get_mut(&step.recipe_id) {
                    Some(directions) => directions.push(step),
                    None => {
                        hm.insert(step.recipe_id, vec![step]);
                    }
                };
                hm
            });

        value
            .recipes
            .into_iter()
            .map(|recipe| {
                let recipe_id = recipe.id.clone();
                GetDbRecipe {
                    recipe,
                    ingredients: ingredients_by_recipe_id
                        .remove(&recipe_id)
                        .unwrap_or_default(),
                    directions: directions_by_recipe_id
                        .remove(&recipe_id)
                        .unwrap_or_default(),
                }
            })
            .collect()
    }
}
