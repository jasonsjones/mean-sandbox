
var mongoose = require('mongoose');
var ATM = mongoose.model('ATMWithdrawal');
var atmCtrl = require('../controllers/atm');
var purchaseCtrl = require('../controllers/purchase');

module.exports = function (api) {

    api.route('/api/atms')
        .get(atmCtrl.getWithdrawals)
        .post(atmCtrl.createTransaction);

    api.route('/api/atms/:atmId')
        .get(atmCtrl.getWithrawalById)
        .delete(atmCtrl.deleteTransaction);

    api.route('/api/atms/:atmId/purchases')
        .get(purchaseCtrl.getPurchasesForWithdrawal)
        .delete(purchaseCtrl.deleteAllPurchases)
        .post(purchaseCtrl.createPurchase);

    api.route('/api/atms/:atmId/purchases/:id')
        .put(purchaseCtrl.updatePurchase)
        .delete(purchaseCtrl.deletePurchase);
};
