var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    notifier = require('node-notifier'),
    gutil = require('gulp-util'),
    livereload = require('gulp-livereload'),
    bulkSass = require('gulp-sass-bulk-import'),
    ts = require('gulp-typescript'),
    imagemin = require('gulp-imagemin'),
    handlebars = require('gulp-compile-handlebars'),
    babel = require("gulp-babel"),
    twig = require('gulp-twig'),
    data = require('gulp-data'),
    path = require('path'),
    fs = require('fs');

var PATHS = {
    CSS: 'dist/assets/css',
    SASS: 'src/assets/sass',
    IMGDIST: 'dist/assets/img',
    IMGSRC: 'src/assets/img',
    JS: 'dist/assets/js',
    ES6: 'src/assets/javascript',
    HTML: 'dist',
    TWIG: 'src/templates',
    DATA: 'src/data'
};

var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

// ... error handler
var onError = function (err) {
    gutil.beep();
    notifier.notify({title: 'Uups, error!', message: err.message});
    console.log(err);
};

// ... tasks
gulp.task('sass', function () {
    var stream =  sass(PATHS.SASS + '/styles.sass', {
        noCache: true,
        sourcemap: false
    })
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(PATHS.CSS))
        .pipe(bulkSass())
        .pipe(cssnano({zindex: false}))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.init())
        .pipe(gulp.dest(PATHS.CSS))     
        .pipe(livereload());

});

gulp.task("babel", function () {
  return gulp.src(PATHS.ES6+"/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("application.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(PATHS.JS))
    .pipe(livereload());
});

gulp.task('compress-images', function () {
    return gulp.src(PATHS.IMGSRC + '/**/*.{jpg,png}')
        .pipe(imagemin())
        .pipe(gulp.dest(PATHS.DEST))
        .pipe(livereload());
});

gulp.task('twig', function () {
    return gulp.src(PATHS.TWIG+'/*.twig')
        .pipe(data(function(file) {
            var file =  path.basename(file.path);
            var filename = file.substr(0,file.lastIndexOf('.'))
            var filePath = './'+PATHS.DATA+'/'+filename+'.json';
            fs.stat(filePath, function(err, stat) {
                if(err == null) {
                    return require(filePath);
                } 
            }); 
        }))
        .pipe(twig())
        .pipe(gulp.dest(PATHS.HTML))
        .pipe(livereload());
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch([PATHS.SASS + "/**/*.sass", PATHS.SASS + "/**/*.scss"], ['sass']);
    gulp.watch([PATHS.ES6 + "/**/*.js"], ['babel']);
    gulp.watch([PATHS.IMGSRC + "/**/*.{jpg,png}"], ['compress-images']);
    gulp.watch([PATHS.TWIG + "/**/*.twig", PATHS.DATA + "/**/*.json"], ['twig']);
});
