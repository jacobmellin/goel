use goel::config;
use std::fs::{self, File};
use std::io::Write;

#[test]
fn config_recreated_when_missing_key() {
    fs::create_dir_all("/tmp/goel").unwrap();

    // Write default config to file
    let path = "/tmp/goel/default-config.toml";
    let mut output = File::create(path).unwrap();
    output.write_all(b"
        version = 0
        db_dir = '/home/jacob/.local/share/goel'
        remind_time = '02:45:00'
    ").unwrap();

    let _cfg: crate::config::GoelConfig = confy::load_path("/tmp/goel/default-config.toml").unwrap();
}

#[test]
fn config_working_when_unknown_key() {
    fs::create_dir_all("/tmp/goel").unwrap();

    // Write default config to file
    let path = "/tmp/goel/default-config.toml";
    let mut output = File::create(path).unwrap();
    output.write_all(b"
        version = 0
        db_dir = '/home/jacob/.local/share/goel'
        remind_time = '02:45:00'
        show_when_reminding = true
        test = true
    ").unwrap();

    let _cfg: crate::config::GoelConfig = confy::load_path("/tmp/goel/default-config.toml").unwrap();
}
