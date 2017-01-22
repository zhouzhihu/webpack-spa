var path = require('path')
var webpack = require('webpack')
var config = require('./config')
var utils = require('./utils')
var merge = require('webpack-merge')
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: utils.getEntries('./src/modules/**/app.js'),
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  plugins: [
    {{#jQuery}}
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery'
    }),
    {{/jQuery}}
    new CopyWebpackPlugin([
      {{#if_eq frontFrame "angularJS"}}
      {
        from: config.static.dir,
        to: config.static.assetsRoot
      },
      {{/if_eq}}
      {
        from: config.dll.dir,
        to: config.dll.assetsDllRoot
      }
    ]),
    new webpack.DllReferencePlugin({
      context: config.projectRoot,
      manifest: require('../manifest.json'),
      name: 'vendor_library'
    })
  ],
  resolve: {
    extensions: ['', '.js'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: merge({'vue': 'vue/dist/vue.js'}, utils.getComponentsPath('./src/components/**/index.js'))
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  {{#if_eq frontFrame "vue"}}
  vue: require('./vue.cfg.js'),
  {{/if_eq}}
  {{#lint}}
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  {{/lint}}
  module: require('./module.cfg.js')
}
