(function () {
    'use strict';

    angular
        .module('app.core')
        .controller('NavBarController', NavBarController);

    NavBarCtrl.$inject = ['$location', 'identity'];
    function NavBarController($location, identity) {

        var vm = this;
        vm.identity = identity;
        vm.isActive = isActive;

        /********* implementation details **********/
        function isActive(viewLocation) {
            return viewLocation === $location.path();
        }
    }
}());
