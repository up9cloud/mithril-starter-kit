const { resolve, posix } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const assetsPath = function (_path) {
  return posix.join(_path)
}

module.exports = {
  context: resolve(__dirname, '../src'),
  entry: {
    main: './app.js'
  },
  output: {
    path: resolve(__dirname, '../dist'),
    filename: assetsPath('js/[name].[hash].js')
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          interpolate: true
        }
      },
      {
        test: /\.js$/,
        include: resolve(__dirname, '../src'),
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['env', 'stage-3'],
            plugins: [
              ['transform-react-jsx', {
                'pragma': 'm'
              }]
            ]
          }
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('media/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../index.html')
    }),
    new webpack.ProvidePlugin({
      m: 'mithril' // Global access
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}
