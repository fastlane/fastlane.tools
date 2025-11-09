var fs = require('fs');
var gulp = require('gulp');

/**
 * This will load all js or coffee files in the gulp directory
 * in order to load all gulp tasks
 */
fs.readdirSync('./gulp/tasks').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/tasks/' + file);
});

var build = gulp.parallel('build_js', 'build_css', 'build_redirects');
gulp.task('build', build);
gulp.task('default', gulp.series('build', 'watch'));
