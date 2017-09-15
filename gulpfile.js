//导入各种包
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var htmlReplace = require("gulp-html-replace")

//html
gulp.task("html", function() {
    gulp.src(["src/**/*.html", "index.html"]) //**的意思是任意目录下
        .pipe(htmlReplace({
            style: gulp.src('src/html/common/style.html'),
            aside: gulp.src("src/html/common/aside.html"),
            header: gulp.src("src/html/common/header.html"),
            courseEditHeader: gulp.src('src/html/common/course/header.html'),
            courseEditAside: gulp.src('src/html/common/course/aside.html')
        }))
        .pipe(htmlmin({
            collapseWhitespace: true, // 去掉空白字符
            minifyJS: true, //压缩页面JS
            minifyCSS: true, //压缩页面CSS
            removeComments: true //清除HTML注释
        }))
        .pipe(gulp.dest("dist"))
})

//less处理
gulp.task("less", function() {
    gulp.src("src/less/index.less").pipe(less()).pipe(cleanCss()).pipe(gulp.dest("dist/css"))
})

// 配置要打包的第三包路径
var jsLibs = [
    'node_modules/art-template/lib/template-web.js',
    'node_modules/jquery/dist/jquery.js',
    'node_modules/bootstrap/dist/js/bootstrap.js',
    'node_modules/jquery-form/dist/jquery.form.min.js',
    'node_modules/jquery.cookie/jquery.cookie.js',
    'node_modules/nprogress/nprogress.js',
    'node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.js',
    'node_modules/bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min.js',
    'lib/jquery-Jcrop/js/Jcrop.js',
    'lib/jquery-region/jquery.region.js',
    'lib/jquery-uploadify/jquery.uploadify.js',
];

// 合并所有的第三方包为一个js
gulp.task('jsLib', function() {
    gulp.src(jsLibs)
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('dist/js'));
});

/* 如下每个js都要打包 */
var jsModules = [
    //首页
    "src/js/index.js",
    //用户
    "src/js/user/login.js",
    "src/js/user/profile.js",
    "src/js/user/repass.js",
    //讲师
    "src/js/teacher/add.js",
    "src/js/teacher/edit.js",
    "src/js/teacher/list.js",
    //课程
    "src/js/course/add.js",
    "src/js/course//course_edit_step1.js",
    "src/js/course/course_edit_step2.js",
    "src/js/course/course_edit_step3.js",
    "src/js/course/list.js",
    //学科分类
    "src/js/category/add.js",
    "src/js/category/edit.js",
    "src/js/category/list.js"
]

// //打包CommonJS模块 common文件夹不需要打包，因为是公共部分
// gulp.task('js', function() {
//     browserify('src/js/index.js').bundle() // 打包index.js
//         .pipe(source('index.js'))
//         .pipe(buffer())
//         // .pipe(uglify())
//         .pipe(gulp.dest('dist/js'));
// });
gulp.task('js', function() {
    jsModules.forEach(function(jsPath) {
        var pathArr = jsPath.split("/");
        var srcName = pathArr.pop();
        pathArr.shift();
        browserify(jsPath).bundle() // 打包index.js
            .pipe(source(srcName))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(gulp.dest("dist/" + pathArr.join("/")));
    })

});

// 添加统一打包的任务
gulp.task('build', function() {
    gulp.run(['html', 'less', 'jsLib', 'js']);
});
// 监听文件变化，自动打包
gulp.task('default', function() {
    gulp.run('build');
    gulp.watch(['src/**/*.html', 'index.html'], function() {
        gulp.run('html');
    });
    gulp.watch(['src/**/*.less'], function() {
        gulp.run('less');
    });
    gulp.watch(['src/**/*.js'], function() {
        gulp.run('js');
    });
});