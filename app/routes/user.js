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

    api.route('/api/users/current')
        .get(user.getCurrentUser);

    api.route('/login')
        .post(auth.authenticateWithPassport);

    api.route('/auth/twitter')
        // .get(passport.authenticate('twitter'));
        .get(auth.authWithTwitter);

    api.route('/auth/twitter/callback')
        .get(passport.authenticate('twitter', {
            failureRedirect: '/login'
        }), function (req, res) {
                console.log('session user:');
                console.log(req.session.user);
                res.redirect('/');
            }
        );

    api.route('/connect/twitter')
        .get(passport.authenticate('twitter'));

    api.route('/unlink/twitter')
        .get(auth.unlinkTwitter);
};
