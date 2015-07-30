(function () {
    /* globals angular */
    'use strict';

    angular.module('app.account')
        .controller('RegisterCtrl', RegisterCtrl);

    RegisterCtrl.$inject = ['$location', 'register', 'notifier'];
    function RegisterCtrl($location, register, notifier) {

        var vm = this;
        vm.registerNewUser = registerNewUser;

        /********* Implementation Details **********/
        function registerNewUser () {
            var newUser = {
                firstName: vm.firstName,
                lastName: vm.lastName,
                email: vm.email,
                local: {
                    username: vm.username,
                    password: vm.password
                }
            };

            if (newUser.local.password.length > 0 && isPasswordCorrect()) {
                register.createUser(newUser)
                .then(function (user) {
                    notifier.notify('User account for ' + user.local.username + ' created');
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
        }

        function isPasswordCorrect() {
            return vm.password === vm.confirmPassword;
        }
    }
}());
