use std::{fs, path::PathBuf};

use chrono::NaiveTime;
use serde::{Serialize, Deserialize};
use platform_dirs::AppDirs;

#[derive(Debug, Deserialize)]
pub struct GoelConfigUpdate {
    pub remind_time: Option<chrono::NaiveTime>
}

#[derive(Debug, Serialize, Deserialize)]
pub struct GoelConfig {
    pub version: u8,
    pub db_dir: PathBuf,
    pub remind_time: chrono::NaiveTime,
    pub show_when_reminding: bool
}

impl ::std::default::Default for GoelConfig {
    fn default() -> Self {
        let app_dirs = AppDirs::new(Some("goel"), false).unwrap();

        Self {
            version: 0u8,
            db_dir: app_dirs.data_dir,
            remind_time: NaiveTime::from_hms_opt(16,30,00).unwrap(),
            show_when_reminding: true
        }
    }
}

pub fn load() -> GoelConfig {
    match confy::load("goel", None) {
        Ok(config) => config,
        Err(err) => {
            match err {
                confy::ConfyError::BadTomlData(_) => {
                    let app_dirs = AppDirs::new(Some("goel"), false).unwrap();
                    let mut config = app_dirs.config_dir.into_os_string();
                    let mut config_renamed = config.clone();
                    config.push("/default-config.toml");
                    config_renamed.push("/default-config.toml-");
                    let timestamp = chrono::Local::now();
                    config_renamed.push(timestamp.format("%Y%m%d%H%M%S").to_string());
                    fs::rename(config, config_renamed).unwrap();
                    load()
                },
                _ => panic!("{}", err.to_string())
            }
        }
    }
}

pub fn merge(cfg: GoelConfigUpdate) {
    let mut saved_cfg = load();
    saved_cfg.remind_time = cfg.remind_time.or(Some(saved_cfg.remind_time)).unwrap();
    store(saved_cfg);
}

pub fn store(cfg: GoelConfig) {
    confy::store("goel", None, cfg).unwrap();
}
