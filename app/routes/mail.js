var mailCtrl = require('../controllers/mail');

module.exports = function (api) {

    api.route('/api/testEmail')
        .get(mailCtrl.testEmail);

    api.route('/api/contactemail')
        .post(mailCtrl.contactEmail);
};
