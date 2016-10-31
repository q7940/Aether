const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    app: './src/index.jsx',
    vendor: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'redux-immutable',
      'redux-thunk',
      'react-router',
      'socket.io-client',
    ],
  },
  output: {
    path: '../server/public',
    filename: '[name]_[chunkHash:8].js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', '!css?modules&localIdentName=[hash:base64:5]!postcss'),
      // extract函数中,style-loader需要单独作为第一个参数，不能连写
      // css-module提供模块化的css，局部类名
      // postcss是提供多种插件的平台，包括autoprefixed(自动补全浏览器前缀),precss(提供类似sass的语法)等
    }, {
      test: /\.(png|jpg|jpeg|gif)\??.*$/,
      loader: 'url?limit=8192',
    }],
  },
  postcss() {
    return [autoprefixer, precss];
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin(['public'], {
      root: path.join(__dirname, '../server'),
    }),
    new HtmlWebpackPlugin({
      title: 'Aether',
      template: './src/assets/index.ejs',
      inject: 'body',
    }),
    new ExtractTextPlugin('style_[contenthash:8].css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
  ],
};