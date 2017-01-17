const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('../config')
const utils = require('../utils')

module.exports = {
  entry: {
    vendor: utils.getDependencies()
  },
  output: {
    path: config.dll.dir,
    filename: '[name].dll.js',
    library: '[name]_library',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DllPlugin({
      path: 'manifest.json',
      name: '[name]_library',
      context: config.projectRoot,
    }),
    new ExtractTextPlugin('[name].dll.css'),
  ],
  resolve: {
    extensions: ['', '.js'],
    fallback: [path.join(__dirname, '../../node_modules')],
    alias: {'vue': 'vue/dist/vue.js'}
  },
  {{#vue}}
  vue: require('./config/vue.cfg.js'),
  {{/vue}}
  module: require('../module.cfg.js')
};
