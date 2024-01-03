// @generated automatically by Diesel CLI.

diesel::table! {
    goal_ratings (id) {
        id -> Text,
        rating -> Nullable<Integer>,
        barriers_reflection -> Nullable<Text>,
        success_reflection -> Nullable<Text>,
        overcome_reflection -> Nullable<Text>,
        date_created -> Timestamp,
        date_modified -> Nullable<Timestamp>,
        goal_id -> Text,
    }
}

diesel::table! {
    goals (id) {
        id -> Text,
        description -> Text,
        tracking_freq -> Text,
        tracking_days_interval -> Nullable<Integer>,
        is_active -> Bool,
        is_removed -> Bool,
        date_created -> Timestamp,
        date_modified -> Nullable<Timestamp>,
    }
}

diesel::joinable!(goal_ratings -> goals (goal_id));

diesel::allow_tables_to_appear_in_same_query!(
    goal_ratings,
    goals,
);
