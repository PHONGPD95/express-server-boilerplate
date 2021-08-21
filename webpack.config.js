const nodeExternals = require('webpack-node-externals');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
  ],
  resolve: {
    alias: {
      '~api': path.resolve(__dirname, './src/api'),
      '~middlewares': path.resolve(__dirname, './src/middlewares'),
      '~models': path.resolve(__dirname, './src/models'),
      '~utils': path.resolve(__dirname, './src/utils'),
    },
  },
};
