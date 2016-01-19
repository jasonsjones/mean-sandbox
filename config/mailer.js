var nodemailer = require('nodemailer');

module.exports = function () {

    var smtpConfig = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.MS_GMAIL_USER,
            pass: process.env.MS_GMAIL_PASS
        }
    };

    var transport = nodemailer.createTransport(smtpConfig);

    return transport;
};
