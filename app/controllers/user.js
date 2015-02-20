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
    console.log('update user called with the following data: ');
    console.log(req.body);
    res.send('well done...');
};