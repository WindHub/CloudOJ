module.exports = function(config) {
  var gulp = require('gulp');
  var plumber = require('gulp-plumber'),
      livereload = require('gulp-livereload'),
      gulpif = require('gulp-if'),
      uglify = require('gulp-uglify'),
      concat = require('gulp-concat'),
      template = require('gulp-template'),
      requirejsOptimize = require('gulp-requirejs-optimize'),
      notify = require("gulp-notify");
  if(config.is_production) {
    gulp.task('source:javascript',[
      'source:javascript:requirejs',
      'source:javascript:production'
    ]);
    gulp.task('source:javascript:production', function(){
      return gulp.src([
        'src/production/**/*.js',
      ], { base: 'src' })
        .pipe(template({config: config}))
        .pipe(uglify())
        .pipe(gulp.dest('public/'));
    });
    gulp.task('source:javascript:requirejs', function() {
      return gulp.src([
        'src/app-bootstrap.js'
      ], { base: 'src' })
        .pipe(requirejsOptimize(config.requireConfig))
        .pipe(template({config: config}))
        .pipe(uglify())
        .pipe(gulp.dest('public/'));
    });
  } else {
    gulp.task('source:javascript', function(){
      return gulp.src([
        'src/**/*.js'
      ], { base: 'src' })
        .pipe(plumber({
          errorHandler: notify.onError("Error while building Javascript")
        }))
        .pipe(template({config: config}))
        .pipe(gulp.dest('public/'))
        .pipe(livereload());
        //.pipe(notify("Success in building Javascript"));
    });
  }
};
