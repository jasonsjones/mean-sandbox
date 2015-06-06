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

exports.createPurchase = function (req, res) {
    var purchaseData = req.body;
    purchaseData.atmId = req.params.atmId;

    Purchase.create(purchaseData, function (err, purchase) {
        if (err) {
            res.send(err);
        } else {
            res.send(purchase);
        }
    })
};

exports.deletePurchase = function (req, res) {
    Purchase.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send('Purchase successfully deleted');
        }
    });
};
