use std::fs;

use goel::db::establish_connection;
use goel::config;

#[test]
fn user_app_cache_created_when_init_db() {
    let cfg: crate::config::GoelConfig = confy::load("goel", None).unwrap();
    let db_dir = cfg.db_dir;

    establish_connection().unwrap(); 

    assert!(fs::metadata(db_dir).unwrap().is_dir());
}

// TODO
// - User config does not exist
// - User config has missing value
// - User config has invalid format
