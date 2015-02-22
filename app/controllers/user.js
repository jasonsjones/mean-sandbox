var User = require('mongoose').model('User');
var hash = require('../util/hash');

exports.getUsers = function (req, res) {
    User.find({}, '-salt -password').exec(function (err, users) {
        if (err) {
            console.log('there was an error');
        } else {
            res.json(users);
        }
    });
};

exports.getUserById = function (req, res) {
    console.log(req.params);
    User.find({"_id": req.params.id}, '-salt -password').exec(function (err, user) {
        if (err) {
            console.log('error');
        } else {
            res.send(user);
        }
    });
};

exports.createUser = function (req, res, next) {
    var userData = req.body;
    userData.salt= hash.createSalt();
    userData.password = hash.hashPassword(userData.salt, userData.password);

    User.create(userData, function (err, user) {
        if (err) {
            // TODO check for duplicate user error
            return res.status(400).json({reason: err.toString()});
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            res.json(user);
        });
    });
};

exports.updateUser = function (req, res) {
    var userUpdates = req.body;

    if (req.user._id !== userUpdates._id || req.user.roles.indexOf('admin') === -1) {
        res.status(403);
        return res.end();
    }

    req.user.firstName = userUpdates.firstName;
    req.user.lastName = userUpdates.lastName;
    req.user.username = userUpdates.username;

    //if (userUpdates.password && userUpdates.password.length > 0) {
        //req.user.salt = hash.createSalt();
        //req.user.password = hash.hashPassword(req.user.salt, userUpdates.password);
    //} else {
        //console.log('user\'s passowrd was not updated...');
    //}

    req.user.save(function (err) {
        if (err) {
            res.status(400);
            return res.json({reason: err.toString()});
        }
        res.send(req.user);
    });
};
