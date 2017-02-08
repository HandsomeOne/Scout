/* eslint import/no-extraneous-dependencies: off */
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const { resolve } = require('path')
const precss = require('precss')
const postcss = require('postcss')

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
  new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
  new webpack.ContextReplacementPlugin(/moment(\/|\\)locale$/, /zh-cn/),
  new webpack.LoaderOptionsPlugin({
    options: { postcss: [postcss(precss), autoprefixer()] },
  }),
  new webpack.HotModuleReplacementPlugin(),
]
if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin())
}

module.exports = {
  context: resolve(__dirname, 'client'),
  entry: {
    main: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      './index.html',
      './index.jsx',
    ],
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
    filename: 'bundle.js',
    path: resolve(__dirname, 'static'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      {
        test: /\.css$/,
        include: /client/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]___[hash:base64:5]',
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.css$/,
        exclude: /client/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins,
  devServer: {
    contentBase: './client',
    hot: true,
    inline: true,
  },
}
