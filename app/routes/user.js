var auth = require('../controllers/auth');
var user = require('../controllers/user');

module.exports = function (api, passport) {

    api.route('/api/users')
        .get(user.getUsers)
        .post(user.createUser);

    api.route('/api/users/:id')
        .get(user.getUserById)
        .put(user.updateUserById)
        .delete(user.deleteUser);

    api.route('/api/user/current')
        .get(user.getCurrentUser);

    api.route('/api/user/signout')
        .get(user.signOutUser);

    api.route('/login')
        .post(auth.authenticateWithPassport);

    api.route('/auth/twitter')
        // .get(passport.authenticate('twitter'));
        .get(auth.authWithTwitter);

    api.route('/auth/twitter/callback')
        .get(passport.authenticate('twitter', {
            failureRedirect: '/login'
        }), function (req, res) {
                res.redirect('/');
            }
        );

    api.route('/connect/twitter')
        .get(passport.authenticate('twitter'));

    api.route('/unlink/twitter')
        .get(auth.unlinkTwitter);
};
