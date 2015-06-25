(function () {
    'use strict';
    /* global angular: true */

    angular.module('app.core')
        .controller('UserAdminCtrl', UserAdminCtrl);

    function UserAdminCtrl($location, $route, userCache, sbEditUser, register, notifier) {
        var vm = this;

        vm.users = [];
        vm.loading = true;
        vm.userTableSortCol = '-roles';
        vm.sortOrderAsc = false;

        vm.isAdmin = isAdmin;
        vm.deleteUser = deleteUser;
        vm.updateUser = updateUser;
        vm.changeSortColumn = changeSortColumn;

        getUsers();

        /**************** Implementation Details *******************/
        function isAdmin(user) {
            if (user) {
                return user.roles.indexOf('admin') > -1;
            } else {
                return false;
            }
        }

        function deleteUser(user) {
            register.deleteUser(user)
                .then(function () {
                    notifier.notify('user successfully deleted');
                    $route.reload();
                },
                function () {
                    notifier.error('user was not deleted');
                });

        }

        function updateUser(user) {
            sbEditUser.userToEdit = user;
            $location.path('/admin/edituser');
        }

        function changeSortColumn(column) {
            vm.sortOrderAsc = !vm.sortOrderAsc;
            vm.userTableSortCol = (vm.sortOrderAsc ? column : '-'+column);
        }

        function getUsers() {
            userCache.query().then(function (users) {
                vm.users = users;
                vm.loading = false;
            });
        }
    }
}());
