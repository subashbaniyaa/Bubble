/* Configure HTMLWebpack plugin */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/src/index.html',
    filename: 'index.html',
    inject: 'body'
});

/* Configure BrowserSync */
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const BrowserSyncPluginConfig = new BrowserSyncPlugin({
    host: 'localhost',
    port: 3000,
}, config = {
    reload: false
});

module.exports = {
    mode: "production",
    // devtool: "inline-source-map",
    entry: "./src/main.ts",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "main.built.js"
    },
    node: { fs: 'empty' },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                exclude: /[\/\\](node_modules|bower_components|public)[\/\\]/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(glsl|vs|fs|vert|frag|worker)$/,
                exclude: /node_modules/,
                use: 'raw-loader'
            }
        ]
    },
    plugins: [
      HTMLWebpackPluginConfig,
      ...(process.env.NODE_ENV === 'development' ? [BrowserSyncPluginConfig] : [])
    ]
};
