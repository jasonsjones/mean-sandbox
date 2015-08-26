var passport = require('passport');
var User = require('mongoose').model('User');

module.exports = function(config) {

    passport.serializeUser(function (user, done) {
        if (user) {
            done(null, user._id);
        }
    });

    passport.deserializeUser(function (id, done) {
        User.findOne({_id: id}, '-salt -password', function (err, user) {
            done(err, user);
        });
    });

    require('./strategies/local')();
    require('./strategies/twitter')(config);
};
