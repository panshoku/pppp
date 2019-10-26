// gulpプラグインの読み込み
const gulp = require("gulp"),
  imagemin = require("gulp-imagemin"),
  pngquant = require("imagemin-pngquant"),
  mozjpeg = require("imagemin-mozjpeg"),
  autoprefixer = require("gulp-autoprefixer"),
  rename = require("gulp-rename"),
  sass = require("gulp-sass"),
  sourcemaps = require("gulp-sourcemaps"),
  uglify = require("gulp-uglify"),
  concat = require("gulp-concat"),
  plumber = require("gulp-plumber");

const paths = {
  src: {
    scss: "pppp/base/scss/**/*.scss",
    js: "pppp/base/js/**/_*.js",
    img: "pppp/base/image/*.{jpg,jpeg,png,gif,svg}"
  },
  concat: {
    js: "pppp/base/js/"
  },
  dist: {
    css: "pppp/src/css/",
    img: "pppp/src/image/",
    js: "pppp/src/js/"
  }
};

gulp.task("sass", done => {
  gulp
    .src(paths.src.scss)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: "compressed"
      }).on("error", sass.logError)
    )
    .pipe(autoprefixer({}))
    .pipe(sourcemaps.write())
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(gulp.dest(paths.dist.css));
  done();
});

gulp.task("imagemin", function(done) {
  gulp
    .src(paths.src.img)
    .pipe(
      imagemin([
        pngquant({ quality: [0.65, 0.8], speed: 1 }),
        mozjpeg({ quality: 80 }),
        imagemin.svgo(),
        imagemin.gifsicle()
      ])
    )
    .pipe(gulp.dest(paths.dist.img));
  done();
});

gulp.task("jsconcat", function(done) {
  gulp
    .src(paths.src.js)
    .pipe(plumber())
    .pipe(concat("main.js"))
    .pipe(gulp.dest(paths.concat.js));
  done();
});

gulp.task("jsmin", function(done) {
  gulp
    .src(paths.concat.js + "main.js")
    .pipe(uglify())
    .pipe(
      rename({
        extname: ".min.js"
      })
    )
    .pipe(gulp.dest(paths.dist.js));
  done();
});

gulp.task("js", gulp.series(gulp.parallel("jsconcat", "jsmin")));

gulp.task("dev", () => {
  gulp.watch(paths.src.scss, gulp.task("sass"));
  gulp.watch(paths.src.img, gulp.task("imagemin"));
  gulp.watch(paths.src.js, gulp.task("js"));
});
