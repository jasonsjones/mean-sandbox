(function () {
    'use strict';

    angular.module('app.account')
        .controller('NavBarLoginController', NavBarLoginController);

    NavBarLoginController.$inject = ['$rootScope', '$location', '$window',
                               'sbAuth', 'identity', 'notifier', 'dataCache'];
    function NavBarLoginController($rootScope, $location, $window,
                             sbAuth, identity, notifier, dataCache) {
        var vm = this;
        vm.identity = identity;

        vm.username = '';
        vm.password = '';

        vm.login = login;
        vm.signout = signout;
        vm.loginWithTwitter = loginWithTwitter;

        getUserFromServer();

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
                    }
                });
            vm.username = '';
            vm.password = '';
        }

        function loginWithTwitter() {
            console.log('logging using twitter oAuth...');
            sbAuth.authenticateUserWithTwitter();
        }

        function signout() {
            sbAuth.signOutUser()
                .then(function (success) {
                    if (success) {
                        console.log('user logged out on server');
                        notifier.notify('You successfully logged out!');
                        $rootScope.$broadcast('userChange');
                        $location.path('/');
                    }
                });
        }

        function getUserFromServer() {
            sbAuth.getCurrentUserFromServer()
                .then(function (success) {
                    if (success) {
                        notifier.notify('You have successfully logged in');
                        $rootScope.$broadcast('userChange');
                        $location.path('/');
                    }
                });
        }

    }
}());
