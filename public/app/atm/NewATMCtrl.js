(function () {
    'use strict';
    angular.module('app.atm')
        .controller('NewATMCtrl', NewATMCtrl);

    //////////////
    function NewATMCtrl(ATM, $location) {
        var vm = this;

        vm.add = function () {
            var newATMData = {
                cashAmount: vm.cashAmount,
                serviceFee: vm.serviceFee,
                date: vm.date,
                location: vm.location
            };

            ATM.addTransaction(newATMData).then(function (data) {
                $location.path('/atm');
            });
        };
    }
})();