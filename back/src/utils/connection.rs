use dotenvy::dotenv;
use sqlx::{Pool, Postgres, postgres::PgPoolOptions};
use std::env;

pub async fn connect_to_db() -> Pool<Postgres> {
    dotenv().ok();
    let database_url = env::var("DATABASE_URL").expect("Retrieve DATABASE_URL from .env");

    let promise = PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url);

    match promise.await {
        Ok(pool) => pool,
        Err(_) => panic!("Database connetion failed"),
    }
}
