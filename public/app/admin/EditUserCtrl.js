
(function () {
    'use strict';
    angular.module('app.core')
        .controller('EditUserCtrl', EditUserCtrl);

    EditUserCtrl.$inject = ['$location', 'sbEditUser', 'identity', 'register', 'notifier'];
    function EditUserCtrl($location, sbEditUser, identity, register, notifier) {
        var vm = this;
        var ute = sbEditUser.userToEdit;
        var isCurrentUser = (ute._id === identity.currentUser._id);

        vm.editPassword = false;

        vm.firstName = ute.firstName;
        vm.lastName = ute.lastName;
        vm.email = ute.email;
        vm.local = {
            username:  ute.local.username
        };
        vm.zipcode = ute.zipcode;
        vm.roles = {
            admin: isAdmin(ute)
        };

        vm.toggleEditPassword = toggleEditPassword;
        vm.updateData = updateData;

        /********** implementation details *********/
        function toggleEditPassword() {
            vm.editPassword = !vm.editPassword;
        }

        function updateData() {
            var updatedUserData = {
                firstName: vm.firstName,
                lastName: vm.lastName,
                email: vm.email,
                local: {
                    username: vm.local.username
                },
                zipcode: vm.zipcode,
                roles: {}
            };

            determineRole(updatedUserData);

            if (vm.newPassword && vm.newPassword.length > 0) {
                if (vm.newPassword !== vm.confirmPassword) {
                    notifier.error('passwords do not match');
                    vm.newPassword = '';
                    vm.confirmPassword = '';
                } else {
                    updatedUserData.local.password = vm.newPassword;
                    sendToAuthService(updatedUserData);
                }
            } else {
                sendToAuthService(updatedUserData);
            }

            //////////////////

            function sendToAuthService(newUserData) {
                register.updateUser(ute._id, newUserData).then(function () {
                    notifier.notify('User information for ' + newUserData.local.username +
                                    ' has been successfully updated');
                    $location.path('/admin/users');
                }, function (reason) {
                    notifier.error(reason);
                });
            }
        }

        function isAdmin(user) {
           return user.roles.indexOf('admin') > -1;
        }

        function determineRole(user) {
            if (vm.roles.admin) {
                user.roles.admin = true;
            } else {
                user.roles.admin = false;
            }
        }
    }
}());
