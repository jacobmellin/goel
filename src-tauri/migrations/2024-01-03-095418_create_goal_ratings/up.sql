CREATE TABLE "goal_ratings" (
    id TEXT PRIMARY KEY NOT NULL,
    rating INTEGER,
    barriers_reflection TEXT,
    success_reflection TEXT,
    overcome_reflection TEXT,
    date_created TIMESTAMP NOT NULL,
    date_modified TIMESTAMP,
    goal_id TEXT NOT NULL,
    FOREIGN KEY(goal_id) REFERENCES goals(id)
)
