var path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_DIR = __dirname;

function _path(relativePath) {
    return path.resolve(ROOT_DIR, relativePath);
}

module.exports = {
    entry: _path('src/index.js'),
    output: {
        filename: 'test-bundle.js',
        path: _path('build')
    },
    module: {
        loaders: [
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                loader: 'babel'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: _path('src/index.html')
        })
    ]
};