(function () {
    'use strict';
    angular.module('app.core')
        .controller('UserAdminCtrl', UserAdminCtrl);

    function UserAdminCtrl(UserResource) {
        console.log('UserAdminCtrl loaded...');
        var vm = this;
        vm.users = UserResource.query();
    }
}());
