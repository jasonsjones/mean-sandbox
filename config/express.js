var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');

module.exports = function (config) {
    var app = express();
    var router = express.Router();
    var environment = config.env;

    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.use(session({secret: config.secret,
                     resave: true,
                     saveUninitialized: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    switch (environment) {
        case 'build':
            console.log('** BUILD **');
            app.use(express.static('./build/'));
            app.use('/*', express.static('./build/index.html'));
            break;
        case 'devlocal':
            console.log('** DEVLOCAL **');
            app.use(express.static('./public/'));
            app.use(express.static('./'));
            app.use(express.static('./.tmp'));
            //app.use('/*', express.static('./public/index.html'));
            break;
        default:
    }

    require('../app/routes/user')(router);
    require('../app/routes/todo')(router);
    require('../app/routes/atm')(router);
    app.use(router);

    // this route needs to be defined at the end of all other routes
    require('../app/routes/index')(app, environment);

    return app;
};
