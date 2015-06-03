(function () {
    'use strict';
    angular.module('app.atm')
        .controller('ATMCtrl', ATMCtrl);

    ////////////////////
    function ATMCtrl(ATM) {

        var vm = this;

        vm.transactions = ATM.getTransactions();
        vm.getTotalAmount = function (t) {
            return ATM.getTotalAmount(t);
        };
    }
})();
