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
    handlebars = require('gulp-compile-handlebars');

var PATHS = {
    CSS: 'dist/assets/css',
    SASS: 'src/assets/sass',
    IMGDIST: 'dist/assets/img',
    IMGSRC: 'src/assets/img',
    JS: 'dist/assets/js',
    TYPESCRIPT: 'src/assets/typescript',
    HTML: 'dist',
    HANDLEBARS: 'src/templates',
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
        .pipe(sourcemaps.write({includeContent: false}))
        .pipe(gulp.dest(PATHS.CSS))     
        .pipe(livereload());

});

gulp.task('typescript', function () {
    return gulp.src(PATHS.TYPESCRIPT+'/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            out: 'application.js',
            sourceMap: true,
            "removeComments": true
        }))
        .pipe(gulp.dest(PATHS.JS))
        .pipe(livereload());
});

gulp.task('compress-images', function () {
    return gulp.src(PATHS.IMGSRC + '/**/*.{jpg,png}')
        .pipe(imagemin())
        .pipe(gulp.dest(PATHS.DEST))
        .pipe(livereload());
});

gulp.task('handlebars', function(){
    options = {
        ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false 
        batch : [PATHS.HANDLEBARS+'/partials'],
        helpers : {
            capitals : function(str){
                return str.toUpperCase();
            }
        }
    }
    return gulp.src(PATHS.HANDLEBARS+'/**/*.hbs')
        .pipe(handlebars({}, options))
        .pipe(rename({extname:'.html'}))
        .pipe(gulp.dest(PATHS.HTML))
        .pipe(livereload());
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch([PATHS.SASS + "/**/*.sass", PATHS.SASS + "/**/*.scss"], ['sass']);
    gulp.watch([PATHS.TYPESCRIPT + "/**/*.ts"], ['typescript']);
    gulp.watch([PATHS.IMGSRC + "/**/*.{jpg,png}"], ['compress-images']);
    gulp.watch([PATHS.HANDLEBARS + "/**/*.hbs"], ['handlebars']);
});
