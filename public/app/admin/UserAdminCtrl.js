(function () {
    'use strict';
    /* global angular: true */

    angular.module('app.core')
        .controller('UserAdminCtrl', UserAdminCtrl);

    function UserAdminCtrl(sbUser, sbEditUser, $location) {
        console.log('UserAdminCtrl loaded...');

        var vm = this;
        vm.users = sbUser.query();

        vm.isAdmin = function (user) {
            return user.roles.indexOf('admin') > -1;
        };

        vm.deleteUser = function (user) {
            console.log(user.firstName + ' is to be deleted...');
        };

        vm.updateUser = function (user) {
            sbEditUser.userToEdit = user;
            $location.path('/admin/edituser');
        };
    }
}());
