var nodemailer = require('nodemailer');

module.exports = function () {

    var transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.MS_GMAIL_USER,
            pass: process.env.MS_GMAIL_PASS
        }
    });

    return transport;
};
