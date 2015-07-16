(function () {
    'use strict';
    angular.module('app.atm')
        .directive('purchaseItem', purchaseItem);

    function purchaseItem() {
        return {
            restrict: 'EA',
            templateUrl: 'app/atm/purchase-item.html',
            scope: {
                item: '=purchaseItem'
            },
            controller: purchaseItemCtrl,
            controllerAs: 'vm',
            bindToController: true
        };

        // Directive controller
        function purchaseItemCtrl($rootScope, $routeParams, purchase, notifier) {
            var vm = this;
            var atmId = $routeParams.atmId;

            vm.editPurchaseState = false;
            vm.editPurchase = editPurchase;
            vm.updatePurchase = updatePurchase;
            vm.deletePurchase = deletePurchase;

            /*********** Implementation Details ************/
            function editPurchase() {
                vm.editPurchaseState = true;
            }

            function updatePurchase() {
                vm.editPurchaseState = false;
                var updatedPurchaseData = {
                    amount: vm.item.amount,
                    description: vm.item.description
                };

                purchase.update(atmId, vm.item._id, updatedPurchaseData)
                    .then(function (result) {
                        if (result.success) {
                            notifier.notify('purchase updated');
                            $rootScope.$broadcast('purchaseChanged', {
                                purchase: vm.item
                            });
                        }
                    }, function () {
                        notifier.error('unable to update purchase');
                    });
            }

            function deletePurchase() {
                purchase.remove(atmId, vm.item._id).then(function (result) {
                    if (result.success) {
                        notifier.notify('purchase deleted');
                        $rootScope.$broadcast('purchaseChanged', {
                            purchase: vm.item
                        });
                    }
                }, function () {
                    notifier.error('error deleting purchase');
                });
            }
        }
    }
})();