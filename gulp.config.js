module.exports = function () {
    var client = './public/';
    var clientApp = client + 'app/';

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
        client: client,
        index: client + 'index.html',
        js: [
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
            '!' + clientApp + '**/*.spec.js'
        ],

        less: client + 'css/styles.less',

        /**
         * bower and npm locations
         */
         bower: {
            json: require('./bower.json'),
            directory: client + 'components/',
            ignorePath: '../..'
         }
    };

    config.getWiredepDefaultOptions = function () {
        var options = {
            bowerJSON: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;

    };

    return config;

};
