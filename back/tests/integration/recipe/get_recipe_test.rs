use axum::{
    body::Body,
    http::{self, Request, StatusCode},
};
use back::modules::recipe::{
    dto::{
        create::{CreateIngredientDto, CreateRecipeDto},
        response::RecipeDto,
    },
    repository::{repository::RecipeRepository, structs::CreateDbRecipe},
};
use sqlx::{Pool, Postgres};
use tower::ServiceExt;

use crate::common::spawn_app::spawn_app;

#[sqlx::test]
async fn get_recipe(pool: Pool<Postgres>) -> sqlx::Result<()> {
    let app = spawn_app(&pool).await;

    let recipe_repository = RecipeRepository::new(pool);

    let ingredient_description_1 =
        "8 ounces frozen chopped spinach, thawed, or 1 pound ground beef".to_string();
    let ingredient_description_2 = "Salt and freshly ground black pepper, as needed".to_string();

    let (recipe, ingredients) = recipe_repository
        .create_recipe(CreateDbRecipe::new(
            CreateRecipeDto {
                name: String::from("Recipe 1"),
                description: Some(String::from("This is a test recipe")),
                prep_time: 30,
                cook_time: 30,
            },
            vec![
                CreateIngredientDto {
                    description: ingredient_description_1.clone(),
                },
                CreateIngredientDto {
                    description: ingredient_description_2.clone(),
                },
            ],
        ))
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
            .any(|ingredient| ingredient.description == ingredient_description_1)
    );
    assert!(
        ingredients
            .iter()
            .any(|ingredient| ingredient.description == ingredient_description_2)
    );

    Ok(())
}
