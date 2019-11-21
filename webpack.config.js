//eslint-disable-var-no-requires
/*eslint @typescript-eslint/no-var-requires:0*/
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    // Set debugging source maps to be "inline" for simplicity and ease of use
    devtool: "inline-source-map",

    // The application entry point
    entry: path.join(__dirname, "/src/index.tsx"),

    // Where to compile the bundle
    // By default the output directory is `dist`
    output: {
        filename: "build.js",
        path: path.join(__dirname, "/build")
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
            },
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader"]
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
        new CopyWebpackPlugin([
            {
                //Note:- No wildcard is specified hence will copy all files and folders
                from: 'public', //Will resolve to RepoDir/public
                to: '.' //Copies all files from above dest to build/
            }
        ]),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public/index.html")
        })
    ]
};