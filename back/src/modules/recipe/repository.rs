use sqlx::{Pool, Postgres, Transaction};
use uuid::Uuid;

use crate::{
    app_error::AppError,
    models::{db_ingredient::DbIngredient, db_recipe::DbRecipe},
    modules::recipe::dto::create::CreateIngredientDto,
};

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
        recipe_ids: Vec<Uuid>,
    ) -> Result<Vec<DbIngredient>, AppError> {
        let query = sqlx::query_as::<_, DbIngredient>(
            r#"
              SELECT
                I.id,
                I.name,
                I.quantity,
                I.recipe_id
              FROM kitchen.db_ingredient I
              WHERE I.recipe_id = ANY($1)              
            "#,
        )
        .bind(&recipe_ids)
        .fetch_all(&self.db_pool);

        match query.await {
            Ok(ingredients) => Ok(ingredients),
            Err(error) => Err(AppError::Database(error)),
        }
    }

    async fn insert_ingredients_on_recipe(
        &self,
        recipe_id: Uuid,
        ingredients: Vec<CreateIngredientDto>,
        tx: &mut Transaction<'_, Postgres>,
    ) -> Result<Vec<DbIngredient>, AppError> {
        let mut query_builder: sqlx::QueryBuilder<sqlx::Postgres> = sqlx::QueryBuilder::new(
            " INSERT INTO kitchen.db_ingredient (name, quantity, recipe_id) ",
        );

        query_builder.push_values(ingredients, |mut b, ingredient| {
            b.push_bind(ingredient.name)
                .push_bind(ingredient.quantity)
                .push_bind(recipe_id);
        });

        query_builder.push(" RETURNING id, name, quantity, recipe_id");

        let query = query_builder.build_query_as::<DbIngredient>();

        match query.fetch_all(&mut **tx).await {
            Ok(ingredients) => Ok(ingredients),
            Err(error) => Err(AppError::Database(error)),
        }
    }

    pub async fn create_recipe(
        &self,
        name: String,
        description: String,
        ingredients: Vec<CreateIngredientDto>,
    ) -> Result<(DbRecipe, Vec<DbIngredient>), AppError> {
        let mut tx: Transaction<'_, Postgres> = self.db_pool.begin().await?;

        let query = sqlx::query_as!(
            DbRecipe,
            r#"
              INSERT INTO kitchen.db_recipe (name, description)
              VALUES ($1, $2)
              RETURNING 
                id, 
                name, 
                description,
                created_at as "created_at: chrono::NaiveDateTime",
                updated_at as "updated_at: chrono::NaiveDateTime",
                deleted_at as "deleted_at: chrono::NaiveDateTime"
        
            "#,
            name,
            description
        )
        .fetch_one(&mut *tx);

        let recipe = query.await?;

        let recipe_ingredients: Vec<DbIngredient> = if ingredients.len() > 0 {
            self.insert_ingredients_on_recipe(recipe.id, ingredients, &mut tx)
                .await?
        } else {
            vec![]
        };

        tx.commit().await?;

        Ok((recipe, recipe_ingredients))
    }
}
