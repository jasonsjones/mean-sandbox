var mailer = require('../../config/mailer');

var transport = mailer();

exports.testEmail = function (req, res) {
    var mailOptions = {
        from: 'MEAN Sandbox <meansandbox@gmail.com>',
        to: 'jsjones96@gmail.com',
        subject: 'Test from nodemailer',
        text: 'This is a test email sent from nodemailer running on a node server'
    };

    console.log(mailOptions);
    sendEmail(res, mailOptions);
};

exports.contactEmail = function (req, res) {
    console.log(req.body);
    var mailOptions = {
        from: 'MEAN Sandbox <meansandbox@gmail.com>',
        to: 'meansandbox@gmail.com',
        cc: 'jsjones96@gmail.com',
        replyTo: req.body.from,
        subject: req.body.subject,
        text:  req.body.message
    };
    console.log(mailOptions);
    sendEmail(res, mailOptions);
};

function sendEmail(res, mailOpts) {
    transport.sendMail(mailOpts, function (err, info) {
        if (err) {
            console.log(err);
            res.json({success: false, message: err});
        } else {
            console.log(info);
            res.json({success: true, message: 'email sent--yay!!'})
        }
    });
}
