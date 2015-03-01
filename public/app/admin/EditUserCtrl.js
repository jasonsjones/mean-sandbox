
(function () {
    'use strict';
    angular.module('app.core')
        .controller('EditUserCtrl', EditUserCtrl);

    //////////
    function EditUserCtrl(sbEditUser, identityservice) {
        console.log('EditUserCtrl loaded...');
        var vm = this;
        var ute = sbEditUser.userToEdit;
        vm.editPassword = false;

        vm.firstName = ute.firstName;
        vm.lastName = ute.lastName;
        vm.email = ute.email;
        vm.username = ute.username;

        vm.toggleEditPassword = function () {
            vm.editPassword = !vm.editPassword;
        };

        vm.updateData = function () {
            console.log('update button clicked...');
        };
    }
}());
