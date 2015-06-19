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

            function editPurchase() {
                vm.editPurchaseState = true;
            }

            function updatePurchase() {
                vm.editPurchaseState = false;
                var updatedPurchaseData = {
                    amount: vm.item.amount,
                    description: vm.item.description
                };
                console.log(updatedPurchaseData);
                console.log(vm.item._id);
                console.log(atmId);
            }

            function deletePurchase() {
                purchase.remove(atmId, vm.item._id).then(function (result) {
                    if (result.success) {
                        console.log('successfully deleted');
                        $rootScope.$broadcast('purchaseDeleted', {
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