const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const base = require('./webpack.base.js')

module.exports = merge(base, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, '..', 'static'),
    port: 3000,
    proxy: {
      '/api': 'http://localhost:3001'
    },
    publicPath: '/'
    // overlay: {
    //   errors: true,
    //   warnings: true
    // }
  },
  module: {
    rules: [{
      test: /(\.css|\.styl)$/,
      use: [
        'css-hot-loader',
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'stylus-loader',
          options: { sourceMap: false }
        }
      ]
    }, {
      test: /\.js$/,
      enforce: 'pre',
      exclude: /node_modules/,
      loader: 'eslint-loader',
      options: {
        cache: true,
        emitWarning: true,
        // Fail only on errors
        failOnWarning: false,
        failOnError: false,
        // Toggle autofix
        fix: false,
        formatter: require('eslint/lib/formatters/stylish')
      }
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
})
