var mongoose = require('mongoose');
var Withdrawal = mongoose.model('ATMWithdrawal');

exports.getWithdrawals = function (req, res) {
    Withdrawal.find({}).exec(function (err, withdrawals) {
        if (err) {
            res.send(err);
        } else {
            res.json(withdrawals);
        }
    });
};