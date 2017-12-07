var config = require('./webpack.base.config')
const merge = require('webpack-merge')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
// 与webpack-dev-middleware配合需要使用到webpack-hot-middleware，在内存中使用时需要为入口文件添加一个'webpack-hot-middleware/client'

config.entry.push('webpack-hot-middleware/client')
module.exports = merge(config, {
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'),
    new webpack.DefinePlugin({
      // 'process.env': 'development'
    }),
    new HtmlWebpackPlugin({
      template: resolve("index.html")
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ]
})
