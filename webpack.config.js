const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    mode: "production", // Set mode to production
    entry: "./src/main.ts",
    output: {
        path: path.resolve(__dirname, 'dist'), // Output to 'dist' directory
        filename: "main.built.js" // The built JS file
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(glsl|vs|fs|vert|frag|worker)$/,
                exclude: /node_modules/,
                use: 'raw-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            reload: false
        })
    ]
};