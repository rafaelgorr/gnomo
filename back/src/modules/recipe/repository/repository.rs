use sqlx::{Pool, Postgres, Transaction};
use uuid::Uuid;

use crate::{
    app_error::AppError,
    models::{db_ingredient::DbIngredient, db_recipe::DbRecipe, db_recipe_step::DbRecipeStep},
    modules::recipe::dto::create::{CreateIngredientDto, CreateStepDto},
};

use super::structs::CreateDbRecipe;

pub struct RecipeRepository {
    db_pool: Pool<Postgres>,
}

impl RecipeRepository {
    pub fn new(db_pool: Pool<Postgres>) -> Self {
        Self { db_pool }
    }

    pub async fn get_recipes(&self) -> Vec<DbRecipe> {
        let query = sqlx::query_as!(
            DbRecipe,
            r#"
              SELECT
                R.id,
                R.name,
                R.description,
                R.cook_time,
                R.prep_time,
                R.created_at as "created_at: chrono::NaiveDateTime",
                R.updated_at as "updated_at: chrono::NaiveDateTime",
                R.deleted_at as "deleted_at: chrono::NaiveDateTime"
              FROM kitchen.db_recipe R
              WHERE R.deleted_at IS NULL
            "#,
        )
        .fetch_all(&self.db_pool);

        match query.await {
            Ok(recipes) => recipes,
            Err(_) => vec![],
        }
    }

    pub async fn get_ingredients_by_recipes(
        &self,
        recipe_ids: &Vec<Uuid>,
    ) -> Result<Vec<DbIngredient>, AppError> {
        let query = sqlx::query_as!(
            DbIngredient,
            r#"
              SELECT
                I.id,
                I.description,
                I.recipe_id
              FROM kitchen.db_ingredient I
              WHERE I.recipe_id = ANY($1)              
            "#,
            &recipe_ids
        )
        .fetch_all(&self.db_pool);

        match query.await {
            Ok(ingredients) => Ok(ingredients),
            Err(error) => Err(AppError::Database(error)),
        }
    }

    pub async fn get_directions_by_recipes(
        &self,
        recipe_ids: &Vec<Uuid>,
    ) -> Result<Vec<DbRecipeStep>, AppError> {
        let query = sqlx::query_as!(
            DbRecipeStep,
            r#"
              SELECT
                S.id,
                S.index,
                S.instruction,
                S.recipe_id
              FROM kitchen.db_recipe_step S
              WHERE S.recipe_id = ANY($1)              
            "#,
            &recipe_ids
        )
        .fetch_all(&self.db_pool);

        match query.await {
            Ok(directions) => Ok(directions),
            Err(error) => Err(AppError::Database(error)),
        }
    }

    async fn insert_ingredients_on_recipe(
        &self,
        recipe_id: Uuid,
        ingredients: Vec<CreateIngredientDto>,
        tx: &mut Transaction<'_, Postgres>,
    ) -> Result<Vec<DbIngredient>, AppError> {
        let mut query_builder: sqlx::QueryBuilder<sqlx::Postgres> =
            sqlx::QueryBuilder::new(" INSERT INTO kitchen.db_ingredient (description, recipe_id) ");

        query_builder.push_values(ingredients, |mut b, ingredient| {
            b.push_bind(ingredient.description).push_bind(recipe_id);
        });

        query_builder.push(" RETURNING id, description, recipe_id");

        let query = query_builder.build_query_as::<DbIngredient>();

        match query.fetch_all(&mut **tx).await {
            Ok(ingredients) => Ok(ingredients),
            Err(error) => Err(AppError::Database(error)),
        }
    }

    async fn insert_steps_on_recipe(
        &self,
        recipe_id: Uuid,
        directions: Vec<CreateStepDto>,
        tx: &mut Transaction<'_, Postgres>,
    ) -> Result<Vec<DbRecipeStep>, AppError> {
        let mut query_builder: sqlx::QueryBuilder<sqlx::Postgres> = sqlx::QueryBuilder::new(
            " INSERT INTO kitchen.db_recipe_step (index, instruction, recipe_id) ",
        );

        query_builder.push_values(directions, |mut b, step| {
            b.push_bind(step.index)
                .push_bind(step.instruction)
                .push_bind(recipe_id);
        });

        query_builder.push(" RETURNING id, index, instruction, recipe_id");

        let query = query_builder.build_query_as::<DbRecipeStep>();

        match query.fetch_all(&mut **tx).await {
            Ok(directions) => Ok(directions),
            Err(error) => Err(AppError::Database(error)),
        }
    }

    pub async fn create_recipe(
        &self,
        db_recipe: CreateDbRecipe,
    ) -> Result<(DbRecipe, Vec<DbIngredient>, Vec<DbRecipeStep>), AppError> {
        let mut tx: Transaction<'_, Postgres> = self.db_pool.begin().await?;

        let CreateDbRecipe {
            name,
            description,
            prep_time,
            cook_time,
            ingredients,
            directions,
        } = db_recipe;
        let query = sqlx::query_as!(
            DbRecipe,
            r#"
              INSERT INTO kitchen.db_recipe (name, description,cook_time, prep_time)
              VALUES ($1, $2, $3, $4)
              RETURNING 
                id, 
                name, 
                description,
                cook_time,
                prep_time,
                created_at as "created_at: chrono::NaiveDateTime",
                updated_at as "updated_at: chrono::NaiveDateTime",
                deleted_at as "deleted_at: chrono::NaiveDateTime"
        
            "#,
            name,
            description,
            prep_time,
            cook_time
        )
        .fetch_one(&mut *tx);

        let recipe = match query.await {
            Ok(recipe_response) => recipe_response,
            Err(error) => return Err(AppError::Database(error)),
        };

        let recipe_ingredients: Vec<DbIngredient> = if ingredients.len() > 0 {
            self.insert_ingredients_on_recipe(recipe.id, ingredients, &mut tx)
                .await?
        } else {
            vec![]
        };
        let recipe_directions: Vec<DbRecipeStep> = if directions.len() > 0 {
            self.insert_steps_on_recipe(recipe.id, directions, &mut tx)
                .await?
        } else {
            vec![]
        };

        tx.commit().await?;

        Ok((recipe, recipe_ingredients, recipe_directions))
    }
}
