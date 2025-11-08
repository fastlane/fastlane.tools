'use strict';

var config = require('../config');
var gulp = require('gulp');

gulp.task('watch', function() {
    gulp.watch(config.Path.SASS_SOURCES, gulp.series('build_css'));
    gulp.watch(config.Path.JS_SOURCES, gulp.series('build_js'));
});
