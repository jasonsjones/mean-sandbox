(function () {
    'use strict';
    angular.module('app.core')
        .controller('NavBarCtrl', NavBarCtrl);

    NavBarCtrl.$inject = ['$location', 'identity'];
    function NavBarCtrl($location, identity) {

        var vm = this;
        vm.identity = identity;
        vm.isActive = isActive;

        /********* Implementation Details **********/
        function isActive(viewLocation) {
            return viewLocation === $location.path();
        }
    }
}());
