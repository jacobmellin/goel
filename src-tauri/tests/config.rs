use goel::config;

#[test]
fn config_merged_when_missing_key() {
    let cfg: crate::config::GoelConfig = confy::load("goel", None).unwrap();
}

fn config_created_when_not_exist() {
    let cfg: crate::config::GoelConfig = confy::load("goel", None).unwrap();
}

fn config_working_when_unknown_key() {
    let cfg: crate::config::GoelConfig = confy::load("goel", None).unwrap();
}
