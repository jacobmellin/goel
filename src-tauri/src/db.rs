use diesel::dsl::insert_into;
use diesel::prelude::*;

pub mod models;
pub mod schema;

use diesel::RunQueryDsl;
use models::*;

fn if_err_to_string<T, U>(result: Result<T, U>) -> Result<T, String>
where
    U: std::fmt::Display,
{
    match result {
        Ok(v) => Ok(v),
        Err(e) => Err(e.to_string()),
    }
}

pub fn establish_connection() -> Result<SqliteConnection, String> {
    let cfg: crate::config::GoelConfig = confy::load("goel", None).unwrap();

    let db_path = cfg.db_dir.join("goel.sqlite");

    if_err_to_string(SqliteConnection::establish(&db_path.display().to_string()))
}

pub fn get_goals() -> Result<Vec<Goal>, String> {
    let connection = &mut establish_connection()?;

    let result = schema::goals::dsl::goals
        .limit(50)
        .filter(schema::goals::dsl::is_removed.eq(false))
        .load::<Goal>(connection);

    if_err_to_string(result)
}

pub fn get_goals_pending_reflection() -> Result<Vec<Goal>, String> {
    // 1. Determine next remind date for goals
    // 2. Find newest goal rating for each goal
    // (Join goals with goal_reflections, sort by date descending, limit
    // to 1 goal reflection)
    // 3. For each goal, compare next remind date with reflection dates.
    // If no reflection exists that is newer than the reflection day,
    // the goal is pending reflection
    todo!();
}

pub fn get_goal(goal_id: &str) -> Result<Vec<Goal>, String> {
    let connection = &mut establish_connection()?;
    let result = schema::goals::dsl::goals
        .find(goal_id)
        .load::<Goal>(connection);

    if_err_to_string(result)
}

pub fn insert_goal(new_goal: GoalNew) -> Result<usize, String> {
    let connection = &mut establish_connection()?;

    let result = insert_into(schema::goals::dsl::goals)
        .values(&new_goal)
        .execute(connection);

    if_err_to_string(result)
}

pub fn set_goal_removed(goal_id: &str, removed: bool) -> Result<usize, String> {
    let connection = &mut establish_connection()?;

    let result = diesel::update(schema::goals::dsl::goals.find(goal_id))
        .set(schema::goals::dsl::is_removed.eq(removed))
        .execute(connection);

    if_err_to_string(result)
}

pub fn get_reflections(goal_id: &str) -> Result<Vec<GoalReflection>, String> {
    let connection = &mut establish_connection()?;
    let result = schema::goal_reflections::dsl::goal_reflections
        .filter(schema::goal_reflections::dsl::goal_id.eq(goal_id))
        .limit(50)
        .load::<GoalReflection>(connection);

    if_err_to_string(result)
}

pub fn insert_goal_rating(new_goal_reflection: GoalReflectionNew) -> Result<usize, String> {
    let connection = &mut establish_connection()?;

    let result = insert_into(schema::goal_reflections::dsl::goal_reflections)
        .values(&new_goal_reflection)
        .execute(connection);

    if_err_to_string(result)
}
