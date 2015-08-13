(function () {
    'use strict';
    angular.module('app.core')
        .controller('UserDetailsCtrl', UserDetailsCtrl);

    function UserDetailsCtrl($routeParams, userCache) {

        var vm = this;

        vm.user = userCache.getUserById($routeParams.userId);
    }
}());
