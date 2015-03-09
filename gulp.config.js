module.exports = function () {
    var config = {

        // all js to vet
        alljs: [
            'server.js',
            'gulpfile.js',
            'gulp.config.js',
            './public/*.js',
            './public/app/**/*.js'
        ]
    };

    return config;

};
