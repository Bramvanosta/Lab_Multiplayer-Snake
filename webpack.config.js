'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: __dirname + "/client/js/main.js",
    output: {
        path: __dirname + "/client/dist",
        filename: "[name].bundle.js"
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015']
            }
        }]
    },
    resolve: {
        root: [
            path.resolve('./client/js')
        ]
    }
};