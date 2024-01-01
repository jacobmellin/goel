// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod config;
mod db;

use diesel_migrations::{embed_migrations, EmbeddedMigrations, MigrationHarness};
use tauri::{Manager, CustomMenuItem, SystemTray, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem};

pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!("migrations");

#[tauri::command]
fn get_goals() -> Result<String, String> {
    let goals = db::get_goals()?;
    let json = serde_json::to_string(&goals);

    match json {
        Ok(data) => Ok(data),
        Err(error) => Err(error.to_string()),
    }
}

#[tauri::command]
fn new_goal(goal_json: &str) -> Result<String, String> {
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

    Ok("Success".into())
}

#[tauri::command]
fn get_goal(goal_id: &str) -> String {
    let goal = db::get_goal(goal_id);
    serde_json::to_string(&goal).unwrap()
}

#[tauri::command]
fn update_goal(id: &str, goal_raw: &str) {}

#[tauri::command]
fn set_goal_removed(goal_id: &str, removed: bool) -> Result<usize, String> {
    db::set_goal_removed(goal_id, removed)
}

fn main() {
    let db_connection = &mut db::establish_connection().unwrap();
    db_connection.run_pending_migrations(MIGRATIONS).unwrap();

    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let hide = CustomMenuItem::new("hide".to_string(), "Hide");

    let tray_menu = SystemTrayMenu::new()
        .add_item(hide)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(quit);

    let tray = SystemTray::new().with_menu(tray_menu);

    tauri::Builder::default()
        .system_tray(tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::LeftClick { tray_id, position, size, .. } => {
                println!("left click!");
                todo!("implement left click show action");
            },
            SystemTrayEvent::MenuItemClick { id, .. } => {
                let item_handle = app.tray_handle().get_item(&id);
                match id.as_str() {
                    "hide" => {
                        let window = app.get_window("main").unwrap();
                        if window.is_visible().unwrap() {
                            window.hide().unwrap();
                            item_handle.set_title("Show").unwrap();
                        } else {
                            window.show().unwrap();
                            item_handle.set_title("Hide").unwrap();
                        }
                    }
                    _ => {}
                }
            }
            _ => {}
        })
        .invoke_handler(tauri::generate_handler![
            get_goals,
            new_goal,
            get_goal,
            update_goal,
            set_goal_removed
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
