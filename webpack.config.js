const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "custom-select.js",
        path: path.resolve(__dirname, "dist"),
        library: "CustomSelect",
        libraryTarget: "umd",
        libraryExport: "default",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
        ],
    },
};
