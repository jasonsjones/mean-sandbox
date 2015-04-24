(function () {
    'use strict';
    angular.module('app.core')
        .controller('ProfileCtrl', ProfileCtrl);

    function ProfileCtrl($http, $location, identity, notifier, register) {
        var vm = this;

        vm.editPassword = false;

        vm.firstName = identity.currentUser.firstName;
        vm.lastName = identity.currentUser.lastName;
        vm.email = identity.currentUser.email;
        vm.username = identity.currentUser.username;

        vm.updateData = function () {

            var userUpdate = {
                firstName: vm.firstName,
                lastName: vm.lastName,
                email: vm.email,
                username: vm.username,
                roles: {}
            };

            if (identity.isAuthorizedForRole('admin')) {
                userUpdate.roles.admin = true;
            } else {
                userUpdate.roles.admin = false;
            }

            if (vm.newPassword && vm.newPassword.length > 0) {
                if (vm.newPassword !== vm.confirmPassword) {
                    notifier.error('passwords do not match');
                    vm.newPassword = '';
                    vm.confirmPassword = '';
                } else {
                    userUpdate.password = vm.newPassword;
                    sendToAuthService(userUpdate);
                }
            } else {
                sendToAuthService(userUpdate);
            }

            //////////////////

            function sendToAuthService(newUserData) {
                register.updateUser(identity.currentUser._id, newUserData).then(function () {
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
