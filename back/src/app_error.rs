use axum::{
    Json,
    http::StatusCode,
    response::{IntoResponse, Response},
};
use serde_json::json;

#[derive(Debug, thiserror::Error)]
pub enum AppError {
    #[error("Database error occurred")]
    Database(#[from] sqlx::Error),

    #[error("Requested resource was not found")]
    NotFound,

    #[error("Invalid client input: {0}")]
    BadRequest(String),

    #[error("The requested route was not found on this server.")]
    RouteNotFound,

    #[error("The route returned with request validation error.\n {0}")]
    ValidationError(String),
}

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        let (status, error_message) = match self {
            AppError::Database(err) => {
                // Log the real internal error safely using tracing
                tracing::error!("Database internal error: {:?}", err);

                // Keep the server's internals private from the public API
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    "An internal server error occurred.".to_string(),
                )
            }
            AppError::NotFound => (StatusCode::NOT_FOUND, self.to_string()),
            AppError::BadRequest(msg) => (StatusCode::BAD_REQUEST, msg),
            AppError::RouteNotFound => (StatusCode::NOT_FOUND, self.to_string()),
            AppError::ValidationError(msg) => (StatusCode::UNPROCESSABLE_ENTITY, msg),
        };

        let body = Json(json!({
            "error": error_message
        }));

        (status, body).into_response()
    }
}

pub async fn fallback_handler() -> Result<(), AppError> {
    Err(AppError::RouteNotFound)
}
