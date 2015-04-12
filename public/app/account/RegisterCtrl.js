(function () {
    /* globals angular */
    'use strict';
    angular.module('app.core')
        .controller('RegisterCtrl', RegisterCtrl);

    function RegisterCtrl($http, $location, sbAuth, notifier) {
        console.log('RegisterCtrl loaded...');

        var vm = this;

        vm.signup = function () {
            var newUser = {
                firstName: vm.firstName,
                lastName: vm.lastName,
                email: vm.email,
                username: vm.username,
                password: vm.password
            };

            if (newUser.password.length > 0 && isPasswordCorrect()) {
                sbAuth.createUser(newUser)
                .then(function () {
                    notifier.notify('User account created');
                    $location.path('/');
                },
                function (reason) {
                    notifier.error(reason);
                });
            } else {
                if (!isPasswordCorrect()) {
                    notifier.error('Passwords do not match');
                } else {
                    notifier.error('Password is required');
                }
                vm.password = '';
                vm.confirmPassword = '';
            }
        };

        function isPasswordCorrect() {
            return vm.password === vm.confirmPassword;
        }
    }
}());
