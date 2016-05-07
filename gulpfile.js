var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    htmlreplace = require('gulp-html-replace'),
    path = require('path'),
    swPrecache = require('sw-precache'),
    cleanCSS = require('gulp-clean-css'),
    concatCss = require('gulp-concat-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

gulp.task('default', function() {

});

gulp.task('pages', function() {
  gulp.src(['app/pages/**/*']).pipe(gulp.dest('dist/pages'));
});

gulp.task('minify-css', function() {
  return gulp.src(['app/styles/*.css',
                  'http://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic',
                  'bower_components/font-awesome/css/font-awesome.min.css'])
    .pipe(concatCss('styles-1.0.0.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));

});

gulp.task('images', function() {
  gulp.src(['app/images/**/*']).pipe(gulp.dest('dist/images'));
});

gulp.task('compress', function() {
  return gulp.src(['app/*.js',
                  'app/controllers/*.js',
                  'app/factories/*.js',
                  'app/funcs/*.js',
                  'http://maps.google.com/maps/api/js?key=AIzaSyB9_u4aR59ZqmlaHNGv96wRhiexLoYu26A',
                  'bower_components/jquery/dist/jquery.min.js',
                  'bower_components/angular/angular.min.js',
                  'bower_components/angular-route/angular-route.min.js',
                  'bower_components/angular-aria/angular-aria.min.js',
                  'bower_components/angular-animate/angular-animate.min.js',
                  'bower_components/firebase/firebase.js',
                  'bower_components/angularfire/dist/angularfire.js',
                  'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                  'bower_components/idbwrapper/idbstore.min.js'])
    .pipe(uglify())
    .pipe(concat('scripts-1.0.0.min.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: ["app"],
            index: "index.html",
            routes: {
                "/bower_components": "bower_components"
            }
        },
        browser: "google chrome canary"
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
gulp.task('dist', ['minify-css', 'compress', 'pages', 'images']);
