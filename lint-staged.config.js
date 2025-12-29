/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
    "*.{js,mjs,ts,tsx}": [
        "npm run format -- --staged --no-errors-on-unmatched",
        "npm run format:unsafe -- --staged --no-errors-on-unmatched",
    ],
};
