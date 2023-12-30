use diesel::prelude::*;
use dotenv::dotenv;
use std::env;
// use uuid::Uuid;

pub mod models;
pub mod schema;

use models::*;
use schema::goals::dsl::*;
use diesel::RunQueryDsl;

pub fn establish_connection() -> SqliteConnection {
    dotenv().ok();
    let database_url = env::var("DATABASE_URL")
        .expect("Database URL not set!");

    SqliteConnection::establish(&database_url)
        .unwrap_or_else(|x| panic!("Error connecting to db: {}", x))
}

pub fn get_goals() -> Vec<Goal> {
    let connection = &mut establish_connection();

    goals.limit(50)
        .load::<Goal>(connection)
        .expect("Error loading Goals")
}
