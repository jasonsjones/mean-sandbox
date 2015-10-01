(function () {
    'use strict';

    angular.module('app.core')
        .controller('UserDetailsController', UserDetailsController);

    UserDetailsController.$inject = ['$routeParams', 'userCache'];
    function UserDetailsController($routeParams, userCache) {

        var vm = this;
        vm.userTableSortCol = '-roles';

        vm.user = userCache.getUserById($routeParams.userId);
        vm.isAdmin = isAdmin;

        /**************** Implementation Details *******************/
        function isAdmin(user) {
            if (user) {
                return user.roles.indexOf('admin') > -1;
            } else {
                return false;
            }
        }

    }
}());
