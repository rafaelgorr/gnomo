use axum::{
    body::Body,
    http::{self, Request, StatusCode},
};
use back::{
    contracts::kitchen::models::{GetRecipeResponse, GetRecipesResponse},
    modules::recipe::{
        dto::create::{CreateIngredientDto, CreateRecipeDto, CreateStepDto},
        repository::{repository::RecipeRepository, structs::CreateDbRecipe},
    },
};
use sqlx::{Pool, Postgres};
use tower::ServiceExt;

use crate::common::spawn_app::spawn_app;

#[sqlx::test]
async fn get_recipes(pool: Pool<Postgres>) -> sqlx::Result<()> {
    let app = spawn_app(&pool).await;

    let recipe_repository = RecipeRepository::new(pool);

    let ingredient_description_1 =
        "8 ounces frozen chopped spinach, thawed, or 1 pound ground beef".to_string();
    let ingredient_description_2 = "Salt and freshly ground black pepper, as needed".to_string();

    let step_1_instruction = "Heat 2 tablespoons oil in a large".to_string();
    let step_2_instruction =
        "Heat remaining 2 tablespoons oil in the same skillet over medium-high heat.".to_string();

    let (recipe, ingredients, directions) = recipe_repository
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
            vec![
                CreateStepDto {
                    index: 0,
                    instruction: step_1_instruction.clone(),
                },
                CreateStepDto {
                    index: 1,
                    instruction: step_2_instruction.clone(),
                },
            ],
        ))
        .await
        .unwrap();

    let request = Request::builder()
        .method(http::Method::GET)
        .uri("/api/kitchen/recipes")
        .body(Body::empty())
        .unwrap();

    let response = app.oneshot(request).await.unwrap();

    assert_eq!(response.status(), StatusCode::OK);

    let body_bytes = axum::body::to_bytes(response.into_body(), usize::MAX)
        .await
        .unwrap();

    let response: GetRecipesResponse = serde_json::from_slice(&body_bytes).unwrap();
    assert_eq!(response.recipes.len(), 1);
    assert_eq!(response.recipes.first().unwrap().id, recipe.id.to_string());
    assert_eq!(response.recipes.first().unwrap().name, recipe.name);
    assert_eq!(
        response.recipes.first().unwrap().description,
        recipe.description
    );

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

    assert_eq!(directions.len(), 2);

    assert!(
        directions
            .iter()
            .any(|step| step.instruction == step_1_instruction && step.index == 0)
    );

    assert!(
        directions
            .iter()
            .any(|step| step.instruction == step_2_instruction && step.index == 1)
    );

    Ok(())
}

#[sqlx::test]
async fn get_recipe(pool: Pool<Postgres>) -> sqlx::Result<()> {
    let app = spawn_app(&pool).await;

    let recipe_repository = RecipeRepository::new(pool);

    let (recipe, ingredients, directions) = recipe_repository
        .create_recipe(CreateDbRecipe::new(
            CreateRecipeDto {
                name: String::from("Recipe 1"),
                description: Some(String::from("This is a test recipe")),
                prep_time: 30,
                cook_time: 30,
            },
            vec![],
            vec![],
        ))
        .await
        .unwrap();

    let request = Request::builder()
        .method(http::Method::GET)
        .uri(format!("/api/kitchen/recipes/{}", recipe.id))
        .body(Body::empty())
        .unwrap();

    let response = app.oneshot(request).await.unwrap();

    assert_eq!(response.status(), StatusCode::OK);

    let body_bytes = axum::body::to_bytes(response.into_body(), usize::MAX)
        .await
        .unwrap();

    let response: GetRecipeResponse = serde_json::from_slice(&body_bytes).unwrap();

    assert_eq!(response.recipe.id, recipe.id.to_string());
    assert_eq!(response.recipe.name, recipe.name);
    assert_eq!(response.recipe.description, recipe.description);

    assert!(ingredients.len() == 0);
    assert!(directions.len() == 0);

    Ok(())
}
