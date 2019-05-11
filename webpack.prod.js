const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const cssnano = require('cssnano');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Visualizer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');

module.exports = merge.smart(common, {
  mode: 'production',
  output: {
    filename: '[name].[chunkhash:4].bundle.js',
    chunkFilename: '[name].[chunkhash:4].bundle.js',
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ parallel: 3, cache: true, terserOptions: { toplevel: true } })],
    runtimeChunk: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          'html-loader',
          {
            loader: 'posthtml-loader',
            options: {
              ident: 'posthtml',
              plugins: [require('htmlnano')({ removeEmptyAttributes: false })],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      canPrint: true,
      cssProcessorOptions: {
        preset: ['default', { discardComments: { removeAll: true }, safe: true }],
      },
    }),
    new Visualizer({ analyzerMode: 'static' }),
    new WebpackAssetsManifest({ integrity: true }),
  ],
});
