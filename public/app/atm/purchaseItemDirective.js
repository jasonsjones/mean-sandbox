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

        function purchaseItemCtrl() {
            var vm = this;
            vm.editPurchaseState = false;
            vm.editPurchase = editPurchase;
            vm.updatePurchase = updatePurchase;


            function editPurchase() {
                vm.editPurchaseState = true;
            }

            function updatePurchase() {
                vm.editPurchaseState = false;
            }
        }
    }
})();