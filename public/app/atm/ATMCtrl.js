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

        function initialize() {
            ATM.query().then(function (data) {
                vm.transactions = data;
                vm.loading = false;
            });
        }
    }
})();
