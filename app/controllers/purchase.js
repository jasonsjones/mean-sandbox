var mongoose = require('mongoose');
var Purchase = mongoose.model('Purchase');

exports.getPurchasesForWithdrawal = function (req, res) {
    Purchase.find({atmId: req.params.atmId}).exec(function (err, purchases) {
        if (err) {
            res.send(err);
        } else {
            res.json(purchases);
        }
    });
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
    });
};

exports.updatePurchase = function (req, res) {
    Purchase.findOne({_id: req.params.id}).exec(function (err, purchase) {
        if (err) {
            res.send(err);
        } else {
            var purchaseUpdateData = req.body;

            purchase.amount = purchaseUpdateData.amount;
            purchase.description = purchaseUpdateData.description;
            purchase.lastModified = Date.now();

            purchase.save(function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.send({success: true});
                }
            });
        }
    });
};

exports.deletePurchase = function (req, res) {
    Purchase.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send({success: true});
        }
    });
};

exports.deleteAllPurchases = function (req, res) {
    Purchase.find({atmId: req.params.atmId}).remove(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.json({success: true});
        }
    });
};
