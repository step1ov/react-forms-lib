const merge = require('webpack-merge');
const common = require('./webpack.config.js');

const config = {
    devtool: 'inline-source-map'
};

module.exports = [
    merge(common[0], config),
    merge(common[1], config)
];