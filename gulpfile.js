var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var mocha = require('gulp-mocha');
var clean = require('gulp-clean-dest');
var cleanCSS = require('gulp-clean-css');
var chai = require('chai');

gulp.task('vue', () => {
    return gulp.src('app/**/*.vue')
        .pipe(clean('dist'))
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('babel', ['vue'], () => {
    return gulp.src('app/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('sass', ['vue'], () => {
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
    gulp.watch(['./assets/scss/*.scss', './app/**/*.js', './app/**/*.vue'], ['vue', 'sass', 'babel']);
});

gulp.task('develop', ['vue', 'babel', 'sass'], () => {
    livereload.listen();
    nodemon({
        script: 'dist/start.js',
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

gulp.task('mocha', function () {
    return gulp.src(['test/*.js'], {
            read: false
        })
        .pipe(mocha({
            reporter: 'spec',
            globals: {
                should: require('should')
            }
        }));
});

gulp.task('test', [
    'vue',
    'babel',
    'sass',
    'mocha'
]);

gulp.task('default', [
    'vue',
    'babel',
    'sass',
    'mocha',
    'develop',
    'watch'
]);

gulp.task('build', [
    'vue',
    'babel',
    'sass'
]);
