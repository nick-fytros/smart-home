var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  sass = require('gulp-sass'),
  babel = require('gulp-babel');;

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
	gulp.watch(['./public/css/*.scss','./src/**/*.js'], ['sass','babel']);
});

gulp.task('develop', ['babel'], () => {
	livereload.listen();
	nodemon({
		script: 'dist/start.js',
		ext: 'js handlebars',
		stdout: true
	}).on('readable', () => {
		this.stdout.on('data', (chunk) => {
			if(/^Express server listening on port/.test(chunk)){
				livereload.changed(__dirname);
			}
		});
		this.stdout.pipe(process.stdout);
		this.stderr.pipe(process.stderr);
	}).once('quit', function () {
		process.exit();
	});
});

gulp.task('default', [
	'babel',
	'sass',
	'develop',
	'watch'
]);

gulp.task('build', [
	'babel',
	'sass'
]);