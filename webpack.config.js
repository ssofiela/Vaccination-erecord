const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    // Set debugging source maps to be "inline" for simplicity and ease of use
    devtool: "inline-source-map",

    // The application entry point
    entry: path.join(__dirname, "/src/index.tsx"),

    // Where to compile the bundle
    // By default the output directory is `dist`
    output: {
        filename: "build.js",
        path: path.join(__dirname, "/build"),
        publicPath: "/"
    },

    // Supported file loaders
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },

    devServer: {
        historyApiFallback: true
    },

    // File extensions to support resolving
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public/index.html")
        })
    ]
};