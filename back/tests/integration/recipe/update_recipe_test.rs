use axum::{
    body::Body,
    http::{self, Request, StatusCode},
};
use back::{
    contracts::kitchen::models::{
        RecipeOutput, UpdateIngredientInput, UpdateRecipeInput, UpdateRecipeRequest,
        UpdateRecipeStepInput,
    },
    modules::recipe::{
        dto::dtos::RecipeDto,
        repository::{repository::RecipeRepository, structs::RepoDbRecipeParams},
    },
};
use sqlx::{Pool, Postgres};
use tower::ServiceExt;

use crate::common::spawn_app::spawn_app;

#[sqlx::test]
async fn update_recipe(pool: Pool<Postgres>) -> sqlx::Result<()> {
    let app = spawn_app(&pool).await;

    let recipe_repository = RecipeRepository::new(pool);

    let (recipe, _, _) = recipe_repository
        .create_recipe(RepoDbRecipeParams::new(
            RecipeDto {
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

    let recipe_name = "New recipe".to_string();
    let recipe_description = "New recipe description".to_string();
    let new_recipe = UpdateRecipeInput {
        name: recipe_name.clone(),
        description: Some(recipe_description.clone()),
        prep_time: 60,
        cook_time: 60,
    };

    let ingredient_1 = UpdateIngredientInput {
        description: "1/4 cup water".to_string(),
    };

    let ingredient_2 = UpdateIngredientInput {
        description: "1 (16-ounce) container cottage cheese".to_string(),
    };

    let step_1 = UpdateRecipeStepInput {
        instruction: "Heat 2 tablespoons oil in a large".to_string(),
        index: 0,
    };
    let step_2 = UpdateRecipeStepInput {
        instruction: "Heat remaining 2 tablespoons oil in the same skillet over medium-high heat."
            .to_string(),
        index: 1,
    };

    let payload = serde_json::to_vec(&UpdateRecipeRequest {
        recipe: new_recipe,
        ingredients: vec![ingredient_1, ingredient_2],
        directions: vec![step_1, step_2],
    })
    .unwrap();

    let request = Request::builder()
        .method(http::Method::PUT)
        .uri(format!("/api/kitchen/recipe/{}", recipe.id))
        .header(http::header::CONTENT_TYPE, "application/json")
        .body(Body::from(payload))
        .unwrap();

    let response = app.oneshot(request).await.unwrap();

    assert_eq!(response.status(), StatusCode::OK);

    // let request = Request::builder()
    //     .method(http::Method::GET)
    //     .uri(format!("/api/kitchen/recipes/{}", recipe.id))
    //     .body(Body::empty())
    //     .unwrap();

    // let response = app.oneshot(request).await.unwrap();

    assert_eq!(response.status(), StatusCode::OK);

    let body_bytes = axum::body::to_bytes(response.into_body(), usize::MAX)
        .await
        .unwrap();

    let updated_recipe: RecipeOutput = serde_json::from_slice(&body_bytes).unwrap();
    assert_eq!(updated_recipe.name, recipe_name);
    assert_eq!(updated_recipe.description, Some(recipe_description));
    assert_eq!(updated_recipe.cook_time, recipe.cook_time as i64);
    assert_eq!(updated_recipe.prep_time, recipe.prep_time as i64);

    Ok(())
}
