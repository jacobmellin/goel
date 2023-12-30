CREATE TABLE "goals" (
    id TEXT PRIMARY KEY NOT NULL,
    description TEXT NOT NULL,
    tracking_freq TEXT NOT NULL,
    tracking_days_interval INTEGER NOT NULL DEFAULT 2,
    is_active INTEGER NOT NULL DEFAULT 1,
    is_removed INTEGER NOT NULL DEFAULT 0,
    date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    date_modified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO
    "goals"(id, description, tracking_freq)
VALUES
("uniqueid", "An example goal from the Database", "daily"),
("uniqueid2", "An example goal from the Database with a number of days as tracking frequency", "every");
