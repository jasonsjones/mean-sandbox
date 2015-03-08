var gulp = require('gulp');
var args = require('yargs').argv;
var $ = require('gulp-load-plugins')({lazy: true});

var source = [
    './public/*.js',
    './public/app/**/*.js'
];

gulp.task('vet', function() {
    log('Analyzing source with JSHint and JSCS...');
    return gulp.src(source)
        .pipe($.print())
        .pipe($.jscs()).on('error', handleError)
        .pipe($.jshint('./.jshintrc'))
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});


gulp.task('serve-dev', function () {

    var nodeOptions = {
        script: 'server.js',
        delayTime: 1,
        env: {
            'PORT': 8080,
            'NODE_ENV': 'development'
        },
        watch: ['server.js', 'app/**/*.js', 'config/**/*.js']
    };

    return $.nodemon(nodeOptions)
        .on('restart', function(ev) {
            log('*** nodemon restarted');
            log('files changed on restart:\n' + ev);
        })
        .on('start', function() {
            log('*** nodemon started');
        })
        .on('crash', function() {
            log('*** nodemon crashed: script crashed for some reason');
        })
        .on('exit', function() {
            log('*** nodemon exited cleanly');
        });

});

/***************************/
function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}

function handleError(err) {
    $.util.log(err.message);
    this.emit('end');
}
