var gulp       = require('gulp');
var nodemon    = require('gulp-nodemon');
var plumber    = require('gulp-plumber');
var livereload = require('gulp-livereload');
var sass       = require('gulp-sass');
var babel      = require('gulp-babel');
var mocha      = require('gulp-mocha');
var chai       = require('chai');

gulp.task('babel', () =>
    gulp.src('src/**/*.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('dist'))
);

gulp.task('sass', () => {
    gulp.src('./public/css/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('./public/css'))
        .pipe(livereload());
});

gulp.task('watch', () => {
    gulp.watch(['./public/css/*.scss', './src/**/*.js'], ['sass', 'babel']);
});

gulp.task('develop', ['babel'], () => {
    livereload.listen();
    nodemon({
        script: 'dist/start.js',
        ext: 'js handlebars',
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
    'babel',
    'sass',
    'mocha'
]);

gulp.task('default', [
    'babel',
    'sass',
    'mocha',
    'develop',
    'watch'
]);

gulp.task('build', [
    'babel',
    'sass'
]);
