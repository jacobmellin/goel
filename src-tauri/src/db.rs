use diesel::prelude::*;
use dotenv::dotenv;
use std::env;
use diesel::dsl::insert_into;
// use uuid::Uuid;

pub mod models;
pub mod schema;

use models::*;
use schema::goals::dsl::*;
use diesel::result;
use diesel::RunQueryDsl;

fn if_err_to_string<T,U>(result: Result<T,U>) -> Result<T, String> 
    where U: std::fmt::Display {
    match result {
        Ok(T) => Ok(T),
        Err(T) => Err(T.to_string())
    }
}

pub fn establish_connection() -> Result<SqliteConnection, String> {
    let cfg: crate::config::GoelConfig = confy::load("goel", None).unwrap();

    let db_path = cfg.db_dir.join("goel.sqlite");

    if_err_to_string(SqliteConnection::establish(&db_path.display().to_string()))
}

pub fn get_goals() -> Result<Vec<Goal>, String> {
    let connection = &mut establish_connection()?;

    let result = goals.limit(50)
        .filter(is_removed.eq(false))
        .load::<Goal>(connection);

    if_err_to_string(result)
}

pub fn get_goal(goal_id: &str) -> Result<Vec<Goal>, String> {
    let connection = &mut establish_connection()?;
    let result = goals
                    .find(goal_id)
                    .load::<Goal>(connection);

    if_err_to_string(result)
}

pub fn insert_goal(new_goal: GoalNew) -> Result<usize, String> {
    let connection = &mut establish_connection()?;
    
    let result = insert_into(goals)
        .values(&new_goal)
        .execute(connection);

    if_err_to_string(result)
}

pub fn set_goal_removed(goal_id: &str, removed: bool) -> Result<usize, String> {
    let connection = &mut establish_connection()?;

    let result = diesel::update(goals.find(goal_id))
                .set(is_removed.eq(removed))
                .execute(connection);

    if_err_to_string(result)
}
