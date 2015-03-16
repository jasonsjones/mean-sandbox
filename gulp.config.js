module.exports = function () {
    var client = './public/';
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
        client: client,
        css: temp + 'styles.css',
        index: client + 'index.html',
        js: [
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
            '!' + clientApp + '**/*.spec.js'
        ],

        less: client + 'css/styles.less',
        serverFiles: ['server.js', './app/**/*.js', './config/**/*.js'],
        temp: temp,

        /**
         * bower and npm locations
         */
         bower: {
            json: require('./bower.json'),
            directory: client + 'components/',
            ignorePath: '../public/' // this doesn't work...
        },

        /**
         * Node Settings
         */
         defaultPort: 8080,
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

    return config;

};
