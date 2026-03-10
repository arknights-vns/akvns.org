/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  "*.{js,mjs,ts,tsx}": ["oxlint", "oxfmt"],
};
