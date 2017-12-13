const merge = require('webpack-merge');
const config = require('./webpack.config');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(config, {
  plugins: [new UglifyJSPlugin()]
});
