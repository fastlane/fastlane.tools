const gulp = require('gulp');
const webpack = require('webpack-stream');
const gutil = require('gulp-util');
const config = require('../config');

let cfg = process.env.NODE_ENV == 'production' ? 'prod' : 'config';
console.log(`Using ${cfg} build.`);

gulp.task('build_js', function() {
  return gulp.src(config.Path.JS_ENTRY)
  .pipe(webpack(require(`../../webpack.${cfg}`)))
  .on('error', function handleError() {
    console.log(new gutil.PluginError('JS', 'Error', { showStack: true }))
    this.emit('end');
  })
  .pipe(gulp.dest(config.Path.JS_OUT_DIR));
})