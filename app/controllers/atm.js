var mongoose = require('mongoose');
var Withdrawal = mongoose.model('ATMWithdrawal');

function _getWithdrawals(req, res) {
    Withdrawal.find({userId: req.session.user._id}).exec(function (err, withdrawals) {
        if (err) {
            res.send(err);
        } else {
            res.json(withdrawals);
        }
    });
}

exports.getWithdrawals = function (req, res) {
    _getWithdrawals(req, res);
};

exports.getWithrawalById = function (req, res) {
    Withdrawal.findById(req.params.id).exec(function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
};

exports.createTransaction = function (req, res) {
    var transactionData = req.body;
    Withdrawal.create(transactionData, function (err, transaction) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json(transaction);
        }
    });
};

exports.deleteTransaction = function (req, res) {
    Withdrawal.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send('Transaction successfully deleted');
        }
    });
}