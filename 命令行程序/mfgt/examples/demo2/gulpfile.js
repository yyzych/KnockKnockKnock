/*
 * gulpfile.js
 */

var gulp=require('gulp');

var minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),       
    concat = require('gulp-concat'),       
    rename = require('gulp-rename'),       
    clean = require('gulp-clean');         

var less = require('gulp-less');
var seajsCombo = require('gulp-seajs-combo')

gulp.task('default', ['clean'], function () {
    gulp.run('develop');
    gulp.watch(['./css/*'], function () {
       gulp.run('stylesheets');
    });
});

gulp.task('develop', function () {
    gulp.run('img', 'buildlib', 'stylesheets', 'javascripts');
});

gulp.task('clean', function() {
    var stream = gulp.src(['./build'], {
            read: false
        })
        .pipe(clean({
            force: true
        }));

    return stream;
});

gulp.task("img", function(){
    gulp.src("./img/**.*")
        .pipe(gulp.dest("./build/img/"));
});

gulp.task('buildlib', function () {
    gulp.src("./js/init.js")
        .pipe(gulp.dest("./build/js/"))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("./build/js/"));

    gulp.src(["./js/lib/*.js"])
        .pipe(concat("lib.js"))
        .pipe(gulp.dest("./build/js/"))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(uglify())
        .pipe(gulp.dest("./build/js/"));

    gulp.src(["./js/vendor/*.js"])
        .pipe(concat("vendor.js"))
        .pipe(gulp.dest("./build/js/"))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(uglify())
        .pipe(gulp.dest("./build/js/"));
});


gulp.task('buildCSS', function () {
    return gulp.src('./css/less/file.*')
        .pipe(less())
        .pipe(rename('app.css'))
        .pipe(gulp.dest('./css/'));
});

gulp.task('stylesheets', ['buildCSS'], function() {
    gulp.src(['./css/app.css'])
        .pipe(gulp.dest("./build/css/"))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('./build/css/'));

    gulp.src(["./css/vendor/*.css"])
        .pipe(concat("vendor.css"))
        .pipe(gulp.dest("./build/css/"))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(minifycss())
        .pipe(gulp.dest("./build/css/"));

    // do something here;
});


gulp.task('js-simple', function () {
    gulp.src(["./js/component/*.js"])
        .pipe(concat("component.js"))
        .pipe(gulp.dest("./build/js/"))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(uglify())
        .pipe(gulp.dest("./build/js/"));
});

gulp.task('js-module', function () {
    var stream = gulp.src('./js/buildSeajs.js')
        .pipe(seajsCombo())
        .pipe(rename("module.js"))
        // .pipe(slice())
        .pipe(gulp.dest('./build/js/'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify({
            mangle: {
                except: ['require', 'exports', 'module']
            }
        }))
        .pipe(gulp.dest('./build/js/'));

    return stream;
});

gulp.task('javascripts', ['js-module'], function() {
    // do somethine here;

});


