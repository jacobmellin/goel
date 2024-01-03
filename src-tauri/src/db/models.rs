use chrono::NaiveDateTime;
use diesel::{Queryable, Selectable, Insertable};
use serde::{Serialize, Deserialize};

#[derive(Debug, Queryable, Serialize, Selectable)]
#[diesel(table_name = super::schema::goals)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Goal {
    pub id: String,
    pub description: String,
    pub tracking_freq: String,
    pub tracking_days_interval: Option<i32>,
    pub is_active: bool,
    pub is_removed: bool,
    pub date_created: NaiveDateTime,
    pub date_modified: Option<NaiveDateTime>
}

#[derive(Debug, Insertable, Deserialize)]
#[diesel(table_name = super::schema::goals)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct GoalNew<'a> {
    #[serde(default)]
    pub id: String,
    pub description: &'a str,
    pub tracking_freq: &'a str,
    pub tracking_days_interval: Option<i32>,
    #[serde(default)]
    pub date_created: NaiveDateTime,
}

#[derive(Debug, Queryable, Serialize, Selectable)]
#[diesel(table_name = super::schema::goal_ratings)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct GoalRating {
    pub id: String,
    pub rating: Option<i32>,
    pub barriers_reflection: Option<String>,
    pub success_reflection: Option<String>,
    pub overcome_reflection: Option<String>,
    pub date_created: NaiveDateTime,
    pub date_modified: Option<NaiveDateTime>,
    pub goal_id: String,
}

#[derive(Debug, Insertable, Deserialize)]
#[diesel(table_name = super::schema::goal_ratings)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct GoalRatingNew<'a> {
    #[serde(default)]
    pub id: &'a str,
    pub rating: Option<i32>,
    pub barriers_reflection: Option<&'a str>,
    pub success_reflection: Option<&'a str>,
    pub overcome_reflection: Option<&'a str>,
    #[serde(default)]
    pub date_created: NaiveDateTime,
    pub date_modified: Option<NaiveDateTime>,
    #[serde(default)]
    pub goal_id: &'a str,
}
