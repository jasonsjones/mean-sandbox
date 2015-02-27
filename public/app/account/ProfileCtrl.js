(function () {
    'use strict';
    angular.module('app.core')
        .controller('ProfileCtrl', ProfileCtrl);

    function ProfileCtrl($http, $location, identityservice, notifier, sbAuth) {
        console.log('ProfileCtrl loaded...');
        var vm = this;

        vm.editPassword = false;

        vm.firstName = identityservice.currentUser.firstName;
        vm.lastName = identityservice.currentUser.lastName;
        vm.email = identityservice.currentUser.email;
        vm.username = identityservice.currentUser.username;

        vm.updateData = function () {
            var userUpdate = {
                firstName: vm.firstName,
                lastName: vm.lastName,
                email: vm.email,
                username: vm.username
            };

            if (vm.newPassword && vm.newPassword.length > 0) {
                if (vm.newPassword !== vm.confirmPassword) {
                    notifier.error('passwords do not match');
                    vm.newPassword = "";
                    vm.confirmPassword = "";
                } else {
                    userUpdate.password = vm.newPassword;
                    sendToAuthService(userUpdate);
                }
            } else {
                sendToAuthService(userUpdate);
            }

            //////////////////

            function sendToAuthService(newUserData) {
                sbAuth.updateUser(newUserData).then(function () {
                    notifier.notify('Your profile information has been successfully updated');
                    $location.path('/');
                }, function (reason) {
                    notifier.error(reason);
                });
            }
        };

        vm.toggleEditPassword = function () {
            vm.editPassword = !vm.editPassword;
        };
    }
}());
