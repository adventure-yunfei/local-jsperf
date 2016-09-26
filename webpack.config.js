var path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_DIR = __dirname;

function _path(relativePath) {
    return path.resolve(ROOT_DIR, relativePath);
}

function makeStyleLoader (preCssLoader) {
    preCssLoader = preCssLoader ? ('!' + preCssLoader) : '';
    return 'style!css!postcss' + preCssLoader;
}

module.exports = {
    entry: _path('src/main.ts'),
    output: {
        filename: 'app.js',
        path: _path('build'),
        publicPath: '/build'
    },
    module: {
        loaders: [
            {
                test: /\.ts$/i,
                loader: 'ts'
            },
            {
                test: /\.less$/i,
                loader: makeStyleLoader('less')
            },
            {
                test: /\.css$/i,
                loader: makeStyleLoader()
            },
            {
                test: /\.html$/i,
                loader: 'html'
            }
        ]
    },
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: _path('src/index.html')
        })
    ]
};
