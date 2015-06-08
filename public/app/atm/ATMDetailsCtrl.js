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
        vm.totalAmount = 0;
        var id = $routeParams.atmId;

        vm.addPurchase = function () {
            var newPurchase = {
                amount: vm.newPurchase.amount,
                description: vm.newPurchase.description
            };
            purchase.add(newPurchase, id).then(function (data) {
                vm.purchases.push(data);
                vm.totalSpent = vm.getTotalSpent();
            }, function (reason) {
                console.log('unable to add purchase: ' + reason);
            });
            vm.newPurchase.amount = '';
            vm.newPurchase.description = '';
        };

        vm.deletePurchase = function (purchaseToDelete) {
            purchase.remove(id, purchaseToDelete._id).then(function (result) {
                if (result.success) {
                    console.log('successfully deleted');
                    var index = vm.purchases.indexOf(purchaseToDelete);
                    vm.purchases.splice(index, 1);
                    vm.totalSpent = vm.getTotalSpent();
                }
            }, function () {
                console.log('error deleting purchase');
            });
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