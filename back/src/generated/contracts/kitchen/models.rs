//!
//! Generated from an OAS specification by openapi-model-generator(v0.6.3)
//!

use serde::{Serialize, Deserialize};
use chrono::{DateTime, Utc};

/// The template for omitting properties.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CreateIngredientInput {
    pub description: String,
}

/// The template for omitting properties.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CreateRecipeInput {
    pub name: String,
    pub description: Option<String>,
    pub prep_time: i64,
    pub cook_time: i64,
}

/// CreateRecipeRequest
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CreateRecipeRequest {
    pub recipe: CreateRecipeInput,
    pub ingredients: Vec<CreateIngredientInput>,
    pub directions: Vec<CreateRecipeStepInput>,
}

/// CreateRecipeResponse
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CreateRecipeResponse {
    pub id: String,
    pub name: String,
    pub description: Option<String>,
    pub prep_time: i64,
    pub cook_time: i64,
    pub ingredients: Vec<Ingredient>,
    pub directions: Vec<RecipeStep>,
    pub created_at: DateTime<Utc>,
}

/// The template for omitting properties.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CreateRecipeStepInput {
    pub index: i64,
    pub instruction: String,
}

/// GetRecipesResponse
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GetRecipesResponse {
    pub recipes: Vec<RecipeOutput>,
}

/// Ingredient
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Ingredient {
    pub id: String,
    pub description: String,
}

/// RecipeOutput
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RecipeOutput {
    pub id: String,
    pub name: String,
    pub description: Option<String>,
    pub prep_time: i64,
    pub cook_time: i64,
    pub ingredients: Vec<Ingredient>,
    pub directions: Vec<RecipeStep>,
    pub created_at: DateTime<Utc>,
}

/// RecipeStep
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RecipeStep {
    pub id: String,
    pub index: i64,
    pub instruction: String,
}

/// RecipesCreateRequest
#[derive(Debug, Clone, Serialize)]
pub struct RecipesCreateRequest {
    pub body: CreateRecipeRequest,
}
/// The request has succeeded.
#[derive(Debug, Clone, Deserialize)]
pub struct RecipesListResponse200 {
    pub body: GetRecipesResponse,
}
/// The request has succeeded.
#[derive(Debug, Clone, Deserialize)]
pub struct RecipesCreateResponse200 {
    pub body: CreateRecipeResponse,
}