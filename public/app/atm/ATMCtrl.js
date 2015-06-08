(function () {
    'use strict';
    angular.module('app.atm')
        .controller('ATMCtrl', ATMCtrl);

    ////////////////////
    function ATMCtrl(ATM) {

        var vm = this;

        vm.transactions = null;
        vm.loading = true;

        initialize();

        vm.getTotalAmount = function (t) {
            return ATM.getTotalAmount(t);
        };

        vm.deleteTransaction = function (id) {
            ATM.deleteTransaction(id).then(function (result) {
                if (result.success) {
                    console.log('transaction deleted');
                    initialize();
                }
            });
        }

        function initialize() {
            ATM.query().then(function (data) {
                vm.transactions = data;
                vm.loading = false;
            });
        }
    }
})();
