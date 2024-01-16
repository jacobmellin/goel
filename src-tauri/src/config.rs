use std::path::PathBuf;

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
    pub remind_time: chrono::NaiveTime
}

impl ::std::default::Default for GoelConfig {
    fn default() -> Self {
        let app_dirs = AppDirs::new(Some("goel"), false).unwrap();

        Self {
            version: 0u8,
            db_dir: app_dirs.data_dir,
            remind_time: NaiveTime::from_hms_opt(16,30,00).unwrap()
        }
    }
}

pub fn load() -> GoelConfig {
    confy::load("goel", None).unwrap()
}

pub fn merge(cfg: GoelConfigUpdate) {
    let mut saved_cfg = load();
    saved_cfg.remind_time = cfg.remind_time.or(Some(saved_cfg.remind_time)).unwrap();
    store(saved_cfg);
}

pub fn store(cfg: GoelConfig) {
    confy::store("goel", None, cfg).unwrap();
}
