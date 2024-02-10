// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod config;
mod db;
mod commands;

use tokio::{task, time};
use diesel_migrations::{
    embed_migrations,
    EmbeddedMigrations,
    MigrationHarness};
use tauri::{
    CustomMenuItem,
    Manager, 
    SystemTray, 
    SystemTrayEvent, 
    SystemTrayMenu, 
    SystemTrayMenuItem,
    WindowEvent,
    api::notification, 
    AppHandle,
};

pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!("migrations");

async fn remind_if_goals_pending(app_handle: &AppHandle) -> bool {
    match db::get_goals_pending_reflection() {
        Ok(goals) => {
            if goals.len() > 0 {
                app_handle.emit_to("main", "goal-reminded", &goals).unwrap();

                let notification = notification::Notification::new("GoelReminder");

                let icon_path = app_handle.path_resolver()
                    .resolve_resource("icons/icon.png").unwrap();

                let _ = notification.title("Goel")
                    .body("📝 Time to track your progress!")
                    // TODO: Find a way to display goel icon here
                    .icon(icon_path.display().to_string())
                    .show();

                let window = app_handle.get_window("main").unwrap();
                if config::load().show_when_reminding && !window.is_visible().unwrap() {
                    window.show().unwrap();
                    app_handle.emit_to("main", "shown-after-remind", &goals.len()).unwrap();
                }

                return true
            }
        }
        Err(err) => {
            println!("Error getting pending goals: {:?}", err);
        }
    }
    return false
}

fn init_pending_goal_reminder(app_handle: &AppHandle) {
    let mut last_remind: chrono::NaiveDate = chrono::NaiveDate::from_ymd_opt(1970, 1, 1).unwrap();
    let app_handle_ = app_handle.clone();

    // Check for remind time every minute
    task::spawn(async move {
        let mut interval = time::interval(std::time::Duration::from_secs(60));

        loop {
            interval.tick().await;
            let remind_time = config::load().remind_time;
            let today = chrono::Local::now().naive_local().date();
            let now = chrono::Local::now().time();
            let cfg = config::load();

            if (last_remind < today) && (now >= remind_time) && cfg.enable_reminder  {
                remind_if_goals_pending(&app_handle_).await;
                last_remind = chrono::Local::now().naive_local().date();
            }
        }
    });
}

#[tokio::main]
async fn main() {
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

            init_pending_goal_reminder(&app.app_handle());


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
            commands::save_settings,
            commands::get_goal_reflections,
            commands::set_reminder_enabled
        ])
        .run(tauri::generate_context!())
        .expect("Error running tauri application");
}
