//引入gulp模块
var gulp = require('gulp');
var $ = require('gulp-load-plugins')()
var open = require('open');

//压缩js
gulp.task('js', function() {
    return gulp.src('src/js/*.js') //操作的源文件
        .pipe($.concat('built.js')) //合并到临时文件
        .pipe(gulp.dest('dist/js')) //生成到目标文件夹
        .pipe($.rename({suffix: '.min'})) //重命名
        .pipe($.uglify())    //压缩
        .pipe(gulp.dest('dist/js'))
        .pipe($.livereload())
        .pipe($.connect.reload())
});
//转css
gulp.task('less', function () {
    return gulp.src('src/less/*.less')
        .pipe($.less())
        .pipe(gulp.dest('src/css'))
        .pipe($.livereload())
        .pipe($.connect.reload())
})
//压缩css 必须在less执行完成之后再执行
gulp.task('css',['less'], function () {

    return gulp.src('src/css/*.css')
        .pipe($.concat('built.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe($.rename({suffix: '.min'}))
        .pipe($.cleanCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'))
        .pipe($.livereload())
        .pipe($.connect.reload())
});

//压缩html
gulp.task('html', function() {
    return gulp.src('index.html')
        .pipe($.htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
        .pipe($.livereload())
        .pipe($.connect.reload())
});
gulp.task('watch', ['default'], function () {
    //开启监视
    livereload.listen();
    //监视指定的文件, 并指定对应的处理任务
    gulp.watch('src/js/*.js', ['js']);
    gulp.watch(['src/css/*.css','src/less/*.less'], ['css','less','html']);
});

//注册一个全自动的任务
gulp.task('server',['default'], function () {
    //配置服务器选项
    $.connect.server({
        root : 'dist/',//监视的源目标文件路径
        livereload : true,//是否实时刷新
        port : 5000//开启端口号
    });
    open('http://localhost:5000/');

    //确认监视的目标并且绑定相应的任务
    gulp.watch('src/js/*.js', ['js']);
    gulp.watch(['src/css/*.css', 'src/less/*.less'], ['css', 'less']);
})


gulp.task('default', ['js', 'less','css','html']);