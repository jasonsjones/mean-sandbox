
(function () {
    'use strict';
    angular.module('app.core')
        .controller('EditUserCtrl', EditUserCtrl);

    //////////
    function EditUserCtrl(sbEditUser, identity, sbAuth, notifier, $location) {
        var vm = this;
        var ute = sbEditUser.userToEdit;
        var isCurrentUser = ute._id === identity.currentUser._id;
        vm.editPassword = false;

        vm.firstName = ute.firstName;
        vm.lastName = ute.lastName;
        vm.email = ute.email;
        vm.username = ute.username;
        vm.roles = {};

        if (ute.isAdmin()) {
            vm.roles.admin = true;
        }

        vm.toggleEditPassword = function () {
            vm.editPassword = !vm.editPassword;
        };

        vm.updateData = function () {
            var userUpdate = {
                firstName: vm.firstName,
                lastName: vm.lastName,
                email: vm.email,
                username: vm.username,
                roles: {}
            };

            if (vm.roles.admin) {
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
                sbAuth.updateUser(newUserData, isCurrentUser).then(function () {
                    notifier.notify('User information for ' + newUserData.username +
                                    ' has been successfully updated');
                    $location.path('/admin/users');
                }, function (reason) {
                    notifier.error(reason);
                });
            }
        };
    }
}());
