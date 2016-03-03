/*

>> Usage
npm install
./node_modules/.bin/gulp build

 */

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('build', function() {
    gulp.src(['js/app.js'])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js/'));
});