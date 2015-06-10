(function () {
    'use strict';
    /* global angular: true */

    angular.module('app.core')
        .controller('UserAdminCtrl', UserAdminCtrl);

    function UserAdminCtrl($http, sbEditUser, register, notifier, $location, $route) {
        var vm = this;

        vm.users = null;
        vm.loading = true;

        vm.userTableSortCol = '-roles';
        vm.sortOrderAsc = false;

        getUsers();

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

        vm.changeSortColumn = function (column) {
            vm.sortOrderAsc = !vm.sortOrderAsc;
            vm.userTableSortCol = (vm.sortOrderAsc ? column : '-'+column);
        };
        function getUsers() {
            $http.get('/api/users').success(function (users) {
                vm.users = users;
                vm.loading = false;
            });
        }
    }
}());
