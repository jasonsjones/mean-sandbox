(function () {
    'use strict';
    angular.module('app.core')
        .controller('NavBarCtrl', NavBarCtrl);

    //////////////////
    function NavBarCtrl($location) {
        var vm = this;

        vm.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        }
    }
}());
