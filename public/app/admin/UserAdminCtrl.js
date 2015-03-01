(function () {
    'use strict';
    angular.module('app.core')
        .controller('UserAdminCtrl', UserAdminCtrl);

    function UserAdminCtrl(sbUser, sbEditUser, $location) {
        console.log('UserAdminCtrl loaded...');

        var vm = this;
        vm.users = sbUser.query();

        vm.deleteUser = function (user) {
            console.log(user.firstName + ' is to be deleted...');
        };

        vm.updateUser = function (user) {
            console.log(user.firstName + ' is to be updtated...');
            sbEditUser.userToEdit = user;
            $location.path('/admin/edituser');
        };
    }
}());
