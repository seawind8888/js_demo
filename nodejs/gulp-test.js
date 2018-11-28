const gulp = require('gulp')

gulp.src('nodejs/eee/**/*')
    .pipe(gulp.dest('nodejs/aaa'))