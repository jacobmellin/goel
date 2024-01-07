CREATE TABLE "goal_reflections" (
    id TEXT PRIMARY KEY NOT NULL,
    rating INTEGER,
    barriers_reflection TEXT,
    success_reflection TEXT,
    skipped INTEGER DEFAULT 0,
    date_created TIMESTAMP NOT NULL,
    date_modified TIMESTAMP,
    goal_id TEXT NOT NULL,
    FOREIGN KEY(goal_id) REFERENCES goals(id)
)
