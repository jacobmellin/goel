module.exports = {
    env: {
        browser: true,
        node: true
    },
    overrides: [
        {
            files:['webdriver/webdriverio/test/**/*.mjs'],
            env : {
                "mocha": true,
                "jquery": true
            },
            globals: {
                expect: true
            }
        },
    ],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    "ignorePatterns": ["**/node_modules/**", "**/dist/**", "**/src-tauri/target/**"],
    root: true
};
