const nodeExternals = require('webpack-node-externals');
const path = require('path');
const webpack = require('webpack');

const jsConfig = {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    query: {
        presets: [
            "@babel/env"
        ]
    }
};

const baseConfig = {
    module: {
        rules: [ jsConfig ]
	},
    devServer: {
        compress: true,
        port: 9000
    }
};

const libConfig = Object.assign({}, baseConfig, {
    entry: './src/lib/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'react-forms-lib.js',
        library: 'react-forms-lib',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        globalObject: 'this'
    },
    //externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
});

const exampleConfig = Object.assign({}, baseConfig, {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js'
    }
});

module.exports = [ libConfig, exampleConfig ];