var auth = require('../controllers/auth');
var user = require('../controllers/user');

module.exports = function (app) {

    app.get('/api/users', user.getUsers);
    app.post('/api/users', user.createUser);
    app.put('/api/users', user.updateUser);

    app.get('/api/users/:id', user.getUserById);

    // app.post('/login', auth.authenticate);
    app.post('/login', auth.authenticateWithPassport);
};