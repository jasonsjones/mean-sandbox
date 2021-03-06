(function () {
    'use strict';
    angular.module('app.atm')
        .controller('ATMDetailsController', ATMDetailsController);

    ATMDetailsController.$inject = ['$scope', '$routeParams', 'ATM', 'purchase'];
    function ATMDetailsController($scope, $routeParams, ATM, purchase) {
        var vm = this;
        var atmId = $routeParams.atmId;

        vm.loading = true;
        vm.purchases = [];
        vm.totalSpent = 0;
        vm.totalAmount = 0;

        vm.newPurchase = {};

        vm.getPurchases = getPurchases;
        vm.addPurchase = addPurchase;
        vm.getTotalSpent = getTotalSpent;
        vm.isCardCompleted = isCardCompleted;

        initialize();

        $scope.$on('purchaseChanged', function (evt, data) {
            vm.getPurchases();
        });

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

        function isCardCompleted() {
            return vm.totalSpent === vm.totalAmount;
        }
    }
}());
