use axum::{
    body::Body,
    http::{self, Request, StatusCode},
};
use back::modules::recipe::{
    dto::{create::CreateIngredientDto, response::RecipeDto},
    repository::RecipeRepository,
};
use bigdecimal::{BigDecimal, FromPrimitive};
use sqlx::{Pool, Postgres};
use tower::ServiceExt;

use crate::common::spawn_app::spawn_app;

#[sqlx::test]
async fn get_recipe(pool: Pool<Postgres>) -> sqlx::Result<()> {
    let app = spawn_app(&pool).await;

    let recipe_repository = RecipeRepository::new(pool);

    let ingredient_name_1 = "Test ingredient 1".to_string();
    let ingredient_quantity_1 = BigDecimal::from_f64(1.5).unwrap();

    let ingredient_name_2 = "Test ingredient 2".to_string();
    let ingredient_quantity_2 = BigDecimal::from_f64(3.0).unwrap();

    let (recipe, ingredients) = recipe_repository
        .create_recipe(
            String::from("Recipe 1"),
            String::from("This is a test recipe"),
            vec![
                CreateIngredientDto {
                    name: ingredient_name_1.clone(),
                    quantity: ingredient_quantity_1.clone(),
                },
                CreateIngredientDto {
                    name: ingredient_name_2.clone(),
                    quantity: ingredient_quantity_2.clone(),
                },
            ],
        )
        .await
        .unwrap();

    let request = Request::builder()
        .method(http::Method::GET)
        .uri("/recipes")
        .body(Body::empty())
        .unwrap();

    // 3. Invoke the router directly using Tower's Service traits
    let response = app.oneshot(request).await.unwrap();

    assert_eq!(response.status(), StatusCode::OK);

    // 4. Extract response body into bytes/Vec<u8>
    let body_bytes = axum::body::to_bytes(response.into_body(), usize::MAX)
        .await
        .unwrap();

    // 5. Deserialize bytes directly into Vec<UserDto>
    let dtos: Vec<RecipeDto> = serde_json::from_slice(&body_bytes).unwrap();
    assert_eq!(dtos.len(), 1);
    assert_eq!(dtos.first().unwrap().id, recipe.id);
    assert_eq!(dtos.first().unwrap().name, recipe.name);
    assert_eq!(dtos.first().unwrap().description, recipe.description);

    assert_eq!(ingredients.len(), 2);

    assert!(
        ingredients
            .iter()
            .any(|ingredient| ingredient.name == ingredient_name_1
                && ingredient.quantity == ingredient_quantity_1)
    );
    assert!(
        ingredients
            .iter()
            .any(|ingredient| ingredient.name == ingredient_name_2
                && ingredient.quantity == ingredient_quantity_2)
    );

    Ok(())
}
