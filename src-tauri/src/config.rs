use std::path::PathBuf;

use serde::{Serialize, Deserialize};
use platform_dirs::AppDirs;

#[derive(Debug, Serialize, Deserialize)]
pub struct GoelConfig {
    pub version: u8,
    pub db_dir: PathBuf
}

impl ::std::default::Default for GoelConfig {
    fn default() -> Self {
        let app_dirs = AppDirs::new(Some("goel"), false).unwrap();

        Self {
            version: 0,
            db_dir: app_dirs.data_dir
        }
    }
}


