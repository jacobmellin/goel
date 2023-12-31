// @generated automatically by Diesel CLI.

diesel::table! {
    goals (id) {
        id -> Text,
        description -> Text,
        tracking_freq -> Text,
        tracking_days_interval -> Nullable<Integer>,
        is_active -> Integer,
        is_removed -> Integer,
        date_created -> Timestamp,
        date_modified -> Nullable<Timestamp>,
    }
}
