var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var server = require('gulp-webserver');
var path = require('path');
var fs = require('fs');
var url = require('url');
var data = require('./data.json');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin')

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
    return gulp.src('./js/yjs/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('../bulid/js/yjs/'))
})

//拷贝所有js文件
gulp.task('copyJs', function() {
    return gulp.src(['./js/**/*.js', '!./js/yjs/*.js'])
        .pipe(gulp.dest('../bulid/js/'))
})


//压缩html
gulp.task('minhtml', function() {
    return gulp.src('./*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('../bulid/'))
})

//压缩img并拷贝
gulp.task('minimg', function() {
    return gulp.src('./imgs/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 5
        }))
        .pipe(gulp.dest('../bulid/imgs/'))
})

//拷贝swipercss
gulp.task('copyswiper', function() {
    return gulp.src('./swipercss/*.css')
        .pipe(cleanCss())
        .pipe(gulp.dest('../bulid/swipercss/'))
})


gulp.task('bulidDev', gulp.series('copyCss', 'copyIcon', 'copyJs', 'copyswiper', 'minimg', 'minhtml', 'minJs'))