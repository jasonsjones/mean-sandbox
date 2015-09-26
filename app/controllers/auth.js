var passport = require('passport');
var User = require('mongoose').model('User');

exports.authenticate = function (req, res) {
    User.findOne({username: req.body.username}).exec(function (err, user) {
        if (err) {
            res.status(500);
        } else {
            if (user && user.authenticate(req.body.password)) {
                res.json({success: true, user: user});
            } else {
                console.log('user failed to provide the correct creds');
                res.send({success: false});
            }
        }
    });
};

exports.authenticateWithPassport = function (req, res, next) {
    req.body.username = req.body.username.toLowerCase();

    var auth = passport.authenticate('local', function (err, user) {
        if (err) {
            return next(err);
        }

        if (!user) {
            res.send({success: false});
        }

        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }

            user.lastLogin = Date.now();
            user.loggedIn = true;
            req.session.user = user;

            user.save(function (err, user) {
                if (err) {
                    res.status(400);
                    return res.json({reason: err.toString()});
                }
                user.local.salt = undefined;
                user.local.password = undefined;
                res.json({success: true, user: user});
            });
        });
    });

    auth(req, res, next);
};

exports.authWithTwitter = function (req, res, next) {
    passport.authenticate('twitter')(req, res, next);
};

exports.unlinkTwitter = function (req, res) {
    User.findOne({_id: req.session.user._id}).exec(function (err, user) {
        user.twitter.id = undefined;
        user.twitter.token = undefined;
        user.twitter.username = undefined;
        user.twitter.displayName = undefined;
        user.save(function (err) {
            if (err) {
                throw err;
            }
            req.session.user = user;
            user.local.salt = undefined;
            user.local.password = undefined;
            res.json({success: true, user: user});
        });
    });
};
