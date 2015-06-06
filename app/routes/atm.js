
var mongoose = require('mongoose');
var ATM = mongoose.model('ATMWithdrawal');
var atmCtrl = require('../controllers/atm');
var purchaseCtrl = require('../controllers/purchase');

module.exports = function (api) {

    api.route('/api/atms')
        .get(atmCtrl.getWithdrawals)
        .post(atmCtrl.createTransaction);

    api.route('/api/atms/:id')
        .get(atmCtrl.getWithrawalById)
    //     .put(atmCtrl.updateWithdrawal)
        .delete(atmCtrl.deleteTransaction);

    api.route('/api/atms/:atmId/purchases')
        .get(purchaseCtrl.getPurchasesForWithdrawal)
        .post(purchaseCtrl.createPurchase);

    api.route('/api/atms/:atmId/purchases/:id')
        .delete(purchaseCtrl.deletePurchase);
};