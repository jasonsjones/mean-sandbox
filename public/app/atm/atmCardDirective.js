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
            var $atmListToggle = $(element).find('#atm-list-toggle');

            $atmListToggle.on('click', function () {
                var $atmBody = $(this).closest('.atm-card-header').next();
                var $atmList = $atmBody.find('.atm-list');
                $atmBody.slideToggle(400);
                $(this).toggleClass("fa-chevron-down fa-chevron-up");
            });
        }

        function atmCardCtrl($rootScope, $window, ATM, purchase) {
            var vm = this;
            vm.purchases = [];
            vm.loading = true;
            vm.totalSpent = 0;
            vm.totalAmount = 0;

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
                if ($window.confirm('Are you sure you want to delete ATM ' + id + ' ?')) {

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
    }
}());
