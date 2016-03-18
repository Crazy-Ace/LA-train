var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    htmlreplace = require('gulp-html-replace');

gulp.task('default', function() {

});

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: ["app", "dev"],
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
