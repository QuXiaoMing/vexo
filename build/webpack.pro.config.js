var config = require('./webpack.base.config')
const merge = require('webpack-merge')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(config, {
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    // new webpack.BannerPlugin('版权所有，翻版必究'),
    // new webpack.optimize.CommonsChunkPlugin('common.[hash].js'),
    new CleanWebpackPlugin(
      ['dist']
    ),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      template: resolve("index.html") //new 一个这个插件的实例，并传入相关的参数
    }),
  ]
})
