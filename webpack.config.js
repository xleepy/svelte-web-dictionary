const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

const DotEnv = require('dotenv-webpack');

const BUILD_DIR = 'dist';

module.exports = {
  entry: {
    bundle: ['./src/main.js'],
  },
  node: { global: true, fs: 'empty' },
  resolve: {
    alias: {
      svelte: path.resolve('node_modules', 'svelte'),
    },
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
  },
  output: {
    path: path.resolve(__dirname, BUILD_DIR),
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
          options: {
            emitCss: true,
            hotReload: true,
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          /**
           * MiniCssExtractPlugin doesn't support HMR.
           * For developing, use 'style-loader' instead.
           * */
          prod ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  mode,
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: './public/global.css', to: 'global.css' }],
    }),
    new DotEnv({
      systemvars: process.env.NODE_ENV === 'production',
    }),
  ],
  devtool: prod ? false : 'source-map',
};
