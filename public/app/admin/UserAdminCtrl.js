(function () {
    'use strict';
    angular.module('app.core')
        .controller('UserAdminCtrl', UserAdminCtrl);

    function UserAdminCtrl(sbUser) {
        console.log('UserAdminCtrl loaded...');
        var vm = this;
        vm.users = sbUser.query();
    }
}());
