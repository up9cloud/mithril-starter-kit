const { resolve } = require('path')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const base = require('./webpack.base.js')

module.exports = merge(base, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [{
      test: /(\.css|\.styl)$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'stylus-loader',
          options: { sourceMap: false }
        }
      ]
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: resolve(__dirname, '..'),
      verbose: true,
      dry: false
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[hash].css',
      chunkFilename: 'css/[id]-[hash].css'
    }),
    new CopyWebpackPlugin([
      {
        from: resolve(__dirname, '../static'),
        to: '',
        ignore: ['.*']
      }
    ])
  ],
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
})
