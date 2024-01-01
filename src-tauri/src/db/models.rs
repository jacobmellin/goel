use chrono::NaiveDateTime;
use diesel::{Queryable, Selectable, Insertable};
use serde::{Serialize, Deserialize};

#[derive(Queryable, Serialize, Selectable)]
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
pub struct GoalNew<'a> {
    #[serde(default)]
    pub id: String,
    pub description: &'a str,
    pub tracking_freq: &'a str,
    pub tracking_days_interval: Option<i32>,
    #[serde(default)]
    pub date_created: NaiveDateTime,
}
