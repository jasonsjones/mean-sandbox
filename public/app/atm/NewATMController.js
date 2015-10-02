(function () {
    'use strict';
    angular.module('app.atm')
        .controller('NewATMController', NewATMController);

    NewATMController.$inject = ['$location', 'ATM', 'notifier'];
    function NewATMController($location, ATM, notifier) {
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

            if (!newATMData.serviceFee || newATMData < 0) {
                newATMData.serviceFee = 0;
            }

            if (inputsValid(newATMData)) {
                ATM.addTransaction(newATMData).then(function (data) {
                    $location.path('/atm');
                });
            } else {
                notifier.error('There is something wrong with the data you entered');
            }
        }

        function inputsValid(data) {

            if (data.cashAmount > 0 && data.date && data.location) {
                return true;
            } else {
                return false;
            }
        }
    }
})();
