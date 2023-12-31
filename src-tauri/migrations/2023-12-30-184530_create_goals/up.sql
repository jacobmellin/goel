CREATE TABLE "goals" (
    id TEXT PRIMARY KEY NOT NULL,
    description TEXT NOT NULL,
    tracking_freq TEXT NOT NULL,
    tracking_days_interval INTEGER,
    is_active INTEGER NOT NULL DEFAULT 1,
    is_removed INTEGER NOT NULL DEFAULT 0,
    date_created TIMESTAMP NOT NULL,
    date_modified TIMESTAMP
);
