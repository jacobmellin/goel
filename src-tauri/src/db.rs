use diesel::dsl::insert_into;
use diesel::prelude::*;
use dotenv::dotenv;
use std::env;

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
    dotenv().ok();

    let db_url_env = env::var("DATABASE_URL");

    let db_url: String = match db_url_env {
        Ok(env_url) => 
        {
            println!("Loading database from {}", env_url);
            env_url
        }
        Err(_) => {
            let cfg: crate::config::GoelConfig = confy::load("goel", None).unwrap();
            cfg.db_dir.join("goel.sqlite").display().to_string()
        }
    };

    if_err_to_string(SqliteConnection::establish(db_url.as_str()))
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
    let connection = &mut establish_connection()?;
    let goals = get_goals()?;

    let pending_goals = goals.into_iter().filter(|goal| {
        let newest_goal_reflection = GoalReflection::belonging_to(&goal)
            .order_by(schema::goal_reflections::dsl::date_created.desc())
            .first::<GoalReflection>(connection);

        if let Ok(newest_goal_reflection) = newest_goal_reflection {
            goal.is_pending_reflection(Some(newest_goal_reflection.date_created))
        } else {
            goal.is_pending_reflection(None)
        }
    }).collect();

    Ok(pending_goals)
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

pub fn update_goal(goal_id: &str,  updated_goal: Goal) -> Result<(), String> {
    let connection = &mut establish_connection()?;

    let goal = schema::goals::dsl::goals.find(goal_id);

    diesel::update(goal).set(schema::goals::dsl::description.eq(updated_goal.description)).execute(connection).unwrap();
    diesel::update(goal).set(schema::goals::dsl::tracking_freq.eq(updated_goal.tracking_freq)).execute(connection).unwrap();
    diesel::update(goal).set(schema::goals::dsl::tracking_days_interval.eq(updated_goal.tracking_days_interval)).execute(connection).unwrap();
    diesel::update(goal).set(schema::goals::dsl::date_modified.eq(chrono::Local::now().naive_local())).execute(connection).unwrap();

    Ok(())
}

pub fn set_goal_removed(goal_id: &str, removed: bool) -> Result<usize, String> {
    let connection = &mut establish_connection()?;

    let result = diesel::update(schema::goals::dsl::goals.find(goal_id))
        .set(schema::goals::dsl::is_removed.eq(removed))
        .execute(connection);

    if_err_to_string(result)
}

pub fn get_goal_reflections(goal_id: &str) -> Result<Vec<GoalReflection>, String> {
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
