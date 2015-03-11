(function () {
    'use strict';
    /* global angular: true */

    angular.module('app.core')
        .controller('UserAdminCtrl', UserAdminCtrl);

    function UserAdminCtrl(sbUser, sbEditUser, sbAuth, notifier, $location) {
        console.log('UserAdminCtrl loaded...');

        var vm = this;
        vm.users = sbUser.query();

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
