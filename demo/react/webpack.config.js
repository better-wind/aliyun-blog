var webpack = require("webpack");
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        index:__dirname + '/dev/js/demo.js',
        immu:__dirname + '/dev/js/immudemo.js',
        reduxdemo:__dirname + '/dev/js/reduxdemo.js',
    },
    output: {
        path: __dirname + '/dist',
        filename: "[name].js"
    },
    eslint: {
        configFile: __dirname + '/.eslintrc.js',
    },
    module: {
        loaders: [
            {
                test: /\.(json)$/,
                exclude: /node_modules/,
                loader: 'json',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: ['babel','eslint-loader'].join('!')
            },
            {
                test: /\.(scss|sass|css)$/,
                loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'postcss-loader'])
            }
        ]
    },
    devtool: '#source-map',
    postcss: function() {
        return [autoprefixer];
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    ],
}
// if (process.env.NODE_ENV === 'production') {
//     module.exports.devtool = '#source-map'
//     module.exports.plugins = (module.exports.plugins || []).concat([
//         new webpack.DefinePlugin({
//             'process.env': {
//                 NODE_ENV: '"production"'
//             }
//         }),
//         new webpack.optimize.UglifyJsPlugin({
//             compress: {
//                 warnings: false
//             }
//         }),
//         new webpack.optimize.OccurenceOrderPlugin()
//     ])
// }

