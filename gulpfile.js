var gulp = require('gulp'),
	  less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    path = require('path');


// gulp all the things!
gulp.task('default', ['clean'], function() {
    gulp.start('views', 'styles', 'scripts', 'images');
});


// gulp the html
gulp.task('views', function() {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('public/'))
    .pipe(notify({ message: 'Views task complete' }));
});


// gulp the styles
gulp.task('styles', function () {
  return gulp.src('src/less/main.less')
    .pipe(less({ paths: [ path.join(__dirname, 'less', 'includes') ] }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 7', 'android 4'))
    .pipe(gulp.dest('./public/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./public/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});


// gulp the scripts
gulp.task('scripts', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./public/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});


// gulp the images
gulp.task('images', function() {
  return gulp.src('src/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('public/img'))
    .pipe(notify({ message: 'Images task complete' }));
});


// clean all the things!
gulp.task('clean', function(cb) {
    del(['public'], cb)
});


// watch for changes
gulp.task('watch', function() {
  // Watch .html files
  gulp.watch('src/**/*.html', ['views']);
  // Watch .less files
  gulp.watch('src/less/**/*.less', ['styles']);
  // Watch .js files
  gulp.watch('src/js/**/*.js', ['scripts']);
  // Watch image files
  gulp.watch('src/img/**/*', ['images']);
  // Create LiveReload server
  livereload.listen();
  // Watch any files in dist/, reload on change
  gulp.watch(['public/**']).on('change', livereload.changed);
});