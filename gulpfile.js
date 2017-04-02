const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const plumber = require('gulp-plumber');
const livereload = require('gulp-livereload');
const sass = require('gulp-sass');
const ava = require('gulp-ava');
const cleanCSS = require('gulp-clean-css');

gulp.task('sass', () => {
    return gulp.src('./assets/scss/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('./public/css'))
        .pipe(livereload());
});

gulp.task('watch', () => {
    livereload.listen();
    gulp.watch(['./assets/scss/**/*.scss'], ['sass']);
});

gulp.task('develop', ['sass'], () => {
    livereload.listen();
    nodemon({
        script: 'app/start.js',
        ext: 'js vue scss',
        stdout: true
    }).on('readable', () => {
        this.stdout.on('data', (chunk) => {
            if (/^Express server listening on port/.test(chunk)) {
                livereload.changed(__dirname);
            }
        });
        this.stdout.pipe(process.stdout);
        this.stderr.pipe(process.stderr);
    }).once('quit', function () {
        process.exit();
    });
});

gulp.task('test', function () {
    return gulp.src(['test/**/*.js'], {
            read: false
        })
        .pipe(ava({verbose: true}));
});

gulp.task('default', [
    'sass',
    'test',
    'develop',
    'watch'
]);

gulp.task('build', [
    'sass'
]);
