/* eslint import/no-extraneous-dependencies: off */
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const path = require('path')

const plugins = [
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
  new webpack.EnvironmentPlugin(['NODE_ENV']),
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
  }))
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
        loaders: [
          'style-loader',
          'css-loader?modules&sourceMap&localIdentName=[local]___[hash:base64:5]',
          'postcss-loader',
        ],
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
  postcss: [autoprefixer()],
  plugins,
  devServer: {
    contentBase: './client',
    hot: true,
    inline: true,
  },
}
