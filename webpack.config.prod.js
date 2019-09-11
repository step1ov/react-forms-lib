const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.config.js');

const config = {
    devtool: 'source-map',
    plugins: [
        new UglifyJSPlugin({sourceMap: true}),
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')})
    ]
};

module.exports = [
    merge(common[0], config),
    merge(common[1], config)
];