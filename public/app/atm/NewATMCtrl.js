(function () {
    'use strict';
    angular.module('app.atm')
        .controller('NewATMCtrl', NewATMCtrl);

    NewATMCtrl.$inject = ['$location', 'ATM'];
    function NewATMCtrl($location, ATM) {
        var vm = this;

        vm.add = add;

        /*********** Implementation Details ************/
        function add() {
            var newATMData = {
                cashAmount: vm.cashAmount,
                serviceFee: vm.serviceFee,
                date: vm.date,
                location: vm.location
            };

            ATM.addTransaction(newATMData).then(function (data) {
                $location.path('/atm');
            });
        }
    }
})();
