(function () {
    'use strict';

    angular.module('app.account')
        .controller('NavBarLoginCtrl', NavBarLoginCtrl);

    NavBarLoginCtrl.$inject = ['$rootScope', '$location', '$window', 'sbAuth', 'identity', 'notifier', 'dataCache'];
    function NavBarLoginCtrl($rootScope, $location, $window, sbAuth, identity, notifier, dataCache) {
        var vm = this;
        vm.identity = identity;

        vm.username = '';
        vm.password = '';

        vm.login = login;
        vm.signout = signout;

        /********* Implementation Details **********/
        function login() {
            sbAuth.authenticateUser(vm.username, vm.password)
                .then(function (success) {
                    if (success) {
                        notifier.notify('You have successfully logged in');
                        $rootScope.$broadcast('userChange');
                        $location.path('/');
                    } else {
                        notifier.error('Unable to login. Please enter proper login credentials');
                        vm.username = '';
                        vm.password = '';
                    }
                });
        }

        function signout() {
            vm.identity.currentUser = null;
            vm.username = '';
            vm.password = '';
            notifier.notify('You successfully logged out!');
            $window.sessionStorage.removeItem('currentUser');
            dataCache.clearAllCache();
            $rootScope.$broadcast('userChange');
            $location.path('/');
        }

    }
}());
