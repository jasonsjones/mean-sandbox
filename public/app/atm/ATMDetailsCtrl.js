(function () {
    'use strict';
    angular.module('app.atm')
        .controller('ATMDetailsCtrl', ATMDetailsCtrl);

    function ATMDetailsCtrl($routeParams, ATM, purchase) {
        var vm = this;
        var atmId = $routeParams.atmId;

        vm.loading = true;
        vm.purchases = null;
        vm.totalSpent = 0;
        vm.totalAmount = 0;

        vm.newPurchase = {};

        vm.addPurchase = addPurchase;
        vm.deletePurchase = deletePurchase;
        vm.getTotalSpent = getTotalSpent;
        vm.getPurchases = getPurchases;

        initialize();

        /*********** Implementation Details ************/
        function initialize() {
            ATM.getById(atmId).then(function (data) {
                vm.transaction = data;
                vm.totalAmount = ATM.getTotalAmount(vm.transaction);
            });

            vm.getPurchases();
        }

        function addPurchase () {
            var newPurchaseData = {
                amount: vm.newPurchase.amount,
                description: vm.newPurchase.description
            };
            purchase.add(atmId, newPurchaseData).then(function (data) {
                vm.purchases.push(data);
                vm.totalSpent = vm.getTotalSpent();
            }, function (reason) {
                console.log('unable to add purchase: ' + reason);
            });
            vm.newPurchase.amount = '';
            vm.newPurchase.description = '';
        }

        function deletePurchase(purchaseToDelete) {
            purchase.remove(atmId, purchaseToDelete._id).then(function (result) {
                if (result.success) {
                    console.log('successfully deleted');
                    var index = vm.purchases.indexOf(purchaseToDelete);
                    vm.purchases.splice(index, 1);
                    vm.totalSpent = vm.getTotalSpent();
                }
            }, function () {
                console.log('error deleting purchase');
            });
        }

        function getTotalSpent() {
            return vm.purchases.reduce(function (prev, curr) {
                return prev + curr.amount;
            }, 0);
        }

        function getPurchases() {
            purchase.get(atmId).then(function (data) {
                vm.purchases = data;
                vm.loading = false;
                vm.totalSpent = vm.getTotalSpent();
            });
        }
    }
})();