// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  projectRoot: path.resolve(__dirname, '../../'),
  build: {
    env: require('./env/prod.env.js'),
    assetsRoot: path.resolve(__dirname, '../../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./env/dev.env.js'),
    port: 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  },
  dll: {
    dir: path.resolve(__dirname, '../../lib/dll'),
    assetsDllDirectory: 'dll',
    assetsDllRoot: path.resolve(__dirname, '../../dist/dll'),
    jsName: '/dll/vendor.dll.js',
    cssName: '/dll/vendor.dll.css'
  },
  static: {
    dir: path.resolve(__dirname, '../../static'),
    assetsRoot: path.resolve(__dirname, '../../dist/static'),
  }
}
