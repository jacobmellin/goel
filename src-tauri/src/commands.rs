use crate::db;
use crate::config;


#[tauri::command]
pub fn get_goals() -> Result<String, String> {
    let goals = db::get_goals()?;
    let json = serde_json::to_string(&goals);

    match json {
        Ok(data) => Ok(data),
        Err(error) => Err(error.to_string()),
    }
}

#[tauri::command]
pub fn get_goals_pending_reflection() -> Result<String, String> {
    let goals = db::get_goals_pending_reflection()?;
    let json = serde_json::to_string(&goals);

    match json {
        Ok(data) => Ok(data),
        Err(error) => Err(error.to_string()),
    }
}

#[tauri::command]
pub fn new_goal(goal_json: &str) -> Result<String, String> {
    let mut new_goal: db::models::GoalNew = match serde_json::from_str(goal_json) {
        Ok(goal) => goal,
        Err(e) => return Err(e.to_string()),
    };

    new_goal.date_created = chrono::Local::now().naive_local();
    new_goal.id = uuid::Uuid::new_v4().to_string();

    match db::insert_goal(new_goal) {
        Err(error) => return Err(error.to_string()),
        Ok(rows) => rows,
    };

    Ok("Success".into()) }

#[tauri::command]
pub fn get_goal(goal_id: &str) -> Result<String, String> {
    // TODO: Do error handling and
    // check what happens when no
    // goal can be found
    let goal = db::get_goal(goal_id);
    match serde_json::to_string(&goal) {
        Ok(data) => Ok(data),
        Err(err) => Err(err.to_string())
    }
}

#[tauri::command]
pub fn update_goal(id: &str, goal_raw: &str) -> Result<String, String> {
    let goal: db::models::Goal = match serde_json::from_str(goal_raw) {
        Ok(goal) => goal,
        Err(err) => return Err(err.to_string())
    };

    db::update_goal(id, goal)?;

    Ok("Success".into())
}

#[tauri::command]
pub fn set_goal_removed(goal_id: &str, removed: bool) -> Result<usize, String> {
    db::set_goal_removed(goal_id, removed)
}

#[tauri::command]
pub fn create_goal_reflection(reflect_data: &str) -> Result<String, String> {
    let mut new_rating: db::models::GoalReflectionNew = match serde_json::from_str(reflect_data) {
        Ok(data) => data,
        Err(err) => return Err(err.to_string()),
    };

    new_rating.date_created = chrono::Local::now().naive_local();

    let id: &str = &uuid::Uuid::new_v4().to_string();
    new_rating.id = id;

    let result = db::insert_goal_rating(new_rating);

    match result {
        Err(error) => return Err(error.to_string()),
        Ok(rows) => rows,
    };

    Ok("Success".into())
}

#[tauri::command]
pub fn get_goal_reflections(goal_id: &str) -> String {
    // TODO: Do error handling and
    // check what happens when no
    // goal can be found
    let reflections = db::get_goal_reflections(goal_id);
    
    match reflections {
        Ok(reflections) => serde_json::to_string(&reflections).unwrap(),
        Err(err) => err.to_string(),
    }
}

#[tauri::command]
pub fn get_settings() -> Result<String, String> {
    let cfg = config::load();
    match serde_json::to_string(&cfg) {
        Ok(v) => Ok(v),
        Err(err) => Err(err.to_string()),
    }
}

#[tauri::command]
pub fn save_settings(settings: &str) -> Result<(), String> {
    match serde_json::from_str::<config::GoelConfigUpdate>(settings) {
        Ok(config) => {
            config::merge(config);
            Ok(())
        }
        Err(err) => Err(err.to_string()),
    }
}

#[tauri::command]
pub fn set_reminder_enabled(enabled: &str) -> Result<(), String> { let mut cfg = config::load();
    cfg.enable_reminder = serde_json::from_str(enabled).unwrap();
    config::store(cfg);
    Ok(())
}

#[tauri::command]
pub fn get_font_size() -> Result<u8, String> {
    let cfg = config::load();
    Ok(cfg.font_size)
}

#[tauri::command]
pub fn set_font_size(font_size: &str) -> Result<(), String> {
    let mut cfg = config::load();
    cfg.font_size = serde_json::from_str(font_size).unwrap();
    config::store(cfg);
    Ok(())
}

#[tauri::command]
pub fn get_removed_goals_with_reflections() -> String {
    let goals = db::get_goals_with_reflections(true);
    match goals {
        Ok(goals) => serde_json::to_string(&goals).unwrap(),
        Err(err) => err.to_string(),
    }
}
