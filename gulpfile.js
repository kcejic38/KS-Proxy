'use strict';
var gulp = require('gulp');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');

gulp.task('css', function() {
  return gulp.src(['./proxy/public/bootstrap-4.2.1/css/bootstrap.css',
  './proxy/public/style.css',
  './product-details/public/style/style.css',
  './product-view/public/style.css',
  './rating-review/public/style.css',
  '!./node_modules/**'
])
    .pipe(concatCss('styleCombined.css'))
    .pipe(gulp.dest('./proxy/public'));
});

gulp.task('bundle', () => {
  return gulp.src(['./product-view/public/bundle.js',
   './product-details/public/bundle.js',
   './rating-review/public/bundle.js'
  ])
    .pipe(concat('allBundles.js'))
    .pipe(gulp.dest('./proxy/public'));
})
