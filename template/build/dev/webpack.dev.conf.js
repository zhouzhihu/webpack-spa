var path = require('path')
var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('../utils')
var baseWebpackConfig = require('../webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev/dev-client'].concat(baseWebpackConfig.entry[name])
})

var webpackConfig = merge(baseWebpackConfig, {
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
    new webpack.NoErrorsPlugin()
  ]
})


var pages = utils.getEntryPages('./src/modules/**/app.js')
for(var page in pages) {
  var conf = {
    filename: page + '.html',
    template: './index.html',
    jsName: config.dll.jsName,
    cssName: config.dll.cssName,
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    },
    excludeChunks: Object.keys(pages).filter(item => {
      return (item != page)
    })
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf))
}

module.exports = webpackConfig
