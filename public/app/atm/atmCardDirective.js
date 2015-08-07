(function () {
    'use strict';
    angular.module('app.atm')
        .directive('atmCard', atmCard);

    function atmCard() {
        return {
            restrict: 'EA',
            templateUrl: 'app/atm/atm-card.html',
            scope: {
                item: '='
            },
            link: linkFunction,
            controller: atmCardCtrl,
            controllerAs: 'vm',
            bindToController: true
        };

        function linkFunction(scope, element, attrs) {
            var downChevron = $(element).find('.fa-chevron-down');
            var upChevron = $(element).find('.fa-chevron-up');

            downChevron.on('click', function () {
                console.log('downChevron clicked');
                var header = $(this).closest('.atm-card-header');
                var atmBody = header.next();
                var atmList = $(atmBody).find('.atm-list');
                $(atmList).fadeToggle(300);
            });

            upChevron.on('click', function () {
                console.log('upChevron clicked');
            });

            $(element).find('.atm-card-body').on('click', function () {
                console.log('atm-card-body clicked');
            });
        }

        function atmCardCtrl($rootScope, ATM, purchase) {
            var vm = this;
            vm.expanded = false;
            vm.purchases = [];
            vm.loading = true;
            vm.totalSpent = 0;
            vm.totalAmount = 0;

            vm.expandList = expandList;
            vm.getTotalAmount = getTotalAmount;
            vm.getPurchases = getPurchases;
            vm.deleteTransaction = deleteTransaction;
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

            function deleteTransaction(id) {
                purchase.removeAllPurchases(id).then(function (result) {
                    if (result.success) {
                        console.log('all purchases deleted...now deleting transaction');
                        ATM.deleteTransaction(id).then(function (result) {
                            if (result.success) {
                                $rootScope.$broadcast('ATMChanged', {withdrawal: vm.item});
                                console.log('transaction deleted');
                            }
                        });
                    } else {
                        console.log('unable to delete all purchases from transaction');
                    }
                });
            }
        }
    }
})();
