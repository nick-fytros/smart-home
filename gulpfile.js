var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var mocha = require('gulp-mocha');
var clean = require('gulp-clean');
var chai = require('chai');

gulp.task('clean', () => {
    return gulp.src('dist', { read: false })
        .pipe(clean());
});

gulp.task('vue', ['clean'], () => {
    return gulp.src('app/**/*.vue')
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('babel', ['clean', 'vue'], () => {
    return gulp.src('app/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('sass', ['clean', 'vue'], () => {
    return gulp.src('./public/css/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('./public/css'))
        .pipe(livereload());
});

gulp.task('watch', ['clean'], () => {
    gulp.watch(['./public/css/*.scss', './app/**/*.js', './app/**/*.vue'], ['clean', 'vue', 'sass', 'babel']);
});

gulp.task('develop', ['clean', 'babel', 'sass'], () => {
    livereload.listen();
    nodemon({
        script: 'dist/start.js',
        ext: 'js vue',
        stdout: true
    }).on('readable', () => {
        this.stdout.on('data', (chunk) => {
            if (/^Express server listening on port/.test(chunk)) {
                livereload.changed(__dirname);
            }
        });
        this.stdout.pipe(process.stdout);
        this.stderr.pipe(process.stderr);
    }).once('quit', function() {
        process.exit();
    });
});

gulp.task('mocha', ['clean'], function() {
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
    'clean',
    'vue',
    'babel',
    'sass',
    'mocha'
]);

gulp.task('default', [
    'clean',
    'vue',
    'babel',
    'sass',
    'mocha',
    'develop',
    'watch'
]);

gulp.task('build', [
    'clean',
    'vue',
    'babel',
    'sass'
]);