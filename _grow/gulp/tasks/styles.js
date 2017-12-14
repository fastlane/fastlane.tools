const config = require('../config');
const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const gutil = require('gulp-util');

gulp.task('build_css', function() {
  return gulp
    .src(config.Path.CSS_SOURCES)
    .pipe(sassGlob())
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .on('error', function handleError(e) {
      console.log(new gutil.PluginError('SCSS', e).message)
      this.emit('end');
    })
    .pipe(autoprefixer())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(config.Path.CSS_OUT_DIR));
});
