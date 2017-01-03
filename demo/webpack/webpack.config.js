var webpack = require("webpack");
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    main: "./dev/js/main.js",
    index:"./dev/js/index.js",
    vendor:['react'],
  },
  output: {
    path: "./dist",
    filename: "[name].js",
    publicPath: "diast",
    //   chunkFilename: "[id].bundle.js"
    //   hotUpdateChunkFilename:'[name].[hash].js'
    //   chunkFilename:"[name]-[chunkhash].js",
  },
  module: {
    loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ["es2015", "stage-2"],
                plugins: [
                    "transform-class-properties",
                    "transform-runtime"
                ]
            }
        },
        {
          test: /\.(gif|jpg|png)$/,
          loader: 'url-loader?limit=8989898989&name=img/[name].[ext]'
        },
        // {
        //   test: /\.css$/,
        //   loader: ['style','css'].join('!')
        // }
        {
            test: /\.(scss|sass|css)$/,
            loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'postcss-loader'])
        },
        {
            test: /\.(woff2|svg|eot|ttf)$/,
            loader: "file-loader?name=fonts/[name].[ext]"
        }
    ]
  },
  devtool: '#source-map',
  postcss: function() {
        return [autoprefixer];
  },
  plugins: [
      new ExtractTextPlugin('[name].css'),
      new webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: false
          }
      }),
      new webpack.optimize.CommonsChunkPlugin({
          names: ['vendor'],
      }),
      // new webpack.optimize.OccurenceOrderPlugin()
  ],
}
if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ])
}

