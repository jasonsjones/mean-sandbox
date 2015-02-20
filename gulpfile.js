var gulp = require('gulp');
var jshint = require('gulp-jshint');
var plug = require('gulp-load-plugins');

var source = [
    './public/*.js',
    './public/app/**/*.js'
];

gulp.task('jshint', function () {
    return gulp
        .src(source)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe(jshint.reporter('fail'));
});