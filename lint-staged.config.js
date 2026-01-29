/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  "*.{js,mjs,ts,tsx}": ["biome check --write . --staged --no-errors-on-unmatched"],
};
