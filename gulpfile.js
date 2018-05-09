const gulp = require('gulp');
const mustache = require('gulp-mustache');
const watch = require('gulp-watch');
const nodemon = require('gulp-nodemon');
const clean = require('gulp-clean');

const ts = require('gulp-typescript');
const JSON_FILES = ['src/*.json', 'src/**/*.json'];
const tsProject = ts.createProject('tsconfig.json');

gulp.task('views', () => {
    gulp.src(['src/views/**/*.*']).pipe(gulp.dest('build/views'));
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

gulp.task('watch', ['views', 'resources', 'assets'],  () => {
    return watch('src/**/*', () => {
        gulp.src(['build']).pipe(clean({force: true}));
        gulp.src(['src/views/**/*.*']).pipe(gulp.dest('build/views'));
        gulp.src(['src/resources/**/*.*']).pipe(gulp.dest('build/resources'));
        gulp.src(JSON_FILES).pipe(gulp.dest('build'));
    });
});

gulp.task('default', () => {
    console.log("Running none of gulp script")
});