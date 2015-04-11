(function () {
    'use strict';
    /* global angular: true */

    angular.module('app.core')
        .controller('UserAdminCtrl', UserAdminCtrl);

    function UserAdminCtrl(moduser, sbUser, sbEditUser, sbAuth, notifier, $location, $route) {
        console.log('UserAdminCtrl loaded...');

        var vm = this;
        //vm.users = sbUser.query();
        vm.users = null;
        vm.loading = true;

        moduser.get().success(function (users) {
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
            console.log(user.firstName + ' is to be deleted...');

            sbAuth.deleteUser(user).then(function () {
                notifier.notify('user successfully deleted');
                $route.reload();
            },
            function () {
                notifier.error('user was not deleted');
            });
        };

        vm.updateUser = function (user) {
            console.log(user);
            console.log(vm.isAdmin(user));
            sbEditUser.userToEdit = user;
            $location.path('/admin/edituser');
        };
    }
}());
