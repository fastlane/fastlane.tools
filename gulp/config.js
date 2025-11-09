const path = require('path');

module.exports = {
  Path: {
    SASS_SOURCES: './source/sass/**/*.{sass,scss}',
    CSS_OUT_DIR: './build/assets/css/',
    JS_ENTRY: './source/js/main.js',
    JS_SOURCES: ['./source/js/main.js', './source/js/**/*.js'],
    JS_OUT_DIR: './build/assets/js/'
  }
}
