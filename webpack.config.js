/* eslint import/no-extraneous-dependencies: off */
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const path = require('path')
const precss = require('precss')
const postcss = require('postcss')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const plugins = [
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
  new webpack.EnvironmentPlugin(['NODE_ENV']),
  new webpack.ContextReplacementPlugin(/moment(\/|\\)locale$/, /zh-cn/),
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
    }),
    new ExtractTextPlugin('bundle.css'))
} else {
  plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = {
  context: path.join(__dirname, './client'),
  entry: {
    jsx: './index.jsx',
    html: './index.html',
    vendor: [
      'd3',
      'isomorphic-fetch',
      'moment',
      'react',
      'react-dom',
      'react-router',
    ],
  },
  output: {
    path: path.join(__dirname, './static'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]',
      },
      {
        test: /\.css$/,
        include: /client/,
        loader: process.env.NODE_ENV === 'production' ?
          ExtractTextPlugin.extract('style-loader', 'css-loader?modules&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss-loader') :
          'style-loader!css-loader?modules&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss-loader',
      },
      {
        test: /\.css$/,
        exclude: /client/,
        loader: 'style!css',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel'],
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  postcss: [postcss(precss), autoprefixer()],
  plugins,
  devServer: {
    contentBase: './client',
    hot: true,
    inline: true,
  },
}
