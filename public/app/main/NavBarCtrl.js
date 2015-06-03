(function () {
    'use strict';
    angular.module('app.core')
        .controller('NavBarCtrl', NavBarCtrl);

    //////////////////
    function NavBarCtrl($location, identity) {
        var vm = this;
        vm.identity = identity;

        vm.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    }
}());
