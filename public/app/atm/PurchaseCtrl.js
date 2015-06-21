(function () {
    'use strict';
    angular.module('app.atm')
        .controller('PurchaseCtrl', PurchaseCtrl);

    ////////////////
    function PurchaseCtrl(purchase) {
        var vm = this;
        vm.purchases = null;
        vm.loading = true;

        vm.getPurchases = function (id) {
            console.log('getPurchases is called with id: ' + id);
            purchase.get(id).then(function (data) {
                vm.purchases = data;
                vm.loading = false;
                vm.totalSpent = vm.purchases.reduce(function (prev, curr) {
                    return prev + curr.amount;
                }, 0);
            });
        };

    }
})();