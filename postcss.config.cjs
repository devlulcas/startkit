const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const postcssNesting = require("postcss-nesting");

module.exports = {
	plugins: [tailwindcss, autoprefixer, postcssNesting],
};
