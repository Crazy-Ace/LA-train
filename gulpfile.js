var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    htmlreplace = require('gulp-html-replace'),
    path = require('path'),
    swPrecache = require('sw-precache');

gulp.task('default', function() {

});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: ["app"],
            index: "index.html",
            routes: {
                "/bower_components": "bower_components"
            }
        }
    });

    console.log('## servidor iniciado ##');

    gulp.watch('dev/**/*').on('change', browserSync.reload);
    gulp.watch('app/**/*').on('change', browserSync.reload);

    gulp.watch('src/js/**/*.js').on('change', function(event) {
        console.log("Linting " + event.path);
        gulp.src(event.path)
            .pipe(jshint())
            .pipe(jshint.reporter(jshintStylish));
    });
});

gulp.task('generate-sw', function(callback) {
  var rootDir = 'app';

  swPrecache.write(path.join(rootDir, 'service-worker.js'), {
    staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif}'],
    stripPrefix: rootDir
  }, callback);
});

gulp.task('server', ['serve','generate-sw']);
