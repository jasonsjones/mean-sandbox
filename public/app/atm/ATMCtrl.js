(function () {
    'use strict';
    angular.module('app.atm')
        .controller('ATMCtrl', ATMCtrl);

    ////////////////////
    function ATMCtrl(ATM, purchase) {

        var vm = this;

        vm.transactions = null;
        vm.loading = true;

        initialize();

        vm.getTotalAmount = function (t) {
            return ATM.getTotalAmount(t);
        };

        vm.deleteTransaction = function (id) {
            purchase.removeAllPurchases(id).then(function (result) {
                if (result.success) {
                    console.log('all purchases deleted...now deleting transaction');
                    ATM.deleteTransaction(id).then(function (result) {
                        if (result.success) {
                            console.log('transaction deleted');
                            initialize();
                        }
                    });
                } else {
                    console.log('unable to delete all purchases from transaction');
                }
            });
        };

        function initialize() {
            ATM.query().then(function (data) {
                vm.transactions = data;
                vm.loading = false;
            });
        }
    }
})();
