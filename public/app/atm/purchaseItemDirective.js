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

        function purchaseItemCtrl($routeParams) {
            var vm = this;
            var atmId = $routeParams.atmId;
            vm.editPurchaseState = false;
            vm.editPurchase = editPurchase;
            vm.updatePurchase = updatePurchase;

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
        }
    }
})();