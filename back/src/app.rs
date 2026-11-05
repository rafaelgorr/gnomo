use axum::{
    Router,
    http::{
        HeaderValue, Method,
        header::{AUTHORIZATION, CONTENT_TYPE},
    },
};
use sqlx::{Pool, Postgres};

use std::net::SocketAddr;

use crate::{
    app_error::fallback_handler, app_state::AppState, modules,
    utils::shutdown_signal::shutdown_signal,
};

use tower_http::cors::CorsLayer;

pub async fn create_app(db_pool: &Pool<Postgres>) -> Router {
    // initialize tracing
    // tracing_subscriber::fmt::init();

    let app_state = AppState {
        recipe_service: modules::recipe::get_recipe_module(db_pool.clone()),
    };

    let allowed_origin = "http://localhost:3030"
        .parse::<HeaderValue>()
        .expect("Invalid origin header value");

    // 2. Build the CORS middleware layer
    let cors = CorsLayer::new()
        // Explicitly allow Vite's server
        .allow_origin(allowed_origin)
        // Axios sends standard methods like GET, POST, etc.
        .allow_methods([Method::GET, Method::POST, Method::PUT, Method::DELETE])
        // Axios often specifies content type (e.g., application/json)
        // and Authorization headers if you pass tokens
        .allow_headers([CONTENT_TYPE, AUTHORIZATION]);

    // println!("Database disconnected!");

    Router::new()
        .merge(modules::recipe::routes::router())
        .with_state(app_state)
        .fallback(fallback_handler)
        .layer(cors)
}

pub async fn setup_app_server(db_pool: &Pool<Postgres>, app: Router) {
    // 3. Define the server address
    let addr = SocketAddr::from(([127, 0, 0, 1], 8085));
    println!("🚀 Server running at http://{}", addr);

    // 4. Bind and start the server using tokio listener
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    // axum::serve(listener, app).await.unwrap();

    // 4. Run the server and wait for the shutdown signal
    axum::serve(listener, app.into_make_service())
        .with_graceful_shutdown(shutdown_signal())
        .await
        .unwrap();

    // 5. The server has gracefully stopped accepting requests.
    // When the `pool` goes out of scope here, SQLx automatically
    // closes all idle connections and waits for active ones to finish.
    println!("Server shut down gracefully. Closing DB pool...");
    db_pool.close().await;
}
