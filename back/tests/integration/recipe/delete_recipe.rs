use axum::{
    body::Body,
    http::{self, Request, StatusCode},
};
use back::modules::recipe::{
    dto::dtos::{IngredientDto, RecipeDto, StepDto},
    repository::{repository::RecipeRepository, structs::RepoDbRecipeParams},
};
use sqlx::{Pool, Postgres};
use tower::ServiceExt;

use crate::common::spawn_app::spawn_app;

#[sqlx::test]
async fn delete_recipe(pool: Pool<Postgres>) -> sqlx::Result<()> {
    let app = spawn_app(&pool).await;

    let recipe_repository = RecipeRepository::new(pool);

    let ingredient_description_1 =
        "8 ounces frozen chopped spinach, thawed, or 1 pound ground beef".to_string();
    let ingredient_description_2 = "Salt and freshly ground black pepper, as needed".to_string();

    let step_1_instruction = "Heat 2 tablespoons oil in a large".to_string();
    let step_2_instruction =
        "Heat remaining 2 tablespoons oil in the same skillet over medium-high heat.".to_string();

    let (recipe, _, _) = recipe_repository
        .create_recipe(RepoDbRecipeParams::new(
            RecipeDto {
                name: String::from("Recipe 1"),
                description: Some(String::from("This is a test recipe")),
                prep_time: 90,
                cook_time: 30,
            },
            vec![ingredient_description_1, ingredient_description_2]
                .iter()
                .map(|description| IngredientDto {
                    description: description.clone(),
                })
                .collect(),
            vec![step_1_instruction, step_2_instruction]
                .iter()
                .map(|instruction| StepDto {
                    instruction: instruction.clone(),
                })
                .collect(),
        ))
        .await
        .unwrap();

    let request = Request::builder()
        .method(http::Method::DELETE)
        .uri(format!("/api/kitchen/recipes/{}", recipe.id))
        .body(Body::empty())
        .unwrap();

    let response = app.clone().oneshot(request).await.unwrap();

    assert_eq!(response.status(), StatusCode::OK);

    let request = Request::builder()
        .method(http::Method::GET)
        .uri(format!("/api/kitchen/recipes/{}", recipe.id))
        .body(Body::empty())
        .unwrap();

    let response = app.clone().oneshot(request).await.unwrap();

    assert_eq!(response.status(), StatusCode::NOT_FOUND);

    Ok(())
}
