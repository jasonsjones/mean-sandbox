var mongoose = require('mongoose');
var Purchase = mongoose.model('Purchase');

exports.getPurchasesForWithdrawal = function (req, res) {
    Purchase.find({atmId: req.params.atmId}).exec(function (err, purchases) {
        if (err) {
            res.send(err);
        } else {
            res.json(purchases);
        }
    })
};
