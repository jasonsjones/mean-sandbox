(function () {
    'use strict';
    /* global angular: true */

    angular.module('app.core')
        .controller('UserAdminCtrl', UserAdminCtrl);

    UserAdminCtrl.$inject = ['$location', '$window', 'userCache',
                             'sbEditUser', 'register', 'notifier'];
    function UserAdminCtrl($location, $window, userCache,
                           sbEditUser, register, notifier) {
        var vm = this;

        vm.users = [];
        vm.loading = true;
        vm.userTableSortCol = '-roles';
        vm.sortOrderAsc = false;
        vm.showGridLayout = false;

        vm.isAdmin = isAdmin;
        vm.deleteUser = deleteUser;
        vm.updateUser = updateUser;
        vm.changeSortColumn = changeSortColumn;
        vm.toggleGridLayout = toggleGridLayout;

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
            if ($window.confirm('Are you sure you want to delete ' + user.local.username)) {
                register.deleteUser(user)
                    .then(function () {
                        notifier.notify('user successfully deleted');
                        getUsers();
                    },
                    function () {
                        notifier.error('user was not deleted');
                    });
            }
        }

        function updateUser(user) {
            sbEditUser.userToEdit = user;
            $location.path('/admin/edituser');
        }

        function changeSortColumn(column) {
            vm.sortOrderAsc = !vm.sortOrderAsc;
            vm.userTableSortCol = (vm.sortOrderAsc ? column : '-' + column);
        }

        function getUsers() {
            userCache.query().then(function (users) {
                vm.users = users;
                vm.loading = false;
            });
        }

        function toggleGridLayout() {
            vm.showGridLayout = !vm.showGridLayout;
        }
    }
}());
