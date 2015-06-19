(function () {
    'use strict';
    angular.module('app.atm')
        .directive('purchaseItem', purchaseItem);

    function purchaseItem() {
        return {
            restrict: 'EA',
            templateUrl: '/app/atm/purchase-item.html',
            scope: {
                item: '=purchaseItem'
            },
            controller: purchaseItemCtrl,
            controllerAs: 'vm',
            bindToController: true
        };

        function purchaseItemCtrl($rootScope, $routeParams, purchase) {
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
                            console.log('purchase successfully updated');
                            $rootScope.$broadcast('purchaseChanged', {
                                purchase: vm.item
                            });
                        }
                    }, function () {
                        console.log('unable to update puchase');
                    });
            }

            function deletePurchase() {
                purchase.remove(atmId, vm.item._id).then(function (result) {
                    if (result.success) {
                        console.log('successfully deleted');
                        $rootScope.$broadcast('purchaseChanged', {
                            purchase: vm.item
                        });
                    }
                }, function () {
                    console.log('error deleting purchase');
                });
            }
        }
    }
})();