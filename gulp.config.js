module.exports = function () {
    var client = './public/';

    var config = {
        temp: client + '.tmp/',

        // all js to vet
        alljs: [
            'server.js',
            'gulpfile.js',
            'gulp.config.js',
            './public/*.js',
            './public/app/**/*.js'
        ],

        less: client + 'css/styles.less'
    };

    return config;

};
