// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod config;
mod db;
mod commands;

use tokio::{task, time};
use diesel_migrations::{embed_migrations, EmbeddedMigrations, MigrationHarness};
use tauri::{
    CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem,
    WindowEvent, api::notification, tauri_build_context,
};

pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!("migrations");

async fn remind_if_goals_pending() -> bool {
    match db::get_goals_pending_reflection() {
        Ok(goals) => {
            if goals.len() > 0 {
                let notification = notification::Notification::new("GoelReminder");

                let _ = notification.title("Goel")
                    .body("📝 Time to track your progress!")
                    // TODO: Find a way to display goel icon here
                    .icon("file://src-tauri/icons/icon.png")
                    .show();

                // TODO: Show tauri window
                // Is it good usability to show the window here?
                // Perhaps make it configurable?

                return true
            }
        }
        Err(err) => {
            println!("Error getting pending goals: {:?}", err);
        }
    }
    return false
}

#[tokio::main]
async fn main() {
    let db_connection = &mut db::establish_connection().unwrap();
    db_connection.run_pending_migrations(MIGRATIONS).unwrap();

    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let hide = CustomMenuItem::new("hide".to_string(), "Hide");

    let mut last_remind: chrono::NaiveDate = chrono::NaiveDate::from_ymd_opt(1970, 1, 1).unwrap();

    // Check for remind time every minute
    task::spawn(async move {
        let mut interval = time::interval(std::time::Duration::from_secs(60));

        loop {
            interval.tick().await;
            let remind_time = config::load().remind_time;
            if (last_remind < chrono::Local::now().naive_local().date()) && (chrono::Local::now().time() >= remind_time) {
                remind_if_goals_pending().await;
                last_remind = chrono::Local::now().naive_local().date();
            }
        }
    });

    let tray_menu = SystemTrayMenu::new()
        .add_item(hide)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(quit);

    let tray = SystemTray::new().with_menu(tray_menu);

    let app = tauri::Builder::default()
        .system_tray(tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::LeftClick { .. } => {
                println!("left click!");
                todo!("implement left click show action");
            }
            SystemTrayEvent::DoubleClick { .. } => {
                println!("double click");
            }
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
                    "quit" => {
                        app.exit(0);
                    }
                    _ => {}
                }
            }
            _ => {}
        })
        .setup(|app| {
            let item_handle = app.tray_handle().get_item("hide");
            let window = app.get_window("main").unwrap();

            let window_ = window.clone();

            window.on_window_event(move |event| match event {
                WindowEvent::Focused(false) => {
                    if !window_.is_visible().unwrap() {
                        item_handle.set_title("Show").unwrap();
                    }
                }
                _ => {}
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::get_goals,
            commands::get_goals_pending_reflection,
            commands::new_goal,
            commands::get_goal,
            commands::update_goal,
            commands::set_goal_removed,
            commands::create_goal_reflection,
            commands::get_settings,
            commands::save_settings
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
