type TrackingInterval = "daily" | "weekly" | "monthly" | "yearly" | "every";

interface GoalRecord {
    id: string,
    description: string,
    tracking_freq: TrackingInterval,
    tracking_days_interval: number,
    is_active: boolean,
    is_removed: boolean,
    pending_reflection?: boolean,
    next_reflection_date: Date
    date_created: Date,
    date_modified: Date
}

export type {
    GoalRecord,
    TrackingInterval
}
