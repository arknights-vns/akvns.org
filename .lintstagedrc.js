const path = require("node:path");

/**
 * @param filenames {string[]}
 * @returns {`npm run format -- ${string}`}
 */
const buildEslintCommand = filenames =>
    `npm run format -- ${filenames
        .map(f => path.relative(process.cwd(), f))
        .join(" ")}`;

module.exports = {
    "*.{js,mjs,ts,tsx}": [buildEslintCommand],
};
