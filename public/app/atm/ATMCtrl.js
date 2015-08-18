(function () {
    'use strict';
    angular.module('app.atm')
        .controller('ATMCtrl', ATMCtrl);

    ATMCtrl.$inject = ['$scope', 'ATM', 'purchase'];
    function ATMCtrl($scope, ATM, purchase) {

        var vm = this;

        vm.transactions = [];
        vm.expanded = false;

        vm.getTotalAmount = getTotalAmount;
        vm.expandList = expandList;

        getTransactions();

        $scope.$on('ATMChanged', function () {
            getTransactions();
        });

        /********** Implementation Details **********/
        function getTotalAmount (t) {
            return ATM.getTotalAmount(t);
        }

        function expandList() {
            vm.expanded = !vm.expanded;
        }

        function getTransactions() {
            vm.loading = true;
            ATM.query().then(function (data) {
                vm.transactions = data;
                vm.loading = false;
            });
        }
    }
}());
