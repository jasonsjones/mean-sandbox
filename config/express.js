var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');

function logger(req, res, next) {
    console.log(req.method + ' ' + req.url);
    next();
}

module.exports = function (config) {
    var app = express();

    app.use(express.static(__dirname + '/../public/'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.use(session({secret: config.secret,
                     resave: true,
                     saveUninitialized: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(logger);

    return app;
};