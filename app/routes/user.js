var auth = require('../controllers/auth');
var user = require('../controllers/user');

module.exports = function (app) {

    app.get('/api/user', user.getUsers);
    app.post('/api/user', user.createUser);

    app.get('/api/user/:name', user.getUserByName);

    // app.post('/login', auth.authenticate);
    app.post('/login', auth.authenticateWithPassport);
};