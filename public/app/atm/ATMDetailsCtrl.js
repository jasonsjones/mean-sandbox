(function () {
    'use strict';
    angular.module('app.atm')
        .controller('ATMDetailsCtrl', ATMDetailsCtrl);

    function ATMDetailsCtrl($routeParams, ATM, purchase) {
        var vm = this;
        var id = $routeParams.atmId;

        vm.loading = true;
        vm.editPurchaseState = false;
        vm.purchases = null;
        vm.totalSpent = 0;
        vm.totalAmount = 0;

        vm.newPurchase = {};

        vm.addPurchase = addPurchase;
        vm.deletePurchase = deletePurchase;
        vm.getTotalSpent = getTotalSpent;
        vm.getPurchases = getPurchases;
        vm.editPurchase = editPurchase;
        vm.updatePurchase = updatePurchase;

        initialize();

        /*********** Implementation Details ************/
        function initialize() {
            ATM.getById(id).then(function (data) {
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
            purchase.add(newPurchaseData, id).then(function (data) {
                vm.purchases.push(data);
                vm.totalSpent = vm.getTotalSpent();
            }, function (reason) {
                console.log('unable to add purchase: ' + reason);
            });
            vm.newPurchase.amount = '';
            vm.newPurchase.description = '';
        }

        function deletePurchase(purchaseToDelete) {
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
        }

        function getTotalSpent() {
            return vm.purchases.reduce(function (prev, curr) {
                return prev + curr.amount;
            }, 0);
        }

        function getPurchases() {
            purchase.get(id).then(function (data) {
                vm.purchases = data;
                vm.loading = false;
                vm.totalSpent = vm.getTotalSpent();
            });
        }

        function editPurchase() {
            vm.editPurchaseState = true;
        }

        function updatePurchase() {
            vm.editPurchaseState = false;
        }
    }
})();