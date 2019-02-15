var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');

//编译sass
gulp.task('minSass', function() {
    return gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(cleanCss())
        .pipe(gulp.dest('./css/'))
})

//监听scss文件变化编译cs
gulp.task('watch', function() {
    gulp.watch('./scss/*.scss', gulp.series('minSass'))
})