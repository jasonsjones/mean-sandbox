
(function () {
    'use strict';
    angular.module('app.core')
        .controller('EditUserCtrl', EditUserCtrl);

    EditUserCtrl.$inject = ['$location', '$routeParams', 'userCache', 'sbEditUser', 'identity', 'register', 'notifier'];
    function EditUserCtrl($location, $routeParams, userCache, sbEditUser, identity, register, notifier) {
        // looks like dependency for sbEditUser has been eliminated by using the userCache
        var vm = this;
        // var ute = sbEditUser.userToEdit;
        // var ute = userCache.getUserById($routeParams.userId);
        vm.user = userCache.getUserById($routeParams.userId);

        var isCurrentUser = (vm.user._id === identity.currentUser._id);

        vm.editPassword = false;

        // vm.firstName = ute.firstName;
        // vm.lastName = ute.lastName;
        // vm.email = ute.email;
        // vm.local = {
        //     username:  ute.local.username
        // };
        // vm.zipcode = ute.zipcode;
        vm.roles = {
            admin: isAdmin(vm.user)
        };

        vm.toggleEditPassword = toggleEditPassword;
        vm.updateData = updateData;

        /********** implementation details *********/
        function toggleEditPassword() {
            vm.editPassword = !vm.editPassword;
        }

        function updateData() {
            var updatedUserData = {
                firstName: vm.user.firstName,
                lastName: vm.user.lastName,
                email: vm.user.email,
                local: {
                    username: vm.user.local.username
                },
                zipcode: vm.user.zipcode,
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
                register.updateUser(vm.user._id, newUserData).then(function () {
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
