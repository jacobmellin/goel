use std::ops::Add;

use chrono::NaiveDateTime;
use diesel::{Queryable, Selectable, Insertable, associations::Associations, Identifiable};
use serde::{Serialize, Deserialize};

#[derive(Debug, Queryable, Serialize, Selectable, Identifiable)]
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

impl Goal {
    pub fn get_next_remind_date(&self, last_reflection_date: Option<NaiveDateTime>) -> Option<NaiveDateTime> {
        // Start date is date created or supplied
        // date of last reflection
        let start_date = if let Some(date) = last_reflection_date { date } else { self.date_created };

        match self.tracking_freq.as_str() {
            "daily" => Some(start_date.add(chrono::Duration::days(1))),
            "weekly" => Some(start_date.add(chrono::Duration::weeks(1))),
            "monthly" => Some(start_date.add(chrono::Duration::weeks(4))),
            "yearly" => Some(start_date.add(chrono::Duration::weeks(52))),
            "every" => Some(start_date.add(
                    chrono::Duration::days(self.tracking_days_interval.unwrap().into()))),
            _ => panic!("Invalid value for tracking_freq found in db")
        }
    }

    pub fn is_pending_reflection(&self, last_reflection_date: Option<NaiveDateTime>) -> bool {
        let next_remind_date = self.get_next_remind_date(last_reflection_date);

        // Normalize dates to start of day
        let now = chrono::Local::now().naive_local();
        now.date() >= next_remind_date.unwrap().date()
    }
}

#[derive(Debug, Insertable, Deserialize)]
#[diesel(table_name = super::schema::goals)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct GoalNew<'a> {
    #[serde(default)]
    pub id: String,
    pub description: &'a str,
    pub tracking_freq: String,
    pub tracking_days_interval: Option<i32>,
    #[serde(default)]
    pub date_created: NaiveDateTime,
}

#[derive(Debug, Queryable, Serialize, Associations, Identifiable, PartialEq, Selectable)]
#[diesel(table_name = super::schema::goal_reflections)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[diesel(belongs_to(Goal))]
pub struct GoalReflection {
    pub id: String,
    pub rating: Option<i32>,
    pub barriers_reflection: Option<String>,
    pub success_reflection: Option<String>,
    pub date_created: NaiveDateTime,
    pub date_modified: Option<NaiveDateTime>,
    pub goal_id: String,
}

#[derive(Debug, Insertable, Deserialize)]
#[diesel(table_name = super::schema::goal_reflections)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct GoalReflectionNew<'a> {
    #[serde(default)]
    pub id: &'a str,
    pub rating: Option<i32>,
    pub barriers_reflection: Option<&'a str>,
    pub success_reflection: Option<&'a str>,
    #[serde(default)]
    pub date_created: NaiveDateTime,
    pub date_modified: Option<NaiveDateTime>,
    #[serde(default)]
    pub goal_id: &'a str,
}
