use axum::Router;
use sqlx::{Pool, Postgres};

use std::net::SocketAddr;

use crate::{
    app_error::fallback_handler, app_state::AppState, modules,
    utils::shutdown_signal::shutdown_signal,
};

pub async fn create_app(db_pool: &Pool<Postgres>) -> Router {
    // initialize tracing
    // tracing_subscriber::fmt::init();

    let app_state = AppState {
        recipe_service: modules::recipe::get_recipe_module(db_pool.clone()),
    };

    // build our application with a route
    let app = Router::new()
        .merge(modules::recipe::routes::router())
        .with_state(app_state)
        .fallback(fallback_handler);

    println!("Database disconnected!");

    app.clone()
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
