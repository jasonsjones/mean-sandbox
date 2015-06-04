
var mongoose = require('mongoose');
var ATM = mongoose.model('ATMWithdrawal');
var atmCtrl = require('../controllers/atm');
var purchaseCtrl = require('../controllers/purchase');

module.exports = function (api) {

    api.route('/api/atms')
        .get(atmCtrl.getWithdrawals);
    //     .post(atmCtrl.createWithdrawal);

    api.route('/api/atms/:id')
        .get(atmCtrl.getWithrawalById);
    //     .put(atmCtrl.updateWithdrawal)
    //     .delete(atmCtrl.deleteWithdrawal);

    api.route('/api/atms/:atmId/purchases')
        .get(purchaseCtrl.getPurchasesForWithdrawal);
};