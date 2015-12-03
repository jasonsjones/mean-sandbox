(function () {
    /* globals angular */
    'use strict';

    angular.module('app.account')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location', 'register', 'notifier'];
    function RegisterController($location, register, notifier) {

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
                },
                zipcode: vm.zipcode
            };

            if (isPasswordValid()) {
                register.createUser(newUser)
                .then(function (user) {
                    notifier.notify('User account for ' + user.local.username + ' created');
                    $location.path('/');
                },
                function (response) {
                    notifier.error(response.reason);
                    if (response.reason === 'Error: Duplicate username') {
                        vm.username = '';
                        clearPasswords();
                    }
                });
            } else {
                if (!isPasswordCorrect()) {
                    notifier.error('Passwords do not match');
                } else {
                    notifier.error('Password must be longer than 8 characters');
                }
                clearPasswords();
            }
        }

        function isPasswordCorrect() {
            return vm.password === vm.confirmPassword;
        }

        function clearPasswords() {
            vm.password = '';
            vm.confirmPassword = '';
        }

        function isPasswordValid() {
            return vm.password.length > 8 && isPasswordCorrect();
        }
    }
}());
