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

    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });

    switch (environment) {
        case 'build':
            console.log('** BUILD **');
            app.use(express.static('./build/'));
            break;
        case 'devlocal':
            console.log('** DEVLOCAL **');
            app.use(express.static('./public/'));
            app.use(express.static('./.tmp/'));
            app.use(express.static('./'));
            break;
        default:
    }

    require('../app/routes/user')(router, passport);
    require('../app/routes/todo')(router);
    require('../app/routes/atm')(router);
    app.use(router);

    // this route needs to be defined at the end of all other routes
    require('../app/routes/index')(app, environment);

    return app;
};
