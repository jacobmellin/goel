module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    "ignorePatterns": ["**/node_modules/**", "**/dist/**", "**/src-tauri/target/**"],
    root: true
};
