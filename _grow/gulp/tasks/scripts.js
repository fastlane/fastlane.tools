'use strict';

var config = require('../config');
var gulp = require('gulp');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('build_js', function() {
  return gulp
    .src(config.Path.JS_SOURCES)
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(config.Path.JS_OUT_DIR));
});
