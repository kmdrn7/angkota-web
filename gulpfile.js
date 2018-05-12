const gulp = require('gulp');
const mustache = require('gulp-mustache');
const watch = require('gulp-watch');
const nodemon = require('gulp-nodemon');
const clean = require('gulp-clean');

const ts = require('gulp-typescript');
const JSON_FILES = ['src/*.json', 'src/**/*.json'];
const tsProject = ts.createProject('tsconfig.json');

gulp.task('app', () => {
    gulp.src(['src/app/**/*.*']).pipe(gulp.dest('build/app'));
});

gulp.task('public', () => {
    gulp.src(['src/public/**/*.*']).pipe(gulp.dest('build/public'));
});

gulp.task('resources', () => {
    gulp.src(['src/resources/**/*.*']).pipe(gulp.dest('build/resources'));
});

gulp.task('assets', function() {
    gulp.src(JSON_FILES).pipe(gulp.dest('build'));
});

gulp.task('clean', () => {
    gulp.src('build').pipe(clean({force: true}));
});

gulp.task('watch', ['app', 'public', 'resources', 'assets'],  () => {
    return watch('src/**/*', () => {        
        gulp.src(['src/app/**/*.*']).pipe(gulp.dest('build/app'));
        gulp.src(['src/public/**/*.*']).pipe(gulp.dest('build/public'));
        gulp.src(['src/resources/**/*.*']).pipe(gulp.dest('build/resources'));
        gulp.src(JSON_FILES).pipe(gulp.dest('build'));
    });
});

gulp.task('default', () => {
    console.log("Running none of gulp script")
});