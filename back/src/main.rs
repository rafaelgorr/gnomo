use back::{
    app::{create_app, setup_app_server},
    utils::connection::connect_to_db,
};

#[tokio::main]
async fn main() -> Result<(), sqlx::Error> {
    let pool = connect_to_db().await;
    let app = create_app(&pool).await;
    setup_app_server(&pool, app).await;

    Ok(())
}
