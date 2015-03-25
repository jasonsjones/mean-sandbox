var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});

var port = process.env.PORT || config.defaultPort;

gulp.task('vet', function() {
    log('Analyzing source with JSHint and JSCS...');
    return gulp.src(config.alljs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.plumber())
        .pipe($.jscs())//.on('error', errorLogger)
        .pipe($.jshint('./.jshintrc'))
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('styles', ['clean-styles'], function () {
    log('Compiling Less --> CSS');

    return gulp
        .src(config.less)
        .pipe($.plumber())
        .pipe($.less())
        // .on('error', errorLogger)
        .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe(gulp.dest(config.temp));
});

gulp.task('clean-styles', function (done) {
    var files = config.temp + '**/*.css';
    clean(files, done);
});

gulp.task('less-watcher', function () {
    gulp.watch([config.less], ['styles']);
});

gulp.task('wiredep', function () {
    log('Wire up the bower css js and our app js into html');
    var wiredepOptions = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;
    return gulp
        .src(config.index)
        .pipe(wiredep(wiredepOptions))
        .pipe($.inject( gulp.src(config.js), {ignorePath: 'public'}))
        .pipe(gulp.dest(config.client));
});

gulp.task('inject', ['wiredep', 'styles'], function () {
    log('Wire up css into html after files are ready');

    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.css), {ignorePath: 'public'}))
        .pipe(gulp.dest(config.client));
});

gulp.task('serve-dev', ['inject'], function () {
    var isDev = true;
    var nodeOptions = {
        script: config.nodeServer,
        // script: 'server.js',
        delayTime: 1,
        env: {
            'PORT': 8080,
            'NODE_ENV': isDev? 'devlocal' : 'devweb'
        },
        watch: config.serverFiles
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

gulp.task('default', ['serve-dev']);

/***************************/
function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path, done);
}

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
