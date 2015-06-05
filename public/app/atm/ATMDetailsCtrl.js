(function () {
    'use strict';
    angular.module('app.atm')
        .controller('ATMDetailsCtrl', ATMDetailsCtrl);

    ////////////
    function ATMDetailsCtrl($routeParams, ATM, purchase) {
        var vm = this;
        vm.loading = true;
        vm.purchaseEditMode = false;
        var id = $routeParams.atmId;

        initialize()

        vm.addPurchase = function () {
            console.log(vm.newPurchase.amount + ' ' + vm.newPurchase.description);
            vm.newPurchase.amount = '';
            vm.newPurchase.description = '';
        };

        vm.editPurchase = function () {
            vm.purchaseEditMode = !vm.purchaseEditMode;
            console.log(vm.purchaseEditMode);
        }

        function initialize() {
            ATM.getById(id).success(function (data) {
                vm.transaction = data;
                vm.loading = false;
                vm.totalAmount = ATM.getTotalAmount(vm.transaction);
            });

            purchase.get(id).success(function (data) {
                vm.purchases = data;
                vm.loading = false;
                console.log(vm.purchases);
            })
        }
    }
})();