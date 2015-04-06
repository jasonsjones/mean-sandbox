(function () {
    /* jshint validthis: true */
    'use strict';

    angular.module('app.core')
        .controller('NavBarLoginCtrl', NavBarLoginCtrl);

    function NavBarLoginCtrl($location, $window, sbAuth, identity, notifier) {
        var vm = this;
        vm.identity = identity;

        vm.login = function () {
            sbAuth.authenticateUser(vm.username, vm.password)
                .then(function (success) {
                    if (success) {
                        notifier.notify('You have successfully logged in');
                    } else {
                        notifier.error('Unable to login. Please enter proper login credentials');
                        vm.username = '';
                        vm.password = '';
                    }
                });
        };

        vm.signout = function () {
            vm.identity.currentUser = null;
            vm.username = '';
            vm.password = '';
            notifier.notify('You successfully logged out!');
            $window.localStorage.clear();
            $location.path('/');
        };
    }
}());
