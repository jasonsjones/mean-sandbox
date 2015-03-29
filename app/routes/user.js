var auth = require('../controllers/auth');
var user = require('../controllers/user');

module.exports = function (api) {

    api.route('/api/users')
        .get(user.getUsers)
        .post(user.createUser);

    api.route('/api/users/:id')
        .get(user.getUserById)
        .put(user.updateUserById)
        .delete(user.deleteUser);

    api.route('/login')
        .post(auth.authenticateWithPassport);
};
