var User = require('mongoose').model('User');
var hash = require('../util/hash');

exports.getUsers = function (req, res) {
    User.find({}, '-salt -password').exec(function (err, users) {
        if (err) {
            console.log('there was an error');
            res.send(err);
        } else {
            res.json(users);
        }
    });
};

exports.getUserById = function (req, res) {
    console.log(req.params);
    User.find({'_id': req.params.id}, '-salt -password').exec(function (err, user) {
        if (err) {
            console.log('error');
        } else {
            res.send(user);
        }
    });
};

exports.getCurrentUser = function (req, res) {
    if (req.session.user) {
        console.log('user is logged in...');
        return res.json({success: true, user: req.session.user});
    } else {
        console.log('no user logged in...');
        return res.json({success: false, message: 'no current user available'});
    }
};

exports.createUser = function (req, res, next) {
    var userData = req.body;
    userData.local.username = userData.local.username.toLowerCase();
    userData.local.salt = hash.createSalt();
    userData.local.password = hash.hashPassword(
            userData.local.salt, userData.local.password);

    User.create(userData, function (err, user) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate username');
            }
            return res.status(400).json({reason: err.toString()});
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
};

exports.signOutUser = function (req, res) {
    User.findOne({_id: req.session.user._id}).exec(function (err, user) {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        user.loggedIn = false;
        user.save(function (err) {
            if (err) {
                console.log(err);
            }
            req.session.user = null;
            res.json({success: true});
        });
    });
};

exports.updateUserById = function (req, res) {
    User.findOne({_id: req.params.id}).exec(function (err, user) {
        if (err) {
            console.log(err);
            return res.send(err);
        }

        if (user.isAdmin()) {
            console.log('user is admin--from user.isAdmin...');
        }

        var userUpdates = req.body;
        user.firstName = userUpdates.firstName;
        user.lastName = userUpdates.lastName;
        user.email = userUpdates.email;
        user.zipcode = userUpdates.zipcode;
        user.local.username = userUpdates.local.username;
        user.lastModified = Date.now();

        // check for roles
        if (userUpdates.roles.admin && user.roles.indexOf('admin') === -1) {
            user.roles.push('admin');
            console.log('user added as admin');
        }

        if (!(userUpdates.roles.admin) && user.roles.indexOf('admin') > -1) {
            var idx = user.roles.indexOf('admin');
            user.roles.splice(idx, 1);
            console.log('user removed as admin');
        }

        if (userUpdates.local.password &&
            userUpdates.local.password.length > 0 &&
            user.local.password !== userUpdates.local.password) {

            user.local.salt = hash.createSalt();
            user.local.password = hash.hashPassword(user.local.salt, userUpdates.local.password);
            console.log('user\'s password was successfully updated...');
        } else {
            console.log('user\'s password was not updated...');
        }
        user.save(function (err) {
            if (err) {
                res.status(400);
                return res.json({reason: err.toString()});
            }
            res.send(user);
        });
    });
};

exports.deleteUser = function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            return res.send(err);
        }
        res.send({message: 'user removed', success: true});
    });
};
