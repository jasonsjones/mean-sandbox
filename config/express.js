var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');

// function logger(req, res, next) {
//     console.log(req.method + ' ' + req.url + ' -- ' + res.statusCode);
//     next();
// add another comment
// }

module.exports = function (config) {
    var app = express();
    var router = express.Router();

    app.use(logger('dev'));
    app.use('components', express.static(path.join(__dirname + '/../public/components')));
    app.use(express.static(path.join(__dirname + '/../public')));
    app.use(express.static(path.join(__dirname + '/../')));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.use(session({secret: config.secret,
                     resave: true,
                     saveUninitialized: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    require('../app/routes/user')(router);
    app.use(router);
    // this route needs to be defined at the end of all other routes
    require('../app/routes/index')(app);

    return app;
};
