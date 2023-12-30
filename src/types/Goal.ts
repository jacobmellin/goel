type TrackingInterval = "daily" | "monthly" | "yearly" | "every";

interface GoalRecord {
    id: string,
    description: string,
    tracking_freq: TrackingInterval,
    tracking_days_interval: number,
    is_active: boolean,
    is_removed: boolean,
    date_created: string,
    date_modified: string
}

export type {
    GoalRecord,
    TrackingInterval
}
