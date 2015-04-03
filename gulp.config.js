module.exports = function () {
    var client = 'public/';
    var clientApp = client + 'app/';
    var temp = client + '.tmp/';

    var config = {

        // all js to vet
        alljs: [
            'server.js',
            'gulpfile.js',
            'gulp.config.js',
            './public/*.js',
            './public/app/**/*.js'
        ],
        build: './build/',
        client: client,
        css: temp + 'styles.css',
        fonts: client + 'components/font-awesome/fonts/**/*.*',
        images: client + 'img/**/*.*',
        index: client + 'index.html',
        js: [
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
            '!' + clientApp + '**/*.spec.js'
        ],

        less: client + 'css/styles.less',
        serverFiles: ['server.js', 'app/**/*.js', 'config/**/*.js'],
        temp: temp,

        /**
         * browser-sync
         *
         */
        browserReloadDelay: 1000,

        /**
         * bower and npm locations
         */
         bower: {
            json: require('./bower.json'),
            directory: client + 'components/',
            ignorePath: '../' // this doesn't work...
        },

        /**
         * Node Settings
         */
         defaultPort: 7401,
         nodeServer: 'server.js',

    };

    config.getWiredepDefaultOptions = function () {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;

    };

    // config.getInjectDefaultOptions = function () {
    //     var options = {
    //         read: config.inject.read
    //     };
    //     return options;
    // }

    return config;

};
