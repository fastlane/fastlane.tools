const path = require('path');
const config = require('./gulp/config')

module.exports = {
  entry: config.Path.JS_ENTRY,
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'main.min.js'
  },
  resolve: {
    alias: {
      fl: path.resolve(__dirname, 'source/js'),
      utils$: path.resolve(__dirname, 'source/js/globals/utils.js')
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|gulp)/,
        query: {
          presets: ['babel-preset-env']
        }
      }
    ]
  }
};
