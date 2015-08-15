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
            req.session.user = user;
            user.lastLogin = Date.now();
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
