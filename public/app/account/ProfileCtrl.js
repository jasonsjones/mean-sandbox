(function () {
    'use strict';

    angular.module('app.account')
        .controller('ProfileCtrl', ProfileCtrl);

    ProfileCtrl.$inject = ['$location', 'identity', 'sbAuth', 'notifier', 'register'];
    function ProfileCtrl($location, identity, sbAuth, notifier, register) {
        var vm = this;

        vm.currentUser = null;
        vm.editPassword = false;

        vm.toggleEditPassword = toggleEditPassword;
        vm.updateData = updateData;
        vm.connectToTwitter = connectToTwitter;
        vm.unlinkTwitter = unlinkTwitter;

        activate();

        /********* Implementation Details **********/
        function activate() {
            getCurrentUser();
        }

        function updateData () {

            var userUpdate = {
                firstName: vm.firstName,
                lastName: vm.lastName,
                email: vm.email,
                local: {
                    username: vm.local.username
                },
                zipcode: vm.zipcode,
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
                    userUpdate.local.password = vm.newPassword;
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
        }

        function toggleEditPassword () {
            vm.editPassword = !vm.editPassword;
        }

        function connectToTwitter() {
            sbAuth.connectToTwitter();
        }

        function unlinkTwitter() {
            sbAuth.unlinkTwitter()
                .then(function (data) {
                    if (data.success) {
                        vm.currentUser = data.user;
                    }
                });
        }

        function getCurrentUser() {
            identity.getCurrentUserFromServer()
                .then(function (data) {
                    vm.currentUser = data;
                    console.log(vm.currentUser);
                });
        }
    }
}());
