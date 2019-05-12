const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const cssnano = require('cssnano');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Visualizer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const WebpackAssetsManifest = require('webpack-assets-manifest');

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
    usedExports: true,
    // splitChunks: {
    //   chunks: 'all',
    //   maxInitialRequests: Infinity,
    //   minSize: 0,
    //   cacheGroups: {
    //     vendor: {
    //       test: /[\\/]node_modules[\\/]/,
    //       name(module) {
    //         // get the name. E.g. node_modules/packageName/not/this/part.js
    //         // or node_modules/packageName
    //         const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
    //
    //         // npm package names are URL-safe, but some servers don't like @ symbols
    //         return `npm.${packageName.replace('@', '')}`;
    //       },
    //     },
    //   },
    // },
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
    new CompressionPlugin(),
    // new webpack.HashedModuleIdsPlugin(),
  ],
});
