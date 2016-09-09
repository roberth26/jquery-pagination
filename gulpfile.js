var gulp = require( 'gulp' );
var sass = require( 'gulp-sass' );
var watch = require( 'gulp-watch' );

gulp.task('sass', function () {
	return watch( './css/pagination.scss', { ignoreInitial: false } )
	    .pipe(sass().on('error', sass.logError))
	    .pipe(gulp.dest('./css'));
});

gulp.task( 'default', [ 'sass' ] );