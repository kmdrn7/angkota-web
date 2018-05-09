const gulp = require('gulp');
const mustache = require('gulp-mustache');
const watch = require('gulp-watch');
const nodemon = require('gulp-nodemon');

const ts = require('gulp-typescript');
const JSON_FILES = ['src/*.json', 'src/**/*.json'];
const tsProject = ts.createProject('tsconfig.json');

gulp.task('views', () => {
    gulp.src(['src/views/**/*.*']).pipe(gulp.dest('build/views'));
})

gulp.task('resources', () => {
    gulp.src(['src/resources/**/*.*']).pipe(gulp.dest('build/resources'));
})

gulp.task('assets', function() {
    gulp.src(JSON_FILES).pipe(gulp.dest('build'));
});

gulp.task('watch',  () => {
    return watch('src/**/*', () => {
        gulp.src(['src/views/**/*.*']).pipe(gulp.dest('build/views'));
        gulp.src(['src/resources/**/*.*']).pipe(gulp.dest('build/resources'));
        gulp.src(JSON_FILES).pipe(gulp.dest('build'));
    });
})

// gulp.task('develop', function () {
//     var stream = nodemon({ 
//         script: './build/index.js',
//         ext: 'html hbs js css',
//         ignore: ['build/'],
//         tasks: ['assets', 'view', 'scripts', 'resources']
//     });

//     stream.on('restart', function () {
//         console.log('restarted!')
//     })
//     .on('crash', function() {
//         console.error('Application has crashed!\n')
//         stream.emit('restart', 10)  // restart the server in 10 seconds
//     });
// });

gulp.task('default', () => {
    console.log("Running none of gulp script")
});