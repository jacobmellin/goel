// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod db;

#[tauri::command]
fn get_goals() -> String {
    let goals = db::get_goals();
    serde_json::to_string(&goals).unwrap()
}

#[tauri::command]
fn new_goal(goal_raw: &str) -> &str {
    "id"
}

#[tauri::command]
fn get_goal(id: &str) -> &str {
    "goal"
}

#[tauri::command]
fn update_goal(id: &str, goal_raw: &str) {

}

#[tauri::command]
fn remove_goal(id: &str) {

}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_goals, 
            new_goal,
            get_goal,
            update_goal,
            remove_goal
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
