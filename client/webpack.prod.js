// Webpack uses this to work with directories
const path = require("path");
module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname),
		publicPath: "",
		filename: "main.js",
	},
	mode: "production",

	devServer: {
		static: {
			directory: path.join(__dirname),
		},
		compress: true,
		port: 3000,
	},
};
