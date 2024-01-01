// @generated automatically by Diesel CLI.

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
