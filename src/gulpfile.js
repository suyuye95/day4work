var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var server = require('gulp-webserver');
var path = require('path');
var fs = require('fs');
var url = require('url');
var data = require('./data.json');
var uglify = require('gulp-uglify');

//编译sass
gulp.task('minSass', function() {
    return gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(cleanCss())
        .pipe(gulp.dest('./css/'))
})

//起服务
gulp.task('server', function() {
        return gulp.src('../src/')
            .pipe(server({
                port: 8080,
                open: true,
                middleware: function(req, res, next) {
                    var pathname = url.parse(req.url).pathname;
                    if (pathname == '/favicon.ico') {
                        return res.end()
                    } else if (pathname == '/data') {
                        res.end(JSON.stringify({ code: 1, msg: data }));
                    } else {
                        pathname = pathname == '/' ? 'index.html' : pathname;
                        res.end(fs.readFileSync(path.join(__dirname, pathname)));
                    }
                }
            }))

    })
    //监听scss文件变化编译cs
gulp.task('watch', function() {
    gulp.watch('./scss/*.scss', gulp.series('minSass'))
})
gulp.task('dev', gulp.series('server', 'watch'))

//放到上线上
//拷贝css 到bulid里面
gulp.task('copyCss', function() {
        return gulp.src('./css/*.css')
            .pipe(gulp.dest('../bulid/css/'))
    })
    //拷贝iconCss
gulp.task('copyIcon', function() {
    return gulp.src('./icon/*.css')
        .pipe(gulp.dest('../bulid/icon/'))
})

//压缩自己的js文件并且拷贝
gulp.task('minJs', function() {
    gulp.src('./js/yjs/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('../bulid/js/yjs/'))
})

//拷贝所有js文件
gulp.task('copyJs', function() {
    gulp.src(['./js/**/*.js', '!./js/yjs/*.js'])
        .pipe(gulp.dest('../bulid/js/'))
})

gulp.task('bulidDev', gulp.series('copyCss', 'copyIcon', 'copyJs', 'minJs'))