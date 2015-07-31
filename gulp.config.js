module.exports = function () {
    var client = './public/';
    var clientApp = client + 'app/';
    var temp = './.tmp/';

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
        fonts: './bower_components/font-awesome/fonts/**/*.*',
        html: clientApp + '**/*.html',
        htmltemplates: clientApp + '**/*.html',
        images: client + 'img/**/*.*',
        index: client + 'index.html',
        js: [
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
            '!' + clientApp + '**/*Spec.js'
        ],
        less: client + 'css/styles.less',
        allless: client + 'css/*.less',
        serverFiles: ['server.js', 'app/**/*.js', 'config/**/*.js'],
        temp: temp,

        /**
         * optimized files
         */
        optimized: {
            app: 'app.js',
            lib: 'lib.js'
        },

        /**
         * template cache
         *
         */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app.core',
                standAlone: false,
                root: 'app/'
            }
        },

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
            directory: 'bower_components/',
            ignorePath: '..'
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
