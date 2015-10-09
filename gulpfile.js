var gulp = require("gulp");
var eslint = require("gulp-eslint");
var Karma = require("karma").Server;
var insert = require("gulp-file-insert");
var uglify = require("gulp-uglify");
var eslint = require("gulp-eslint");
var size = require("gulp-size");
var runSequence = require("run-sequence");
var rename = require("gulp-rename");

gulp.task("js:build", ["lint"], function() {
    return gulp
        .src("src/ngAlertify.js")
        .pipe(insert({"/* alertify.js */": "lib/alertify.js/src/js/alertify.js"}))
        .pipe(insert({"/* style.css */": "lib/alertify.js/dist/css/alertify.css"}))
        .pipe(gulp.dest(__dirname));
});

gulp.task("js:compile", function() {
    return gulp
        .src("ngAlertify.js")
        .pipe(uglify({ outSourceMap: true }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(size({ gzip: true, showFiles: true }))
        .pipe(gulp.dest(__dirname));
})

gulp.task("lint:ci", function() {
    return gulp
      .src("src/js/**/*.js")
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failOnError());
});

gulp.task("lint", function() {
    return gulp
      .src("src/js/**/*.js")
      .pipe(eslint())
      .pipe(eslint.format());
});

gulp.task("karma:ci", function(done) {
    new Karma({
        configFile: __dirname + "/karma-ci.conf.js",
        singleRun: true
    }, done).start();
});

gulp.task("karma:tdd", function(done) {
    new Karma({
        configFile: __dirname + "/karma.conf.js"
    }, done).start();
});


gulp.task("test", ["lint:ci", "karma:ci"]);
gulp.task("build", function() {
    runSequence("js:build", "js:compile")
});

gulp.task("watch", function() {
    gulp.watch(["src/**/*.js", "test/**/*Spec.js"], ["js:build"]);
    gulp.watch(["ngAlertify.js"], ["js:compile"]);
});

gulp.task("default", ["karma:tdd", "watch"]);
