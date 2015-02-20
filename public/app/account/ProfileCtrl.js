(function () {
    'use strict';
    angular.module('app.core')
        .controller('ProfileCtrl', ProfileCtrl);

    function ProfileCtrl($http, identityservice, notifier, authservice) {
        console.log('ProfileCtrl loaded...');
        var vm = this;

        vm.editPassword = false;

        vm.identity = identityservice;

        vm.firstName = vm.identity.currentUser.firstName;
        vm.lastName = vm.identity.currentUser.lastName;
        vm.email = vm.identity.currentUser.email;
        vm.username = vm.identity.currentUser.username;

        vm.updateData = function () {
            console.log('Update Data clicked...');
            var userUpdate = {
                firstName: vm.firstName,
                lastName: vm.lastName,
                email: vm.email,
                username: vm.username
            };


            if (vm.newPassword && vm.newPassword.length > 0) {
                if (vm.newPassword !== vm.confirmPassword) {
                    notifier.error('Passwords do not match');
                    vm.newPassword = "";
                    vm.confirmPassword = "";
                }
                userUpdate.password = vm.newPassword;
            }

            authservice.updateUser(userUpdate).then(function () {
                notifier.notify('info updates');
            }, function (reason) {
                notifier.error(reason);
            });



        };

        vm.toggleEditPassword = function () {
            vm.editPassword = !vm.editPassword;
        };
    }
})();