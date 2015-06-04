(function () {
    'use strict';
    angular.module('app.atm')
        .controller('ATMDetailsCtrl', ATMDetailsCtrl);

    ////////////
    function ATMDetailsCtrl($routeParams) {
        var vm = this;
        vm.id = $routeParams.atmId;
    }
})();