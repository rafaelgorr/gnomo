use axum::{
    body::Body,
    http::{self, Request, StatusCode},
};
use back::modules::recipe::{
    dto::{
        create::{CreateIngredientDto, CreateRecipeDto},
        response::RecipeDto,
    },
    handler::CreateRecipeRequest,
};
use bigdecimal::{BigDecimal, FromPrimitive};
use sqlx::{Pool, Postgres};
use tower::ServiceExt;

use crate::common::spawn_app::spawn_app;

#[sqlx::test]
async fn create_recipe(pool: Pool<Postgres>) -> sqlx::Result<()> {
    let app = spawn_app(&pool).await;

    let recipe_name = "New recipe".to_string();
    let recipe_description = "New recipe description".to_string();
    let recipe = CreateRecipeDto {
        name: recipe_name.clone(),
        description: recipe_description.clone(),
    };

    let ingredient_1 = CreateIngredientDto {
        name: "New ingredient 1".to_string(),
        quantity: BigDecimal::from_f64(1.5).unwrap(),
    };

    let ingredient_2 = CreateIngredientDto {
        name: "New ingredient 2".to_string(),
        quantity: BigDecimal::from_f64(2.5).unwrap(),
    };

    let payload = serde_json::to_vec(&CreateRecipeRequest {
        recipe,
        ingredients: vec![ingredient_1, ingredient_2],
    })
    .unwrap();

    let request = Request::builder()
        .method(http::Method::POST)
        .uri("/recipe")
        .header(http::header::CONTENT_TYPE, "application/json")
        .body(Body::from(payload))
        .unwrap();

    // 3. Invoke the router directly using Tower's Service traits
    let response = app.oneshot(request).await.unwrap();

    assert_eq!(response.status(), StatusCode::OK);

    // 4. Extract response body into bytes/Vec<u8>
    let body_bytes = axum::body::to_bytes(response.into_body(), usize::MAX)
        .await
        .unwrap();

    let created_recipe: RecipeDto = serde_json::from_slice(&body_bytes).unwrap();
    assert_eq!(created_recipe.name, recipe_name);
    assert_eq!(created_recipe.description, Some(recipe_description));

    Ok(())
}
