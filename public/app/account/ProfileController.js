(function () {
    'use strict';

    angular.module('app.account')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$rootScope', '$location', '$window',
                                  'identity', 'sbAuth', 'notifier', 'register'];
    function ProfileController($rootScope, $location, $window, identity,
                                sbAuth, notifier, register) {
        var vm = this;

        vm.currentUser = null;
        vm.editPassword = false;

        vm.toggleEditPassword = toggleEditPassword;
        vm.updateData = updateData;
        vm.connectToTwitter = connectToTwitter;
        vm.unlinkTwitter = unlinkTwitter;
        vm.deleteAcct = deleteAcct;

        activate();

        /********* Implementation Details **********/
        function activate() {
            getCurrentUser();
        }

        function updateData () {

            var userUpdate = {
                firstName: vm.currentUser.firstName,
                lastName: vm.currentUser.lastName,
                email: vm.currentUser.email,
                local: {
                    username: vm.currentUser.local.username
                },
                zipcode: vm.currentUser.zipcode,
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

        function deleteAcct() {
            var userToDelete = vm.currentUser;
            if ($window.confirm('Are you sure you want to delete your account? \n' +
                                 'This can NOT be undone.')) {
                console.log('are you sure you want to delete account for:');
                console.dir(userToDelete);
                // first need to signout user
                // then need to delete
                sbAuth.signOutUser()
                    .then(function (success) {
                        return register.deleteUser(userToDelete);
                    }).then(function (data) {
                        if (data.success) {
                            $rootScope.$broadcast('userChange');
                            $location.path('/');
                            console.log('logged out now can delete...');
                        }
                    });
            }
        }
    }
}());
