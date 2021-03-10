/* eslint-env node */
const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            // CSSを別ファイルに出力
            loader: MiniCssExtractPlugin.loader
          },
          {
            // CSSを読み込み
            loader: 'css-loader',
            options: {
              url: true,
              sourceMap: true,
            },
          },
          {
            // Sassを読み込み
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers'),
              },
              sourceMap: true,
            },
          },
        ],
      },
      {
        // リソースをData URLで埋め込み
        test: /\.(gif|png|jpg|eot|wof|woff|woff2|ttf|svg)$/,
        loader: 'url-loader',
      }
    ],
  },
  entry: {
    'main':  './src/main/main.js',
    'options/script': './src/options/script.js',
    'popup/script': './src/popup/script.js'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist')
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './src/manifest.json' },
        { from: './src/icons', to: 'icons' },
        { from: './src/popup/**/*.{html,svg}',   to: './popup/[name].[ext]' },
        { from: './src/options/**/*.{html,svg}', to: './options/[name].[ext]' },
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
  ],
  mode: 'development',
  devtool: 'inline-cheap-source-map',
  resolve: {
    alias: {
      // ライブラリファイルのエイリアス
      Lib: path.join(__dirname, 'src/lib.js'),
    }
  },
  stats: {
    builtAt: true,
    errorsCount: true,
    warningsCount: true,
    timings: true,
  },
  watchOptions: {
    ignored: /(node_modules)|(dist)/
  }
}
