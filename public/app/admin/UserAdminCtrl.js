(function () {
    'use strict';
    /* global angular: true */

    angular.module('app.core')
        .controller('UserAdminCtrl', UserAdminCtrl);

    function UserAdminCtrl(userAPI, sbEditUser, register, notifier, $location, $route) {
        var vm = this;

        vm.users = null;
        vm.loading = true;

        userAPI.get().success(function (users) {
            vm.users = users;
            vm.loading = false;
        });

        vm.isAdmin = function (user) {
            if (user) {
                return user.roles.indexOf('admin') > -1;
            } else {
                return false;
            }
        };

        vm.deleteUser = function (user) {

            register.deleteUser(user)
            .then(function () {
                notifier.notify('user successfully deleted');
                $route.reload();
            },
            function () {
                notifier.error('user was not deleted');
            });
        };

        vm.updateUser = function (user) {
            sbEditUser.userToEdit = user;
            $location.path('/admin/edituser');
        };
    }
}());
