const { resolve } = require('path')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const {
  HotModuleReplacementPlugin,
  NamedModulesPlugin,
  // optimize: { CommonsChunkPlugin },
} = require('webpack')

const DEV = process.env.NODE_ENV === 'development'

module.exports = {
  devServer: {
    hot: true,
  },
  devtool: 'source-map',
  entry: {
    main: DEV ? [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './src/index.js',
    ] : [
      './src/index.js',
    ],
  },
  output: {
    filename: '[name].js',
    path: resolve('./dist'),
    publicPath: './dist/',
    libraryTarget: DEV ? 'umd' : 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: [
          'babel-loader',
        ],
        exclude: [
          resolve('./node_modules'),
        ],
      },
      {
        test: /\.css$/,
        loaders: /* ExtractTextPlugin.extract({
        loader: */ [
          'style-loader',
          'css-loader?modules&importLoaders=1&sourceMap',
          'postcss-loader?sourceMap',
        ],
        /* }), */
      },
      {
        test: /\.scss$/,
        loaders: /* ExtractTextPlugin.extract({
        loader: */[
          'style-loader',
          'css-loader?importLoaders=1&sourceMap',
          'sass-loader?sourceMap',
          'postcss-loader?sourceMap',
        ],
        /*}),*/
      },
      {
        test: /\.(png|jpg)$/,
        loaders: [
          'file-loader',
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    // new ExtractTextPlugin({
    //   filename: 'bundle.css',
    //   allChunks: true,
    // }),
    new BrowserSyncPlugin(
      {
        host: 'localhost',
        port: 3000,
        proxy: 'http://localhost:8080/dist/main',
      },
      {
        reload: false,
      }
    ),
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin(),
  ],
}