"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");

var rename = require("gulp-rename");
var del = require("del");

var htmlmin = require("gulp-htmlmin");

var uglify = require("gulp-uglify");
var concat = require("gulp-concat");

var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");

var svgStore = require("gulp-svgstore");
var cheerio = require("gulp-cheerio");
var webp = require("gulp-webp");

var server = require("browser-sync").create();


gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest("build"));
});

gulp.task("server-reload", function () {
  return server.reload()
});

gulp.task("js", function () {
  return gulp.src("source/js/**.js")
    .pipe(concat("script.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("build/js"))
});

gulp.task("svg", function () {
  return gulp.src("source/img/*.svg")
    .pipe(svgStore({inlineSvg: true}))
    .pipe(rename("sprite.svg"))
    .pipe(cheerio({
      run: function ($) {
        $("[fill]").removeAttr("fill");
        $("[style]").removeAttr("style");
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function() {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"))
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/*.html").on("change", gulp.series("html", "server-reload"));
  gulp.watch("source/js/**.js").on("change", gulp.series("js", "server-reload"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/*.ico",
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))
});

gulp.task("build", gulp.series("clean", "svg", "webp", "html", "copy", "css", "js"));
gulp.task("start", gulp.series("build", "server"));
