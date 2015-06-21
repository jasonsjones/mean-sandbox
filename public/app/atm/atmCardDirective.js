(function () {
    'use strict';
    angular.module('app.atm')
        .directive('atmCard', atmCard);

    function atmCard() {
        return {
            restrict: 'E',
            templateUrl: '/app/atm/atm-card.html',
            scope: {
                item: '='
            },
            controller: atmCardCtrl,
            controllerAs: 'vm',
            bindToController: true
        };

        function atmCardCtrl(purchase) {
           var vm = this;
            vm.expanded = false;
            vm.purchases = [];
            vm.loading = true;

            vm.expandList = expandList;
            vm.getTotalAmount = getTotalAmount;
            vm.getPurchases = getPurchases;

            activate();

            function activate() {
                // vm.getPurchases(vm.item._id);
                vm.loading = false;
                console.log(vm.item);
            }

            function expandList() {
                vm.expanded = !vm.expanded;
            }

            function getTotalAmount() {
                return vm.cashAmount + vm.serviceFee;
            }

            function getPurchases(atmId) {
                purchase.get(atmId).then(function (data) {
                    vm.purchases = data;
                    vm.loading = false;
                    // vm.totalSpent = vm.purchases.reduce(function (prev, curr) {
                    //     return prev + curr.amount;
                    // }, 0);
                });
            }
        }
    }
})();