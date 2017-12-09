'use strict';

var config = require('../config');
var gulp = require('gulp');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('build_css', function() {
  return gulp
    .src(config.Path.CSS_SOURCES)
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(autoprefixer())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(config.Path.CSS_OUT_DIR));
});
