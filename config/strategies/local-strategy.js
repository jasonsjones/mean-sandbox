var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('mongoose').model('User');

module.exports = function () {

    passport.use('local', new LocalStrategy(localStrategy));

    function localStrategy(username, password, done) {
        User.findOne({username: username}).exec(lookup);

        function lookup(err, user) {
            if (err) {
                return done(err);
            }

            if (user && user.authenticate(password)) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        }
    }
};

