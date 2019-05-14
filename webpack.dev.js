/* eslint-disable import/no-extraneous-dependencies,node/no-unpublished-require */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge.smart(common, {
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: './bundle.js',
  },
  target: 'web',
  devtool: 'inline-source-map',
  mode: process.env.NODE_ENV || 'development',
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()],
});
