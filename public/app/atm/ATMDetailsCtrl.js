(function () {
    'use strict';
    angular.module('app.atm')
        .controller('ATMDetailsCtrl', ATMDetailsCtrl);

    ////////////
    function ATMDetailsCtrl($routeParams, ATM, purchase) {
        var vm = this;
        vm.loading = true;
        vm.purchases = null;
        vm.totalSpent = 0;
        var id = $routeParams.atmId;


        vm.addPurchase = function () {
            console.log(vm.newPurchase.amount + ' ' + vm.newPurchase.description);
            vm.newPurchase.amount = '';
            vm.newPurchase.description = '';
        };


        vm.getTotalSpent = function () {
            return vm.purchases.reduce(function (prev, curr) {
                return prev + curr.amount;
            }, 0);
        };

        vm.getPurchases = function () {
            purchase.get(id).then(function (data) {
                vm.purchases = data;
                vm.loading = false;
                vm.totalSpent = vm.getTotalSpent();
            });
        };

        initialize();
        function initialize() {
            ATM.getById(id).then(function (data) {
                vm.transaction = data;
                vm.loading = false;
                vm.totalAmount = ATM.getTotalAmount(vm.transaction);
            });

            vm.getPurchases();

        }
    }
})();