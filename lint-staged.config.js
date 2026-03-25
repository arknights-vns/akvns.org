// noinspection JSUnusedGlobalSymbols

/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  "*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}": ["oxlint", "oxfmt"],
};
