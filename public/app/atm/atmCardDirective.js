(function () {
    'use strict';
    angular.module('app.atm')
        .directive('atmCard', atmCard);

    function atmCard() {
        return {
            restrict: 'EA',
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
            vm.totalSpent = 0;
            vm.totalAmount = 0;

            vm.expandList = expandList;
            vm.getTotalAmount = getTotalAmount;
            vm.getPurchases = getPurchases;
            vm.isCardCompleted = isCardCompleted;

            activate();

            /************* Implementation Details **************/
            function activate() {
                vm.getPurchases(vm.item._id);
                vm.totalAmount = vm.getTotalAmount();
                vm.loading = false;
            }

            function expandList() {
                vm.expanded = !vm.expanded;
            }

            function getTotalAmount() {
                return vm.item.cashAmount + vm.item.serviceFee;
            }

            function getPurchases(atmId) {
                purchase.get(atmId).then(function (data) {
                    vm.purchases = data;
                    vm.totalSpent = getTotalSpent();
                    vm.loading = false;
                });
            }

            function getTotalSpent() {
                return vm.purchases.reduce(function (prev, curr) {
                    return prev + curr.amount;
                }, 0);
            }

            function isCardCompleted() {
                return vm.totalSpent === vm.getTotalAmount();
            }
        }
    }
})();