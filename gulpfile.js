var gulp        = require('gulp');
var browserSync = require('browser-sync').create();


// Static Server + watching html files
gulp.task('serve', () => {
  browserSync.init({
      server: "./app",
  });

  gulp.watch(["app/*.html", "app/*.css", "app/*.js"]).on('change', browserSync.reload);
});


gulp.task('default', gulp.series('serve'));
