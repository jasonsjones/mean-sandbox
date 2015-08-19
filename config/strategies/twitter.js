var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var mongoose = require('mongoose');

var User = mongoose.model('User');
var configAuth = require('../auth');

module.exports = function () {
    passport.use('twitter', new TwitterStrategy({
        consumerKey: configAuth.twitterAuth.consumerKey,
        consumerSecret: configAuth.twitterAuth.consumerSecret,
        callbackURL: configAuth.twitterAuth.callbackURL,
        passReqToCallback: true
    }, twitterCallbackFn));

    function twitterCallbackFn(req, token, tokenSecret, profile, done) {
        process.nextTick(function () {
            // if no user is logged in
            if (!req.session.user) {
                // find user in the db based on the twitter id
                User.findOne({ 'twitter.id': profile.id }, function (err, user) {
                    if (err) {
                        return done(err, null);
                    }

                    // if the user is found, then log in
                    if (user) {
                        // if there is a user id but no token (which means a user
                        // was linked at one point and then removed
                        if (!user.twitter.token) {
                            user.twitter.token = token;
                            user.twitter.username = profile.username;
                            user.twitter.displayName = profile.displayName;
                            user.lastLogin = Date.now();
                            user.save(function (err) {
                                if (err) {
                                    throw err;
                                }
                                req.session.user = user;
                                return done(null, user);
                            });

                        } else {
                            req.session.user = user;
                            return done(null, user);
                        }
                        // if no user is found with that twitter id
                    } else {
                        // create one
                        createNewUser(req, token, profile, done);
                    }
                });

            // a user is logged in, so need to link account
            } else {
                linkAccounts(req, token, profile, done);
            }
        });
    }

    function linkAccounts(req, token, profile, done) {
        var user = req.session.user;
        user.twitter.id = profile.id;
        user.twitter.token = token;
        user.twitter.username = profile.username;
        user.twitter.displayName = profile.displayName;

        user.save(function (err) {
            if (err) {
                throw err;
            }
            return done(null, user);
        });
    }

    function createNewUser(req, token, profile, done) {
        var newUser = new User();
        newUser.twitter.id = profile.id;
        newUser.twitter.token = token;
        newUser.twitter.username = profile.username;
        newUser.twitter.displayName = profile.displayName;
        newUser.lastLogin = Date.now();

        newUser.save(function (err) {
            if (err) {
                throw err;
            }
            req.session.user = newUser;
            return done(null, newUser);
        });
    }
};
