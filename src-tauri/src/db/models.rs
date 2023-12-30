use diesel::{Queryable, Selectable};
use serde::{Serialize, Deserialize};

#[derive(Queryable, Serialize, Selectable, Deserialize)]
#[diesel(table_name = crate::db::schema::goals)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Goal {
    pub id: String,
    pub description: String,
    pub tracking_freq: String,
    pub tracking_days_interval: i32,
    pub is_active: i32,
    pub is_removed: i32,
    pub date_created: String,
    pub date_modified: String
}

