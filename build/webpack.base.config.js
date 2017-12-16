const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const compileMD = require('./compile-md')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});
var path = require('path')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  devtool: 'eval-source-map',
  entry: [resolve('/src/main.js')],
  output: {
    path: resolve('/dist'),
    filename: 'bundle-[hash].js'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
  },
  devServer: {
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true,//实时刷新,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader"
          }
        ]
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: "vue-markdown-loader",
            options: {
              wrapper: 'article',
              preprocess: function (markdownIt, source) {
                return compileMD(source)
              },
            }
          }
        ]
      },
      {
        test: /(\.js)$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }],
          // use style-loader in development 
          fallback: "style-loader"
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/[name].css'),
  ]
}
