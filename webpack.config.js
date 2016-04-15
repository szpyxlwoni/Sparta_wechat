var path = require('path');
var webpack = require("webpack");
var node_modules = path.resolve(__dirname, 'node_modules');

var definePlugin = new webpack.DefinePlugin({
    __VERSION__:JSON.stringify(require("package")("./").version),
    DEBUG:true,
});

config = {
    entry: [
        path.resolve(__dirname, 'app/main.jsx')
    ],
    devtool : 'eval',
    resolve: {
        extensions: ['', '.js', '.jsx', '.ts', '.tsx'],
        modulesDirectories: ["node_modules"]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel?stage=0']
            },
            {
                test: /\.css$/, // Only .css files
                loader: 'style!css' // Run both loaders
            },
            {
                test: /\.json$/,
                loader: "json"
            },
            {
                test: /\.png/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.jpg/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.svg/,
                loader: 'url-loader?limit=8192'
            },
            {test: /\.woff$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            {test: /\.woff2$/, loader: "url?limit=10000&mimetype=application/font-woff2" },
            {test: /\.ttf$/,  loader: "url?limit=10000&mimetype=application/octet-stream" },
            {test: /\.eot$/,  loader: "file" },
            {test: /\.woff\?v=4\.5\.0$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            {test: /\.woff2\?v=4\.5\.0$/, loader: "url?limit=10000&mimetype=application/font-woff2" },
            {test: /\.ttf\?v=4\.5\.0$/,  loader: "url?limit=10000&mimetype=application/octet-stream" },
            {test: /\.eot\?v=4\.5\.0$/,  loader: "file" },
        ]
    },
    cache: true,
    plugins: [
        definePlugin
    ]
};

module.exports = config;



