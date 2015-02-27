var auth = require('../controllers/auth');
var user = require('../controllers/user');

module.exports = function (app, api) {

    api.route('/api/users')
        .get(user.getUsers)
        .post(user.createUser);

    api.route('/api/users/:id')
        .get(user.getUserById)
        .put(user.updateUserById)
        .delete(user.userDelete);

    api.route('/login')
        .post(auth.authenticateWithPassport);
};
