const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    `${path.resolve(__dirname, 'public')}/index.js`,
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: './bundle.js',
  },
  devtool: 'source-map',
  mode: process.env.NODE_ENV || 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: /public/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(s*)css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, 'public'), 'node_modules'],
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
