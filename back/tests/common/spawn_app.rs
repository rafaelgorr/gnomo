use std::{
    fs,
    path::{Path, PathBuf},
};

use axum::Router;
use back::app::create_app;
use sqlx::{Pool, Postgres};

fn migration_dirs(path: impl AsRef<Path>) -> std::io::Result<Vec<PathBuf>> {
    let mut dirs = fs::read_dir(path)?
        .filter_map(Result::ok)
        .map(|entry| entry.path())
        .filter(|path| path.is_dir())
        .collect::<Vec<_>>();

    dirs.sort();

    Ok(dirs)
}

pub async fn spawn_app(pool: &Pool<Postgres>) -> Router {
    let dirs = migration_dirs(Path::new("../core/db/prisma/migrations")).unwrap();

    for dir in dirs {
        let sql = std::fs::read_to_string(dir.join("migration.sql"));

        let sql_str = match sql {
            Ok(str) => str,
            Err(_) => panic!(),
        };

        let _ = sqlx::raw_sql(sqlx::AssertSqlSafe(sql_str))
            .execute(pool)
            .await;
    }

    // Spawn the server (e.g., Axum, Actix-web) in the background
    create_app(&pool).await
}
